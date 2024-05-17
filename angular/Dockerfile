# syntax=docker/dockerfile:1.4

FROM --platform=linux/amd64 node:18-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@16

COPY package.json package-lock.json ./
RUN npm ci --force

COPY . .

# CMD line moved to the next stage, so it doesn't affect the final image
CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.json"]

FROM builder as dev-envs

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode


EXPOSE 4200

CMD ng serve --host kaspian-pes.online