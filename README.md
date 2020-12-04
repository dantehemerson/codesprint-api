# CodeSprint Backend

![Test CI](https://github.com/dantehemerson/codesprint/workflows/Test%20CI/badge.svg)

CodeSprint is a platform to improve your coding skills.

### Stack

- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/) language
- [PostgreSQL](https://www.postgresql.org/) used as Database
- [Jest](https://jestjs.io/) for testing
- [TypeORM](https://typeorm.io/#/) used as ORM for PostgreSQL
- [TSyringe](https://github.com/microsoft/tsyringe) used for Inversion Control / Dependency Injection
- [routing-controllers](https://github.com/typestack/routing-controllers) abstract the server framework [ExpressJS](https://expressjs.com/) and is used to easly create HTTP controllers

### How to run

**Install npm dependecies**

```
yarn install
```

**Run server**

```
yarn start:dev
```

You can see the service running on: `http://localhost:3123` by default.

**Docs**

We have an ednpoint for [Swagger OAS](https://swagger.io/solutions/getting-started-with-oas/) which is available at `/docs` endpoint.
