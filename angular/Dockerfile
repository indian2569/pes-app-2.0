# syntax=docker/dockerfile:1.4

FROM --platform=linux/amd64 node:17.0.1-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@13.3.11

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# CMD line moved to the next stage, so it doesn't affect the final image
CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.json"]

FROM builder as dev-envs

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

# Copy the necessary artifacts from the builder stage to the final stage
COPY --from=builder /project/proxy.conf.json /project/

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --proxy-config /project/proxy.conf.json