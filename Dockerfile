FROM node:latest
EXPOSE 8080

WORKDIR /usr/src/app

COPY *.jason .
COPY server.js .
COPY pages/* pages

RUN npm add express
RUN npm add body-parser

CMD ["node", "server.js"]
