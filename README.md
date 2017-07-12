# cherrydeck

a [Sails](http://sailsjs.org) application

## configuration

### SailsJS
SailsJS have been configured to use only the backend:
- no blueprints
- static assets folder
- no grunt

#### Modules
- sails-hook-babel - to use ES6
- sails-test-helper - a testing suite for sailsjs 

## Running

1. Install dependencies
```bash
yarn install (or npm install)
```

2. Run
```bash
sails lift (optional --port <portnum>)
```