FROM node:boron

# Create app directory
WORKDIR /app

RUN mkdir /global

# Install app dependencies
COPY package.json ./global
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN cd /global

RUN npm install -g -s --no-progress yarn && \
    yarn global add sails && \
    yarn && \
    yarn cache clean

EXPOSE 1337