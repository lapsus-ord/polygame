FROM node:19-alpine3.16

WORKDIR /usr/src/nest

# install dev deps
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy rest of the files
COPY . .

# build the project
RUN yarn db:generate
RUN yarn build

RUN yarn cache clean

# start api server
CMD ["yarn", "app:deploy"]
