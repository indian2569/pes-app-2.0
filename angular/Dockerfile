# Use the official Node.js image as the base image
FROM node:latest

# Set a working directory inside the container for your Angular application
WORKDIR /angular/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli@13
RUN npm install

# Copy the entire Angular application into the container
COPY . .

# Copy the proxy configuration file into the container
COPY proxy.conf.json .

# Set an environment variable to specify the HTTP proxy to be used inside the container (if needed)
ENV http_proxy http://<proxy_host>:<proxy_port>

# Expose the port that the Angular application listens on
EXPOSE 4200

# Start the Angular application with the specified proxy configuration
CMD ng serve --host 0.0.0.0 --port 4200 --proxy-config proxy.conf.json