FROM node:20-alpine AS development-dependencies-env
COPY ./solar /app/solar
COPY ./graphql-queries /app/graphql-queries
WORKDIR /app/solar
RUN npm i --ignore-scripts
WORKDIR /app/graphql-queries
RUN npm i --ignore-scripts

FROM node:20-alpine AS production-dependencies-env
COPY ./solar/package.json /app/solar/
COPY ./graphql-queries /app/graphql-queries
WORKDIR /app/solar
RUN npm i --omit=dev --ignore-scripts

FROM node:20-alpine AS build-env
COPY ./solar /app/solar/
COPY ./graphql-queries /app/graphql-queries
COPY --from=development-dependencies-env /app/solar/node_modules /app/solar/node_modules
COPY --from=development-dependencies-env /app/graphql-queries/node_modules /app/graphql-queries/node_modules
WORKDIR /app/solar
RUN npm run build

FROM node:20-alpine
COPY ./solar/package.json /app/
COPY --from=production-dependencies-env /app/solar/node_modules /app/node_modules
COPY --from=build-env /app/solar/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]