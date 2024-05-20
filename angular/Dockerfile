# syntax=docker/dockerfile:1.4
FROM --platform=linux/amd64 node:18-bullseye-slim as builder

WORKDIR /project

RUN npm install -g @angular/cli@16

COPY package.json package-lock.json ./
RUN npm ci --force

COPY . .

FROM builder as dev-envs

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--proxy-config", "proxy.conf.json"]
