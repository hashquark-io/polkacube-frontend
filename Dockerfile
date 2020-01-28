FROM docker.io/library/nginx:1-alpine

ADD ./dist/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
