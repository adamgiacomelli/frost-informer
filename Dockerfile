FROM node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install -g -s --no-progress yarn && \
    yarn global add sails && \
    yarn && \
    yarn cache clean

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
EXPOSE 1337