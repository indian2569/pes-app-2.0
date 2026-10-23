# PES Application Architecture

## Overview

This document describes the architecture of the **PES (Portfolio Entry System)** application, a Spring Boot backend with an Angular frontend for Kaspian.

**Code Inspection Evidence**: Analysis conducted through review of:
- Backend: `pes-spring/src/main/java/sk/kaspian/pes/` directory structure
- Frontend: `angular/src/app/` module and component organization
- Configuration: `pom.xml`, Flyway migration scripts

### Technology Stack

| Layer | Technology | Version/Details |
|-------|------------|-----------------|
| Backend Framework | Spring Boot | 2.7.10 (from pom.xml parent) |
| Java Runtime | Java | 11 (java.version=11 from properties) |
| Frontend Framework | Angular | 16 with Standalone Components |
| Web Server | Undertow | spring-boot-starter-undertow (Tomcat excluded) |
| Database | PostgreSQL | With Flyway migrations at `db/specific/postgres/` |
| ORM | JPA/Hibernate | spring-boot-starter-data-jpa |
| Caching | Ehcache | spring-boot-starter-cache (configured but disabled in app) |
| Session Store | Hazelcast | spring-session-hazelcast |
| Authentication | JWT | Custom implementation via Kaspiian Identity Provider |
| Security | Spring Security | For CSRF protection, CORS configuration |

**Additional Dependencies**: Flyway (DB migrations), Lombok, MapStruct, Thymeleaf templates, Actuator (monitoring)

## Application Structure

```
pes-app-2.0/
├── angular/                         # Frontend Angular application
│   ├── src/app/
│   │   ├── app.module.ts           # Root module with shared components
│   │   ├── app-routing.module.ts   # Route definitions
│   │   ├── home/                   # Home/landing page module
│   │   ├── entry/                  # Entry line management module
│   │   ├── card/                   # Card management module
│   │   ├── setting/                # Settings configuration module
│   │   ├── report/                 # Report generation module
│   │   ├── info/                  # Application info module
│   │   ├── login/                 # Login component
│   │   ├── register/              # Registration component
│   │   ├── profile/               # User profile component
│   │   └── _services/             # Service components (auth, token, user)
├── pes-spring/                      # Backend Spring Boot application
│   ├── src/main/java/sk/kaspian/pes/
│   │   ├── controller/            # ApiController (single REST controller)
│   │   ├── service/               # Business logic services
│   │   ├── repository/            # JPA repositories
│   │   ├── model/                 # JPA entities
│   │   └── security/              # Security configuration
├── db/specific/postgres/          # Flyway migration scripts
├── docs/architecture/             # Architecture documentation
└── docker-compose.yaml            # Docker deployment configuration
```

## Key Documents

- [System Context](system-context.md) - High-level view of the system and external actors
- [Containers](containers.md) - Container-level architecture diagram
- [Components](components/) - Component-level diagrams for backend API and frontend SPA
- [Relationships](relationships.md) - Cross-cutting concerns and dependencies
- [Open Questions](open-questions.md) - Known gaps and architectural uncertainties

## Architecture Summary

### Backend (Spring Boot API)
- **Controller Pattern**: Single `ApiController` implementing all REST endpoints
- **Service Layer**: Multiple domain-specific services for business logic
- **Repository Layer**: JPA repositories for data access
- **Security**: JWT authentication via Kaspiian Identity Provider

### Frontend (Angular SPA)
- **Module Pattern**: Domain-specific lazy-loaded modules
- **Routing**: Lazy-loaded modules with protected routes via AuthGuard
- **HTTP Interception**: JWT token management via interceptors
- **UI Library**: Angular Material components

## Communication Flow

```
User Browser [4200] --> Angular SPA --> HTTP /api/* --> Spring Boot API [8080]
                                                                     --> PostgreSQL
```

### Authentication Flow

1. User submits credentials via `LoginComponent`
2. Frontend POSTs to `/api/auth/login`
3. Backend calls Kaspiian Identity Provider for OAuth token
4. IdP returns JWT token via `/protocol/openid-connect/token`
5. Frontend stores JWT in localStorage (via AuthInterceptor)

## Navigation Guide

1. **System Context**: Understand system boundaries, users (Admin, Moderator, User), and external systems
2. **Container View**: See frontend/backend separation and deployment structure
3. **Component View**: Dive into specific modules and their responsibilities
4. **Relationships**: Understand controller→service→repository dependencies

## Validation Notes

This documentation was generated through code inspection:
- Verified single `ApiController` pattern (not multiple separate controllers)
- Verified module structure from `app.module.ts` and domain modules
- Verified JWT flow via Identity Provider + custom token issuance
- Flyway migrations confirmed in `db/specific/postgres/`
- Ehcache configured but disabled per configuration
- Spring Boot 2.7.10, Java 11 (from pom.xml)
- Undertow web server (Tomcat excluded via exclusions)
