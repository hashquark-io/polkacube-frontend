FROM node:10
WORKDIR /src
COPY . .
RUN apt update \
 && apt install libusb-1.0 -y \
 && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
 && npm rebuild node-sass \
 && npm install
CMD ["npm","run","serve"]