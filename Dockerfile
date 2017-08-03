FROM node:boron

#To check if mysql is up
RUN apt-get update && apt-get install netcat-openbsd -y 

WORKDIR /app

# Install app dependencies
ADD . .

RUN npm install -g -s --no-progress yarn

RUN yarn global add sails && \
    yarn && \
    yarn cache clean


EXPOSE 1337

CMD ["npm", "start"]