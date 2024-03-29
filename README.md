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

- Copy an exisiting website from `/websites`
- Create new website in api.villawebsolutions.com/admin
- Add appropriate site id, logo, title, description, and fonts to the new website folder
- Run `npx wrangler pages project create` and enter the name of new website
- Run Build All and Deploy commands
- Go to cloudflare console and add custom domain for both root and `www` domains (Nameservers need to be configured beforehand)

## CI/CD

Coming Soon