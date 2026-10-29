# syntax=docker/dockerfile:1.4

FROM maven:3.9.14-eclipse-temurin-25 AS buildstage

WORKDIR /pes-spring

COPY . .

RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

# split the fat jar into layers (dependencies change rarely, application often)
RUN java -Djarmode=tools -jar target/pes-1.0.0-SNAPSHOT.jar extract --layers --destination /extracted

FROM eclipse-temurin:25-jre-alpine AS runstage

WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=buildstage /extracted/dependencies/ ./
COPY --from=buildstage /extracted/spring-boot-loader/ ./
COPY --from=buildstage /extracted/snapshot-dependencies/ ./
COPY --from=buildstage /extracted/application/ ./

EXPOSE 8080

USER spring

ENTRYPOINT ["java", "-jar", "pes-1.0.0-SNAPSHOT.jar"]
