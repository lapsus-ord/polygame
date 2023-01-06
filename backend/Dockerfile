FROM node:19-alpine3.16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY prisma/ prisma/
COPY src/ ./src/
COPY .env ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# install deps and build the project
RUN yarn install
RUN yarn db:generate
RUN yarn build

# start prod server
CMD ["yarn", "app:deploy"]
