# PolkaCube web application

> This project is based on vue framework. See [vuejs](https://cli.vuejs.org/config/).
> Node version 10+ is required.
> Polkacube projects include job, backend and frontend. This project requires to start polkacube job and polkacube backend project first, and modify vue.config.js such as APP_POLKA_BASE_HOST variable and so on.

## setup

```bash
npm install
```

### build and hot-reloads for development

```bash
npm run serve
```

### build for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

## The Docker Way

```bash
npm install && npm run build
docker build -t polkacube_frontend .
docker run -d -p 80:80 polkacube_frontend 
```
