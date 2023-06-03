FROM node:18.16.0-alpine
WORKDIR /usr/src/app
RUN ls
COPY package.json .
RUN ls
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]