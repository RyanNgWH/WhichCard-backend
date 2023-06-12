# WhichCard Back-End - NUS Orbital 2023

This project is developed using the <u>Express.js</u> back end web application framework.

# Getting started

## Setting up your environment

### Node.js

- Download and install Node.js from their official [webpage](https://nodejs.org/en/download). As of this writing, the project uses <u>Node.js LTS 18.16.0</u>.

### MongoDB

- Download and install MongoDB from their official [webpage](https://www.mongodb.com/try/download/community). As of this writing, the project uses <u>MongoDB Community Server 5.0.3</u>.

### Environment variables

- Create a `.env` file in the root folder of this project. The following environment variables are required for the project to run.

  - `MONGO_URL` - The MongoDB connection string. This is used to connect to the MongoDB database.

> An example `.env` [file](example.env) is provided in the root folder of this project. Rename the file to `.env` and fill in the required environment variables.

## Cloning this repository

- Follow the official Git installation [documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git on your system.

- `git clone https://github.com/RyanNgWH/WhichCard-backend.git`

  Clone this git repository.

## Installing project dependencies

- `cd WhichCard-backend`

  Navigate into the cloned git repository.

- `npm install`

  Install all required node package dependencies.

## Running the app

The following command should be executed from the <u>root folder</u> of this project.

- `npm start`

  Starts the api server.
