# Relationships Documentation

## Overview

This document describes cross-cutting concerns, dependency relationships, and architectural patterns in the PES application.

**Evidence Base**: Code inspection across backend controllers/services, frontend services, and configuration files.

## Communication Patterns

### 1. Frontend ↔ Backend API (HTTP/REST)

| Aspect | Details |
|--------|---------|
| **Protocol** | HTTPS (port 4200 for UI, port 8080 for API) |
| **Format** | JSON payload/response (application/json) |
| **Authentication** | Bearer JWT token in Authorization header |
| **Interception** | Angular AuthInterceptor extracts tokens from responses |

### 2. Authentication Flow

1. User submits login credentials via `LoginComponent`
2. Frontend POSTs to `/api/auth/login` with credentials
3. Backend validates and calls Kaspiian Identity Provider
4. IdP returns JWT token via `/protocol/openid-connect/token`
5. Backend issues custom JWT (JCA - Java Cryptography Architecture) using JwtUtils
6. Frontend stores token, interceptor attaches to all requests

### 3. Service-Repository Pattern (Backend)

All controllers delegate to services, which delegate to repositories:

```
ApiController → [Domain Services] → Repository → JPA/Hibernate → PostgreSQL
```

## Key Dependency Relationships

| Layer | Component | Depends On | Purpose |
|-------|-----------|------------|---------|
| Controller | `ApiController` (all endpoints) | `[Domain Service]` | Single REST controller pattern - delegates to appropriate service class |
| Authentication Endpoint (`/api/auth/login`) | `ApiController` | `JwtUtils`, `AuthTokenFilter`, `AuthenticationServiceImpl` | JWT token issuance and validation; authenticates users; stores in database |
| Card Endpoints (`/api/card/*`) | `ApiController` | `CardServiceImpl` | Card CRUD operations, filtering, pagination |
| Entry Endpoints (`/api/entry/*`) | `ApiController` | `EntryServiceImpl` | Entry line management, queries for cards |
| Event Endpoints (`/api/event/*`) | `ApiController` | `EventServiceImpl` | Event CRUD operations |
| Campaign Endpoints (`/api/campaign/*`) | `ApiController` | `CampaignServiceImpl` | Campaign CRUD operations |
| Institution Endpoints (`/api/institution/*`) | `ApiController` | `InstitutionServiceImpl` | Institution CRUD operations |
| Coworker Endpoints (`/api/coworker/*`) | `ApiController` | `CoworkerServiceImpl` | Coworker CRUD operations |
| Method Endpoints (`/api/method/*`) | `ApiController` | `MethodServiceImpl` | Method CRUD operations, active methods filter |
| Program Endpoints (`/api/program/*`) | `ApiController` | `ProgramServiceImpl` | Program CRUD operations |
| User Endpoints (`/api/user/*`) | `ApiController` | `UserServiceImpl` | User management (CRUD, profile updates) |
| Settings Endpoints (`/api/settings/*`) | `ApiController` | N/A | File path configuration (simple config access) |
| Report Endpoints (`/api/report/*`) | `ApiController` | `ReportServiceImpl` | Report generation logic |

**Note**: The backend uses a single `ApiController` that implements all domain endpoints, implementing the generated `ApiApi` interface instead of using standard `@GetMapping` annotations.

## Security Dependencies

### JWT Authentication Stack

- **Frontend**: `AuthInterceptor`, `TokenService`, `AuthService` (JWT token management)
- **Backend**: 
  - `JwtUtils` - Custom JWT validation and extraction (HS512, jjwt 0.9.1)
  - `AuthTokenFilter` - Security filter for JWT authentication; no external OAuth/OIDC integration
  - `WebSecurityConfig` - Spring Security configuration (CSRF, CORS)
  - `AuthenticationServiceImpl` - Handles login/registration and stores users in DB
- **IdP**: Kaspiian Identity Provider (OAuth 2.0/OpenID Connect) - accessed via backend for token issuance

### Database Dependencies (Flyway)

- **Database**: PostgreSQL with Flyway migrations (`V01_0_VXX`)
- **Migration Scripts**: `db/specific/postgres/` directory
- **Configuration**: `ddl-auto: none` - all schema changes via Flyway; batch size: 20

## Caching Layer

- **Type**: Ehcache (Ehcache 3.8.1 + Hazelcast)
- **Configuration**: Configured per `application.yaml` with Ehcache.xml config file
- **Usage**: In-memory caching for data access optimization
