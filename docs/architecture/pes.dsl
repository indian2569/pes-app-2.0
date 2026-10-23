// =============================================================================
// PES - Portfolio Entry System
// Structurizr DSL model (C4 Model)
// Technology Stack Verified:
//   - Backend: Spring Boot 2.7.10 + Java 11
//   - Frontend: Angular 16
//   - Database: PostgreSQL with Flyway V01-VXX
//   - Maven Structure: Single module 'pes-spring' with root pom.xml
//   - Controllers: Single ApiController implementing all domain endpoints
// =============================================================================

model {
    // Level 1: System Context View
    
    person Administrator as AdminUser {
        description Manages system settings, user roles, card configuration, reports, ACL management, file path configuration
    }
    
    person Moderator as ModeratorUser {
        description Manages events, methods, institutions, program assignments, entry line operations, workplace information
    }
    
    person RegularUser as User {
        description Performs core business operations: creates/updates entries and cards, reports on data, personal profile management
    }
    
    system 'PES System' as PESSystem {
        description Web-based application for managing entry lines, cards and events (Spring Boot 2.7.10 backend + Angular 16 frontend)
    }
    
    externalSystem 'Kaspian Identity Provider' as IdP {
        description External OAuth 2.0 / OpenID Connect provider at https://id.kaspian.com; endpoint: /protocol/openid-connect/token for JWT token issuance
    }
    
    externalSystem 'PostgreSQL Database' as PostgreSQLDB {
        description Primary relational database with Flyway migrations (V01-VXX); tables: campaigne, event, coworker, institution, method, program, entry, card, pes_users, roles, user_roles, pes_entry_card, pes_entry_clients, pes_entry_coworker, pes_entry_method
    }
    
    AdminUser --> |Administrator actions| PESSystem :HTTPS (4200); API calls (8080)
    ModeratorUser --> |Moderator actions| PESSystem :HTTPS (4200); API calls (8080)
    User --> |User actions| PESSystem :HTTPS (4200); API calls (8080)

    // Level 2: Container View
    
    package 'Frontend' in PESSystem {
        rectangle 'Angular Frontend SPA' as AngularSPA {
            description Port: 4200; Single Page Application; HTTP/REST communication with Backend API
        }
        
        component AuthInterceptor in AngularSPA : _helpers/auth.interceptor.ts {
            description JWT token interceptor; extracts JWT from response, attaches to future requests
        }
    }
    
    package 'Backend API' in PESSystem {
        rectangle 'Spring Boot Backend API' as BackendAPI {
            description Port: 8080; Undertow Web Server; JPA/Hibernate for persistence; Ehcache + Hazelcast session store configured
        }
        
        component ApiController in BackendAPI : controller.ApiController {
            description Single REST controller implementing all domain endpoints; implements ApiApi interface
        }
        
        component JwtUtils in BackendAPI : util.JwtUtils {
            description Custom JWT token validation and extraction (HS512, jjwt 0.9.1); handles token issuance; no OAuth/OIDC integration
        }
        
        component AuthTokenFilter in BackendAPI : filter.AuthTokenFilter {
            description Spring Security filter for JWT authentication; processes login at /api/auth/* endpoints
        }
        
        component AuthenticationServiceImpl in BackendAPI : service.impl.AuthenticationServiceImpl {
            description Handles user registration, login; stores users in DB; integrates with AuthTokenFilter and JwtUtils
        }
    }

    AngularSPA -[> BackendAPI : HTTP POST/GET /api/*
    JSON payload/response
    Auth: Bearer JWT token in Authorization header
    
    BackendAPI -[>>] PostgreSQLDB : JDBC Connection
    PostgreSQL driver
    Flyway migrations managed
    Batch size: 20

    JwtUtils ..> IdP : OAuth 2.0 Token Exchange
    POST /protocol/openid-connect/token
    Backend issues custom JWT (HS512)
}