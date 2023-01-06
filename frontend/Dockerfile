# step 1 - builder
FROM node:19-alpine3.16 as builder

WORKDIR /usr/src/nuxt

# install deps
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# copy rest of the files
COPY . .

# Build the project
ARG NUXT_PUBLIC_API_BASE
RUN yarn generate

# ---------------
# step 2 - nginx
FROM nginx:1.23.3-alpine as production

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# Copy dist file from build
COPY --from=builder /usr/src/nuxt/.output/public /usr/share/nginx/html
