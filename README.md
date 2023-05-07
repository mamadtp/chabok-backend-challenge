# NestJS Chabok Backend Challenge

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM

[Docker](https://www.docker.com/) may also be useful for advanced testing and image building, although it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation.

```sh
git clone https://github.com/mamadtp/chabok-backend-challenge chabok-backend-challenge
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./chabok-backend-challenge
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```

For a standard development configuration, you can leave the default values for `PORT`, `HOST` section.

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh

# Launch the development server with TSNode
npm run start:dev
```

You can now head to `http://localhost:3000/swagger` and see your API Swagger docs. The example passenger API is located at the `http://localhost:3000/api` endpoint.

## 2. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start

# Run the application using "watch"
npm run start:dev

# Transpile the TypeScript files
npm run build

# Internal command used during the Docker build stage
npm run build:docker

# Internal command used during the Docker start
npm run start:docker


# Lint the project files using TSLint
npm run lint

```

## 3. Project goals

The goal of this project is challenge for new member of chabok team
