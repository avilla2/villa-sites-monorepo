# Getting Started with Villa Sites

## Installing
```bash
yarn install
```

## Build All Components and Websites

```bash
yarn build-all
```

## Testing

Coming Soon

## Deploy Websites

```bash
npx wrangler login
yarn deploy-all
```

## Add a New Website

- Run `yarn create:website`
- Create new website in api.villawebsolutions.com/admin
- Add appropriate site id, logo, title, description, and fonts to the new website folder
- Run `npx wrangler pages project create` and enter the name of new website(same name that is in the package.json), and enter `main` as production branch
- Run Build All and Deploy commands
- Go to cloudflare console and add custom domain for both root and `www` domains (Nameservers need to be configured beforehand)

## CI/CD

@villa-component/system will be built and deployed by a Jenkins pipeline on every push to main.