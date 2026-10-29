# syntax=docker/dockerfile:1.4

FROM maven:3.9.14-eclipse-temurin-21 AS buildstage

WORKDIR /pes-spring

COPY . .

RUN mvn clean package

FROM eclipse-temurin:21-jre-jammy AS runstage

COPY --from=buildstage /pes-spring/target/pes-1.0.0-SNAPSHOT.jar .

EXPOSE 8080

RUN adduser --system --group spring

USER spring

ENTRYPOINT ["java", "-jar", "pes-1.0.0-SNAPSHOT.jar"]

