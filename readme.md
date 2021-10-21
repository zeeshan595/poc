# Back-End POC

## Prerequisites

* [NPM](https://nodejs.org/en/download/) `7.24.0`
* [Node](https://nodejs.org/en/download/) `16.10.0`
* [Docker](https://docs.docker.com/get-docker/) `20.10.9`
* [Docker Compose](https://docs.docker.com/compose/install/) `1.29.2`

## Setup

#### Start Mongo Db using Docker Compose

```bash
# the app requires a mongodb setup
docker-compose up
```

#### Start Project with Docker

```bash
# build image
docker build --tag poc .
# run built image from docker
docker run poc:latest
```

#### Start Project without Docker

```bash
# download packages
npm install
# build project
npm run build
# start project
npm run start
```