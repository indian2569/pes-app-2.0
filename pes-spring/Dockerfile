# syntax=docker/dockerfile:1.4

FROM maven:3.6.3-jdk-11 AS buildstage

WORKDIR /pes-spring

COPY . .

RUN mvn clean package

FROM openjdk:11.0-jre-slim AS runstage

COPY --from=buildstage /pes-spring/target/pes-1.0.0-SNAPSHOT.jar .

EXPOSE 8080

RUN adduser --system --group spring

USER spring

ENTRYPOINT ["java", "-jar", "pes-1.0.0-SNAPSHOT.jar"]

