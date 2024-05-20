# syntax=docker/dockerfile:1.4
# Build stage
FROM --platform=linux/amd64 node:18-bullseye-slim as builder

WORKDIR /project

# Install Angular CLI globally
RUN npm install -g @angular/cli@16

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --force

# Copy all project files
COPY . .

# Build the Angular project
RUN ng build --configuration production

# Final stage
FROM --platform=linux/amd64 node:18-bullseye-slim as runner

WORKDIR /project

# Copy the built files from the builder stage
COPY --from=builder /project/dist /project/dist

# Set the default command to output the contents of the build directory
CMD ["sh", "-c", "echo 'Build files are ready in /project/dist' && ls /project/dist"]