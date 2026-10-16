# Image optimizer and classified asset ingestion

Requires Node 22.9+, workspace dependencies, and an authenticated Copilot CLI
with image attachment support (implemented against CLI 1.0.98).
Copy `.env.example` to `.env`, fill in secrets locally, and start with `yarn start`.
Run `copilot login` yourself under the account running the optimizer. Never send
login secrets through an agent. The optimizer binds to loopback unless `HOST` is set.

## Ingestion flow

1. The caller resolves the folder requested in the original prompt using the
   official Strapi MCP `media_list_folders`; create a folder only when requested.
   Pass that **numeric folder ID** to `ingest_asset_directory` on the local Strapi MCP.
2. That tool scans an absolute directory on the **MCP host**, returns a background
   job ID, then streams images sequentially to `POST /api/assets` on the optimizer.
   The two services do not need access to the same input directory.
3. The optimizer generates a metadata-free, orientation-corrected 1280px preview
   and attaches it to a fresh Copilot CLI session. The configured small vision
   model returns only a descriptive slug, alt text, and confidence. No tools are
   exposed to this model; it does not get Strapi credentials or repository context.
4. Validated metadata names attention-cropped JPEG variants: wide 1920×1080,
   tall 1080×1350, square 1080×1080, quality 82. A random suffix prevents collisions.
5. **Application code, not the model**, calls the existing local Strapi MCP
   `upload_media` tool with generated filenames and `fileInfo.alternativeText`.
   A separate authenticated HTTP MCP client calls the official `media_move_assets`
   using **only IDs returned by those uploads**. No “recent media” search is used.
6. `get_asset_ingestion_job` returns counts, compact per-image results, exact asset
   IDs and movement state. Page through results using `offset` and `limit`.

Example prompt to the calling agent:

> Ingest all images from /absolute/path/to/project-photos for Arias Builders.
> Describe visible construction work without guessing locations or people.
> Use the existing Arias Builders / Projects media folder. First run a dry run;
> report uncertain images. After approval, ingest with dryRun=false.

Pass the original intent as `instructions`, the resolved folder as `folderId`, and
set `recursive` if needed. All images in a job go to that one explicit destination;
semantic multi-folder routing is not performed. This keeps folder decisions out
of the image model and prevents accidental cross-client placement.

## Configuration

Optimizer environment:

| Variable                                               | Purpose                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `ASSET_PIPELINE_TOKEN`                                 | Required shared bearer secret protecting the new endpoint                                       |
| `COPILOT_IMAGE_MODEL`                                  | Vision-capable model; defaults to `gpt-5.4-mini`; availability and price depend on your account |
| `COPILOT_CLI_PATH`                                     | CLI executable, default `copilot`                                                               |
| `STRAPI_REST_ENDPOINT`, `STRAPI_API_TOKEN`             | Upload credentials used by the child local Strapi MCP                                           |
| `STRAPI_OFFICIAL_MCP_URL`, `STRAPI_OFFICIAL_MCP_TOKEN` | Official Streamable HTTP MCP endpoint and its admin bearer credential                           |

Caller Strapi MCP environment: `IMAGE_OPTIMIZER_ENDPOINT` (default
`http://localhost:3000`) and the same `ASSET_PIPELINE_TOKEN`.
VS Code's MCP configuration is **not** inherited by subprocesses or the optimizer;
configure both environments explicitly. Never put tokens in the tool arguments.
Remote connections require HTTPS; loopback HTTP is supported for development.

The optimizer spawns the sibling local Strapi MCP entry point in this monorepo.
Deploy both packages together. Its upload tool can read the temporary crop files
because it runs on the optimizer machine; the official server receives IDs only.

## Safety and limits

- Dry run is the default. It still spends Copilot credits, but uploads nothing.
  Temporary previews and crops are deleted afterward; inspect the returned metadata.
  A real run classifies again rather than reusing a dry-run approval artifact.
- At most 1,000 images per job, one active job per caller MCP, two concurrent
  image requests per optimizer, 50 MiB per image. Excess concurrent requests fail
  rather than silently queue or retry. Split large directories into batches.
- Hidden files and symlinks are skipped; supported candidate extensions are JPEG,
  PNG, WebP, AVIF, TIFF, HEIC/HEIF and GIF. Actual decoder support depends on Sharp;
  animated/multipage inputs use their first frame/page. Unsupported files fail individually.
- CLI classification is capped at 120 seconds, MCP tool calls at 120 seconds,
  and caller HTTP requests at 10 minutes per image. Failures do not stop other images.
- Confidence is a model self-assessment, **not calibrated accuracy**. Below 0.8
  (configurable) nothing is uploaded. Small previews and attention crops may miss
  details; visually review representative crops and alt text before production use.
  Alt text describes the source and can require adjustment when a crop removes its subject.
- No automatic upload retries: a network timeout may occur after Strapi commits.
  Partial results retain known asset IDs. Retry only failed **moves** with those
  IDs; reconcile the library before retrying an ambiguous upload. There is no
  transaction or rollback across uploads and moves.
- Jobs and the last 50 job records are in memory in the caller MCP process.
  Keep it running until completion. Restart loses status and may interrupt work;
  this is a bounded local worker, not a durable distributed queue. For unattended
  production workloads add persistent job storage, reconciliation and supervision.
- The endpoint spends credits and writes media. Keep it private, do not expose
  the original unauthenticated crop endpoints to the internet, and use least-privilege
  credentials. A CLI tool filter is not an OS sandbox; use a dedicated service account.

Existing `POST /api/crops`, browser `POST /optimize`, and static `/uploads` outputs
remain unchanged. The classified pipeline uses temporary files, not public uploads.

## Tests

Run `yarn test` in this package and in the Strapi MCP package. Tests use generated
images and fake classifiers/MCP clients; they spend no credits and do not upload.
Use a dry run for the CLI integration smoke test, then explicitly authorize a
small real batch to verify your server's credentials and folder permissions.
