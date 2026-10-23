# Container Diagrams

## Overview

The Container diagram shows how the PES application is decomposed into independently deployable or runnable units, including data stores and external systems.

This documentation is based on code inspection of:

- **Backend**: `pes-spring/` (Spring Boot 2.7.10 application)
- **Frontend**: `angular/src/app/` (Angular SPA)

## What This View Shows

- Backend API container (Spring Boot monolith)
- Frontend SPA container (Angular application)
- Database container (PostgreSQL)
- External identity provider
- Communication protocols and interaction purposes
- Technology choices where verified

## What This View Excludes

- Internal component decomposition (see [Components](components/))
- Specific deployment topology
- Microservice boundaries (none - this is a monolith)

## Container-Level Architecture

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam component {
    ArrowColor black
}

title Container View - PES Application

actor "Administrator" as admin as A1
actor "Moderator" as moderator as A2
actor "User" as user as A3

package "External Systems" {
    circle [Kaspian Identity Provider] ((External System)) as AuthSys
    note right of AuthSys: OAuth 2.0 / OpenID Connect provider\nIssues JWT access tokens
    
    circle [PostgreSQL Database] ((Data Store)) as DB
    note right of DB: Flyway migrations (V01-VXX)\nTables: campaigne, event, coworker,\ninstitution, method, program, entry,\ncard, pes_users, roles, user_roles,\npes_entry_card, pes_entry_clients,\npes_entry_coworker, pes_entry_method
}

package "PES Application" {
    rectangle [] (Spring Boot Backend API) as BackendAPI
    note right of BackendAPI: Port: 8080\nUndertow Web Server\nJPA/Hibernate for persistence\nEhcache + Hazelcast session store configured
    
    rectangle [] (Angular Frontend SPA) as Frontend
    note right of Frontend: Port: 4200\nSingle Page Application\nHTTP/REST communication with Backend API
    
    component "AuthInterceptor" in Frontend : JWT token interceptor
}

A1 --> |Admin actions| Frontend :HTTPS (4200)
A2 --> |Moderator actions| Frontend :HTTPS (4200)
A3 --> |User actions| Frontend :HTTPS (4200)

Frontend -[> BackendAPI :HTTP POST/GET /api/*\nJSON payload/response\nAuth: Bearer JWT token in Authorization header

BackendAPI -[>> DB :JDBC Connection\nPostgreSQL driver\nFlyway migrations managed\nBatch size: 20

AuthSys ..> BackendAPI :OAuth 2.0 Token Exchange\nPOST /protocol/openid-connect/token\nBackend issues JWT

ehcache = container "Ehcache Cache" in BackendAPI {
    note right of ehcache: Ehcache 3.8.1 + Hazelcast\nIn-memory caching layer\nConfigured per application.yaml
}

BackendAPI -[>>] ehcache :JCache/Cache API\nData access optimization\n@enduml\n@enduml