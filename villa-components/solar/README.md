# Welcome to Solar!

A modern, production-ready website rendering platform.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
yarn install
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
yarn build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
cd ../villa-components
export CR_PAT=<token>
echo $CR_PAT | docker login ghcr.io -u <username> --password-stdin
docker build -t ghcr.io/<username>/solar -f solar/Dockerfile .



# Run the container
docker run -p 3000:3000 \
  -e BACKEND_URL=http://localhost:1337 \
  -e API_TOKEN=your_token_here \
  ghcr.io/<username>/solar

# Deploy container

docker push ghcr.io/<username>/solar:latest
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway
