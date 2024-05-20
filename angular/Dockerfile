# syntax=docker/dockerfile:1.4
FROM --platform=linux/amd64 node:18-bullseye-slim as builder

# Set working directory
WORKDIR /project

# Install Angular CLI
RUN npm install -g @angular/cli@16

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --force

# Copy all files and build the Angular project
COPY . .
RUN ng build --configuration production

# Use a lightweight Node.js image for the final stage
FROM node:18-bullseye-slim as production

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /project/dist/angular ./

# Install http-server to serve the static files
RUN npm install -g http-server

# Expose port 4200
EXPOSE 4200

# Serve the application
CMD ["http-server", "-p", "4200"]