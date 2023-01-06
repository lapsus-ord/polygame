# 🎉 Polygame: The more the merrier

> **A website with mini-games and rooms (pun intended)**

<br>

## Introduction

- **Backend:** NestJS, Prisma, Passport, Nanoid

- **Frontend:** Nuxt3, daisyUI (tailwindcss), Pinia

<br>

## How to start

```sh
$ git clone https://github.com/lapsus-ord/polygame.git
$ cd polygame
```

With:

- [Make](https://fr.wikipedia.org/wiki/Make) (or use the commands in the corresponding flags, from the Makefile, to your terminal)
- Docker and Docker Compose ([v2](https://docs.docker.com/compose/compose-v2/)):

<br>

1. Fill the root env file (`/.env.dist`) with your variables:

```sh
$ cp .env.dist .env
$ vim .env # or nano if you want :)
```

`BACKEND_BASE` = the domain for the backend (like `localhost`)

`FRONTEND_BASE` = same but for the frontend

2. Build and start the project:

```sh
$ make prod-build
$ make prod-deploy
```

3. Go on your browser and enter the http://frontent.example.tld:3005 <br>
   (The `FRONTEND_BASE` + `HOST_FRONTEND_PORT` from the .env file)

You can check if the containers are running with `docker ps -a` .

4. And finally, if you want to fill your Project with default accounts and games:

```sh
$ docker compose exec backend yarn db:seed
```

Default accounts:

| login | password |
| :---: | :------: |
| admin |  admin   |
| test  |   test   |

And if you want to change them, you can go to [prisma/seed.ts](./backend/prisma/seed.ts).

<br>

## How to dev

1. Install the dependencies, set config (like env files) & start the DB:

```sh
$ make install # install dependencies
$ make config  # set config
$ make dev     # to start the DB
```

2. Open 2 terminals and:

**For backend:**

```sh
$ cd backend/
$ yarn start:dev
$ yarn db:seed # to fill project with fixtures (default accounts and games)
```

Default accounts:

| login | password |
| :---: | :------: |
| admin |  admin   |
| test  |   test   |

**For frontend:**

```sh
$ cd frontend/
$ yarn dev
```

<br>
<hr>

## Resources

- [JKLM.FUN](https://jklm.fun/): my inspiration & a great website for mini-games
- [NestJS](https://docs.nestjs.com/): Node.js framework for scalable server-side applications
- [Prisma](https://www.prisma.io/): ORM with a nice schema declaration and auto-type generation
- [Nuxt 3](https://nuxt.com/): framework for the Vue framework
- [Pinia](https://pinia.vuejs.org/): Vue state management made easy 👍 (and for [persisted state](https://prazdevs.github.io/pinia-plugin-persistedstate/))
- [VueJS v3](https://vuejs.org/guide/): cool documentation and intuitive framework for frontend application
- [DaisyUI](https://daisyui.com/): Cleaner components with Tailwind CSS
- [Socket.IO](https://socket.io/docs/v4/): more [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/)
- [SocketCluster](https://socketcluster.io/): an alternative to Socket.IO and more scalable (w/ k8, but not used...)
