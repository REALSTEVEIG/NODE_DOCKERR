# specify the node base image with your desired version node:<version>
FROM node:16

WORKDIR /app

# copy the package.json to install dependencies
COPY package.json .

# install dependencies
RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# copy the rest of the files
COPY . ./

# replace this with your application's default port
EXPOSE 3000

# start the app
CMD ["node", "app.js"]