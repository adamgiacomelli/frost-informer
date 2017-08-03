# CherryDeck API

a [Sails](http://sailsjs.org) application

## Configuration

### SailsJS
SailsJS have been configured to use only the backend:

#### Config
- no blueprints
- static assets folder
- no grunt
- no session (will use token based authentication)
- no views (unnecessary for backend)

#### Modules
- [sails-hook-babel](https://github.com/sane/sails-hook-babel) - to use ES6
- [sails-test-helper](https://github.com/zand3rs/sails-test-helper) - a testing suite for SailsJS 
- [sails-swagger](https://github.com/trailsjs/sails-swagger) - adding swagger functionality

## Running

### Docker
* must have docker & docker compose installed 

```bash
docker-compose up 
```
Access your app on http://localhost:5050

Note: The docker config works this way: node_modules are installed on the docker image, after that the code is linked directly into the container

#### Adding npm modules
Add them locally, after that run
```bash
docker-compose up --build
```
### Restarting the backend
```bash
docker-compose restart web
```

### No-Docker

1. Install dependencies
```bash
yarn install (or npm install)
```

2. Run
```bash
sails lift (optional --port <portnum>)
```