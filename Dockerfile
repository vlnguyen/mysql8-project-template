# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy API and client, ignore db
COPY ./api ./api
COPY ./client ./client

# Build the client
RUN cd ./client && npm ci  && npm run build && cd ..

# Install API dependencies
RUN cd ./api && npm ci  && cd ..

# Prepare API to receive the client build
RUN mkdir -p /usr/src/app/api/public
RUN cp -r ./client/build/* ./api/public/

# Build and run the API
WORKDIR  /usr/src/app/api
RUN npm run prebuild
RUN npm run build
EXPOSE 8080
CMD [ "node", "dist/main.js" ]