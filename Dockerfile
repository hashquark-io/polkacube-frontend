FROM node:10.19.0-alpine3.10
WORKDIR /src
COPY . .
RUN npm install
CMD ["npm","run","serve"]