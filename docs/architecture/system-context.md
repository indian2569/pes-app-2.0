# System Context Diagram

## Overview

The System Context diagram shows the PES (Program Entry System) application in its operational environment, including human users, external systems, and data stores. This documentation is based on code inspection of:

- **Backend**: `pes-spring/` (Spring Boot 2.7.10 application)
- **Frontend**: `angular/src/app/` (Angular SPA)
- **Database**: PostgreSQL with migration scripts in `db/specific/postgres/`

## What This View Shows

- The main software system split into backend and frontend tiers
- Human users interacting with the system
- External systems the application communicates with
- High-level interactions between actors and the system

## What This View Excludes

- Internal container decomposition (see [Containers](./containers.md))
- Component-level details (see [Components](components/))
- Specific deployment topology
- Network configuration details

## User Roles

| Role | Responsibilities | Access Level |
|------|------------------|--------------|
| **Administrator** | System settings, user roles, card configuration, reports, ACL management, file path configuration | Full system access |
| **Moderator** | Event/method/institution/program management, entry operations, workplace information | Data management access |
| **User** | Core business operations: create/update entries and cards, generate reports, profile management | Operational access |

## C4 Diagrams

### Level 1 - System Context View

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam component {
    ArrowColor black
}

title System Context View - PES Application

actor "Administrator" as admin as A1
note right of A1: Manages system settings, user roles\nCard configuration, Reports\nAccess control lists (ACL)\nFile path management

actor "Moderator" as moderator as A2
note right of A2: Manages events, methods,\nInstitutions, Program assignments\nEntry line operations\nWorkplace information

actor "User" as user as A3
note right of A3: Performs core business operations:\nCreates/updates entries and cards\nReports on data\nPersonal profile management

package "External Systems" {
    circle [Kaspian Identity Provider] ((Identity Provider)) as AuthSys
    note right of AuthSys: OAuth 2.0 / OpenID Connect\nEndpoint: /protocol/openid-connect/token\nIssue JWT tokens for authentication
    
    circle [PostgreSQL Database] ((Database)) as DB
}

package "PES Application" {
    rectangle [] (Spring Boot Backend API) as BackendAPI
    note right of BackendAPI: Port: 8080\nUndertow Web Server\nExposes REST APIs at /api/*\nUses Custom JWT for session management\nSecurity: Spring Security + JwtUtils + AuthTokenFilter (no OAuth/OIDC)\nCaching: Ehcache + Hazelcast configured
    
    rectangle [] (Angular Frontend SPA) as Frontend
    note right of Frontend: Port: 4200\nSingle Page Application\nHTTP/REST communication with Backend API\nAuth: Bearer token in HTTP headers\nIntercepted by AuthInterceptor
}

A1 --> |Admin actions| Frontend :HTTPS (4200)\nAPI calls (8080)
A2 --> |Moderator actions| Frontend :HTTPS (4200)\nAPI calls (8080)
A3 --> |User actions| Frontend :HTTPS (4200)\nAPI calls (8080)

Frontend -[> BackendAPI :HTTP POST/GET /api/*\nJSON payload/response\nAuth: Bearer JWT token in Authorization header\nContent-Type: application/json

BackendAPI -[>> DB :JDBC Connection\nPostgreSQL driver\nFlyway migrations managed (ddl-auto: none)\nBatch size: 20
AuthSys ..> BackendAPI :OAuth 2.0 Token Exchange\nPOST /protocol/openid-connect/token\nResponse: JWT token to Backend for custom issuance\n@enduml\n@enduml