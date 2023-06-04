# API-1-USERS
This API is an Users CRUD built with Node.js ([Express.js](expressjs.com) + [Mongoose](mongoosejs.com)).


## Environment
First of all, make a copy of `.env.example` in [config folder](./config/) and name it just `.env`

## Running

Make sure that you has completed the environment, then:

1. Build docker image with:
```sh
docker build . -t henriqueyun/users-1-api:latest
# or run the shortcut script
./docker/build.sh
```

2. Run it with:
```sh
docker compose -f docker/docker-compose.yaml up
# or run the shortcut script
./docker/docker-up.sh
```

## Tests

There are some tests built with [Jest](jestjs.io), you could run it with `yarn install && yarn test`.

The tests use Mongo Memory Server to run independently of a MongoDB server. There is [Github Action](./.github/workflows/action.yml) running them on main branch push/pull_request.

## Docs

You could check the API Docs, built with [Swagger](swagger.io), after running the app. through the `/api-docs` endpoint.