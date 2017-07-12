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

1. Install dependencies
```bash
yarn install (or npm install)
```

2. Run
```bash
sails lift (optional --port <portnum>)
```