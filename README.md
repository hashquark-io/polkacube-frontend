# PolkaCube web application

## Development

### Prerequisites

Polkacube projects include job, backend and frontend. This project requires to start polkacube job and polkacube backend project first, and modify .env configuration such as POLKACUBE_SERVER variable (backend server URI) and so on.  
Node version 10+ is required.

### Setup

```bash
npm install
```

### Build and hot-reloads for development

```bash
npm run serve
```

### Build for production

```bash
npm run build
```

## Docker image

### Build A Image and Run

> Modify .env configuration

```bash
docker build -t polkacube_frontend .
docker run -d -p 8080:8080 polkacube_frontend
```

### Using Image From Docker Hub

```bash
# Write .env file on your host
# ==========================
# Polkacube-backend web server URI
# The '127.0.0.1' direct to container host, you must change it when you run in docker.
POLKACUBE_SERVER='"http://10.10.10.10:7001"'
# ==========================

docker run -d -p 8080:8080 -v [HOST_PATH]/.env:/src/.env hashquarkio/polkacube_frontend
```

## List of dependencies

JS library: Vue. See [vuejs](https://cli.vuejs.org/config/).

## List included in each folder of frontend

vue.config.js used to write application configuration.  
public/** used for home files.  
src/main.js used to initialize vue components at startup.  
src/router/** used to configure URL routing rules.  
src/config/** used for production configuration.  
src/assets/** used for images and font resources.  
src/scss/** used for scss files.  
src/methods/** used for utilities.  
src/components/** used for UI components.  
src/i18n/** used for localizations.  
src/plugin/** used to configure vue third party library that need to be loaded.  
src/view/** used for pages view.  
src/store/** used for UI components state management.  

## License

[Apache-2.0](LICENSE)