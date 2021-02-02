FROM node:14.15.4-alpine
LABEL maintainer="Arthur DUFOUR. <https://arthurdufour.com/"

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . . 

EXPOSE 3000