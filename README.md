# PolkaCube web application

## Development

### Prerequisites

Polkacube projects include job, backend and frontend. This project requires to start polkacube job and polkacube backend project first, and modify ./vue.config.js such as APP_POLKA_BASE_HOST variable (backend server URI) and so on.  
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

Modify ./vue.config.js  

```bash
npm install && npm run build
docker build -t polkacube_frontend .
docker run -d -p 80:80 polkacube_frontend 
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