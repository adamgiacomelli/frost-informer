FROM node:boron

WORKDIR /app

# Install app dependencies
ADD . .

RUN npm install -g -s --no-progress yarn

RUN yarn global add sails && \
    yarn && \
    yarn cache clean


EXPOSE 1337

CMD ["npm", "start"]