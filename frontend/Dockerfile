# step 1 - builder
FROM node:19-alpine3.16 as builder

WORKDIR /usr/src/nuxt

# install deps
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# copy rest of the files
COPY . .

# build the project
ARG NUXT_PUBLIC_API_BASE
RUN yarn generate

# ---------------
# step 2 - nginx
FROM nginx:1.23.3-alpine as production

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

# copy dist file from build
COPY --from=builder /usr/src/nuxt/.output/public .
RUN chmod a+r . -R

# run in foreground
CMD ["nginx", "-g", "daemon off;"]
