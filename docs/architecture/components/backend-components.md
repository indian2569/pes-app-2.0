# Backend Component Diagram - Spring Boot API

## Overview

This document describes the internal structure of the Spring Boot Backend API container, showing major logical components and their responsibilities.

**Evidence Base**: Code inspection of `pes-spring/src/main/java/sk/kaspian/pes/controller/ApiController.java` and related service files.

## Container: Spring Boot Backend API

| Property | Value |
|----------|-------|
| **Port** | 8080 |
| **Web Server** | Undertow (spring-boot-starter-web) |
| **Database** | PostgreSQL (Flyway migrations) |
| **ORM** | JPA/Hibernate |
| **Authentication** | Custom JWT via JwtUtils; AuthTokenFilter for security filter chain |
| **Caching** | Ehcache configured (Ehcache 3.8.1 + Hazelcast) per application.yaml |

## Architecture: Monolithic API with Single Controller Pattern

The backend follows a classic monolithic architecture with one main `ApiController` that delegates to multiple service classes. This controller implements the generated `ApiApi` interface instead of using standard `@GetMapping` annotations.

### Main API Controller

- **Class**: `sk.kaspian.pes.controller.ApiController`
- **Pattern**: Single REST controller implementing all domain endpoints
- **Annotations**: `@RestController`, `@CrossOrigin(origins = {"http://localhost:4200", "https://kaspian-pes.online"})`

### Service Layer Architecture

Multiple service classes handle business logic per domain (all in `service/impl/`). Additionally, the authentication layer uses custom JWT utilities.

| Component Class | Responsibility |
|-----------------|----------------|
| `JwtUtils` | Custom JWT token validation and extraction (HS512, jjwt 0.9.1); handles token issuance and verification; no external OAuth/OIDC integration |
| `AuthTokenFilter` | Spring Security filter for JWT authentication; processes login requests |
| `AuthenticationServiceImpl` | Handles user registration, login; stores users in DB; integrates with AuthTokenFilter and JwtUtils |
| `CardServiceImpl` | Card CRUD operations, filtering, pagination |
| `EntryServiceImpl` | Entry line management, queries for cards |
| `EventServiceImpl` | Event CRUD operations |
| `CampaignServiceImpl` | Campaign CRUD operations |
| `InstitutionServiceImpl` | Institution CRUD operations |
| `CoworkerServiceImpl` | Coworker CRUD operations |
| `MethodServiceImpl` | Method CRUD operations, active methods filter |
| `ProgramServiceImpl` | Program CRUD operations |
| `UserServiceImpl` | User management (CRUD, profile updates); separate from authentication logic |
| `ReportServiceImpl` | Report generation logic |

### Component Diagram

