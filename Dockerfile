FROM alpine:3.7

RUN apk add --update nodejs nodejs-npm

ADD /dist/Capstone/ /usr/src/capstone

WORKDIR /usr/src/capstone

RUN npm install http-server -g

CMD ["http-server", "-p", "4200"]
