FROM postgres:14.1-alpine AS base

FROM base AS builder
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=Passw0rd \
    PGDATA=/pgdata \
    FLYWAY_VERSION=6.5.7
ENV FLYWAY_HOME=/opt/flyway/$FLYWAY_VERSION  \
    FLYWAY_PKGS="https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz"

# Install flyway binary
RUN apk add --no-cache openjdk11-jre-headless wget bash \
    && wget --no-check-certificate -q $FLYWAY_PKGS \
    && mkdir -p $FLYWAY_HOME /var/flyway/data \
    && tar -xzf flyway-commandline-$FLYWAY_VERSION.tar.gz -C $FLYWAY_HOME  --strip-components=1 \
    && rm /flyway-commandline-${FLYWAY_VERSION}.tar.gz \
    && chmod +x /opt/flyway/${FLYWAY_VERSION}/flyway

# Add admin scripts and migrations
COPY admin_script/*.sql /docker-entrypoint-initdb.d/
COPY migration /opt/flyway/${FLYWAY_VERSION}/sql
COPY data /opt/flyway/${FLYWAY_VERSION}/sql

RUN nohup bash -c "docker-entrypoint.sh postgres &" \
    && while ! ps aux | grep "[p]ostgres:" ; do sleep 5; done \
    && while ! nc -zv localhost 5432; do sleep 1; done \
    && while ! pg_isready -p 5432; do sleep 5; done \
    && echo "** Flyway" \
    && /opt/flyway/${FLYWAY_VERSION}/flyway info -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -url=jdbc:postgresql://127.0.0.1/pes_prod?currentSchema=pes \
    && /opt/flyway/${FLYWAY_VERSION}/flyway migrate -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -url=jdbc:postgresql://127.0.0.1/pes_prod?currentSchema=pes \
    && /opt/flyway/${FLYWAY_VERSION}/flyway info -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -url=jdbc:postgresql://127.0.0.1/pes_prod?currentSchema=pes \
    && su - postgres -c "pg_ctl stop -D $PGDATA" \
    && while pg_isready ; do sleep 1; done
    
FROM base
COPY --from=builder /pgdata /pgdata
RUN chown postgres:postgres /pgdata \
    && chmod 700 /pgdata
ENV PGDATA=/pgdata

# At this point the image contains all data and pre-set password Passw0rd
# COPY admin_script/container_900_extract.sh /docker-entrypoint-initdb.d/001-extract.sh