```plantuml
@startuml
left to right direction
skinparam component { ArrowColor black }

title Backend Component Architecture - Spring Boot API

package "API Layer" {
    component "ApiController" as ApiCtrl : sk.kaspian.pes.controller.ApiController\nSingle REST controller\nImplements all domain endpoints
}

package "Authentication Layer" {
    component "JwtUtils" as JwtUtil : util/*\nCustom JWT validation (HS512)\nToken extraction and issuance\njjwt 0.9.1
    
    component "AuthTokenFilter" as AuthFilter : filter/*\nSecurity filter for JWT auth\nHandles /api/auth/* endpoints
    
    component "AuthenticationServiceImpl" as AuthSvc : service.impl.AuthenticationServiceImpl\nUser registration/login\nStores users in DB
}

package "Card Management Domain" {
    component "CardServiceImpl" as CardSvc : service.impl/CardServiceImpl\nCRUD operations\nGetAllCards, filter, pagination
}

package "Entry Management Domain" {
    component "EntryServiceImpl" as EntrySvc : service.impl/EntryServiceImpl\nSave entries\ngetAllEntrysForCardMain\ngetAllEntrysOnSite
}

package "Event/Campaign Domains" {
    component "EventServiceImpl" as EventSvc : service.impl/EventServiceImpl\nCRUD operations on events
    
    component "CampaignServiceImpl" as CampSvc : service.impl/CampaignServiceImpl\nCRUD operations on campaigns
}

package "Entity Management Domains" {
    component "InstitutionServiceImpl" as InstSvc : service.impl/InstitutionServiceImpl\nCRUD operations
    
    component "CoworkerServiceImpl" as CowkSvc : service.impl/CoworkerServiceImpl\nCRUD operations
    
    component "MethodServiceImpl" as MethodSvc : service.impl/MethodServiceImpl\nCRUD operations\ngetAllActiveMethods
}

package "Program/User Domains" {
    component "ProgramServiceImpl" as ProgSvc : service.impl/ProgramServiceImpl\nCRUD operations
    
    component "UserServiceImpl" as UserSvc : service.impl/UserServiceImpl\nUser management (CRUD)\nProfile updates (separate from auth)
}

package "Report Generation Domain" {
    component "ReportServiceImpl" as ReportSvc : service.impl/ReportServiceImpl\nReport generation logic
}

package "Persistence Layer" {
    database [(PostgreSQL)] as DB
    note right of DB: Flyway migrations\nV01-VXX
}

ApiCtrl -[>>] JwtUtil
ApiCtrl -[>>] CardSvc
ApiCtrl -[>>] EntrySvc
ApiCtrl -[>>] EventSvc
ApiCtrl -[>>] CampSvc
ApiCtrl -[>>] InstSvc
ApiCtrl -[>>] CowkSvc
ApiCtrl -[>>] MethodSvc
ApiCtrl -[>>] ProgSvc
ApiCtrl -[>>] UserSvc
ApiCtrl -[>>] ReportSvc

AuthSvc -[>>] DB : JPA/Hibernate queries
CardSvc -[>>] DB
EntrySvc -[>>] DB
EventSvc -[>>] DB
CampSvc -[>>] DB
InstSvc -[>>] DB
CowkSvc -[>>] DB
MethodSvc -[>>] DB
ProgSvc -[>>] DB
UserSvc -[>>] DB, Roles
ReportSvc -[>>] DB

note right of ApiCtrl: Single controller pattern\nAll REST endpoints routed here\nCross-origin enabled for Angular
```

## Key API Endpoints

| Method | Endpoint | Handler Component |
|--------|----------|-------------------|
| POST | `/api/auth/register` | `AuthenticationServiceImpl`, `JwtUtils` |
| POST | `/api/auth/login` | `AuthTokenFilter` → `AuthenticationServiceImpl`, `JwtUtils` |
| POST | `/api/card/save` | `CardServiceImpl` |
| GET | `/api/card/{code}` | `CardServiceImpl` |
| DELETE | `/api/card/{code}` | `CardServiceImpl` |
| POST | `/api/entry/save` | `EntryServiceImpl` |
| GET | `/api/entry/getAllCardsEntrys` | `EntryServiceImpl` |
| POST | `/api/event/save` | `EventServiceImpl` |
| GET | `/api/event/getAll` | `EventServiceImpl` |
| POST | `/api/campaign/save` | `CampaignServiceImpl` |
| GET | `/api/campaign/getAll` | `CampaignServiceImpl` |
| POST | `/api/institution/save` | `InstitutionServiceImpl` |
| GET | `/api/institution/getAll` | `InstitutionServiceImpl` |
| POST | `/api/coworker/save` | `CoworkerServiceImpl` |
| GET | `/api/coworker/getAll` | `CoworkerServiceImpl` |
| POST | `/api/method/save` | `MethodServiceImpl` |
| GET | `/api/method/getAll` | `MethodServiceImpl` |
| GET | `/api/method/allActiveMethods` | `MethodServiceImpl` |
| POST | `/api/program/save` | `ProgramServiceImpl` |
| GET | `/api/program/getAll` | `ProgramServiceImpl` |

## Security Configuration

- **WebSecurityConfig**: Configures Spring Security with CORS enabled for Angular frontend
- **JwtUtils**: Custom JWT token validation and extraction (HS512, jjwt 0.9.1)
- **AuthTokenFilter**: Spring Security filter chain for JWT authentication at `/api/auth/*` endpoints
- **AuthenticationServiceImpl**: Processes login/registration requests; stores users in DB

## Evidence Sources

- `controller/ApiController.java` - Main API controller implementation (single controller pattern)
- `service/impl/JwtUtils.java` - Custom JWT utility for token validation and issuance
- `service/impl/AuthTokenFilter.java` - Security filter for authentication
- `service/impl/AuthenticationServiceImpl.java` - User registration/login service
- `service/impl/` - Service implementations
- `repository/` - Repository interfaces for data access
- `pom.xml` - Project dependencies (jjwt 0.9.1, spring-boot-starter-cache, spring-session-hazelcast)