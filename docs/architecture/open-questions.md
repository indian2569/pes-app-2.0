# Open Questions and Known Gaps

## Overview

This document tracks known gaps, architectural uncertainties, and areas requiring further investigation in the PES application architecture.

**Evidence Base**: Code inspection across all layers. Items are categorized by confidence level:
- **High Confidence**: Well-documented in code/configuration
- **Medium Confidence**: Inferred from usage patterns
- **Low Confidence**: Assumptions that need verification

## Known Gaps

### 1. Data Dictionary and Schema Documentation

**Gap**: No SQL schema documentation or data dictionary exists.

**Impact**: Difficulty understanding table relationships, field purposes, and constraints.

**Current State**: Flyway migrations exist in `db/specific/postgres/` but are not documented at high level.

**Recommended Action**: Generate entity-relationship diagram from JPA entities in `model/` package.

### 2. Error Handling Strategy

**Gap**: No centralized error handling configuration observed.

**Impact**: Inconsistent error messages, potential information leakage, unclear recovery procedures.

**Current State**: 
- Controllers throw exceptions directly
- No global exception handler (`@ControllerAdvice`) identified in initial scan
- Frontend error responses not explicitly documented

**Recommended Action**: Review for existing `@ExceptionHandler` annotations and add global error handler if missing.

### 3. Audit Trail Implementation

**Gap**: Audit logging for critical operations (create/update/delete) not evident.

**Impact**: Limited visibility into data changes, reduced accountability.

**Current State**: No audit entity or aspect pattern observed in initial review.

**Recommended Action**: Evaluate need for audit trail implementation per compliance requirements.

### 4. API Rate Limiting and Throttling

**Gap**: No rate limiting configuration observed.

**Impact**: Potential DoS vulnerability, resource exhaustion risks.

**Current State**: No rate limiter (e.g., Resilience4j, Redis-based) configured.

**Recommended Action**: Implement rate limiting for high-traffic endpoints.

### 5. API Versioning Strategy

**Gap**: No versioning scheme evident in API paths.

**Impact**: Breaking changes may affect existing consumers without notice.

**Current State**: All endpoints use `/api/*` prefix without version suffix.

**Recommended Action**: Adopt URI-based (`/api/v1/*`) or header-based versioning strategy.

### 6. Frontend Error Boundaries and Recovery

**Gap**: Angular error handling boundaries not explicitly identified.

**Impact**: Poor user experience on component failures, limited graceful degradation.

**Current State**: 
- `catchError` observed in HTTP calls
- No global error state management pattern evident

**Recommended Action**: Implement shared error handling module with retry logic and user-friendly messages.

## Architectural Uncertainties (Medium Confidence)

### 7. Service Communication Pattern

**Uncertainty**: Whether backend services are truly independent or tightly coupled.

**Observation**: All controllers import from same `sk.kaspian.pes` package suggesting monolithic design.

**Recommendation**: Confirm if microservices refactoring is planned.

### 8. Caching Strategy Actual Usage

**Uncertainty**: Ehcache configured but appears disabled per configuration comments.

**Observation**: Configuration contains `#ehcache` comment suggesting intentional disablement.

**Recommendation**: Either implement caching or remove unused dependencies.

### 9. Database Connection Pool Configuration

**Uncertainty**: Exact connection pool settings (max connections, timeout values).

**Observation**: HikariCP used (standard with Spring Boot) but specific tuning not documented.

**Recommendation**: Document connection pool configuration for capacity planning.

## Low Confidence Items (Need Verification)

### 10. External System Integrations

**Uncertainty**: Beyond Identity Provider, no other external systems evident yet.

**Observation**: All endpoints appear to be CRUD/Report operations with no third-party calls identified.

**Recommendation**: Conduct deeper code review for HTTP client calls outside of API gateway.

### 11. File Storage Configuration

**Uncertainty**: Purpose of "file path" mentioned in admin role description.

**Observation**: No file upload endpoints or storage layer (S3, MinIO) configured yet.

**Recommendation**: Investigate if file upload feature was planned but not implemented.

### 12. Multi-tenancy Support

**Uncertainty**: Whether system supports multi-tenant deployment.

**Observation**: Single database schema per Flyway migrations; no tenant ID pattern evident.

**Recommendation**: Confirm single-tenant vs multi-tenant architecture intent.

## Recommendations for Next Review Cycle

1. **Generate Entity-Relationship Diagram** from JPA entity classes in `model/` package
2. **Document API Endpoints** with OpenAPI 3.0 spec (already present via `openapi/` directory)
3. **Create Sequence Diagrams** for key use cases (registration, login, entry creation)
4. **Review and Remove** unused dependencies (e.g., Ehcache if not implemented)
5. **Document Connection Pool** configuration values from `application.properties`

## Architecture Review Checklist

Before architectural changes:

- [ ] Verify impact on authentication flow
- [ ] Check database migration strategy compatibility  
- [ ] Ensure Flyway migrations support new schema changes
- [ ] Review caching implications
- [ ] Confirm API contract stability (versioning)
- [ ] Validate error handling coverage
- [ ] Check audit trail requirements

## How to Update This Document

When discovering evidence for or resolving any item:

1. Add findings under relevant section
2. Move "Low Confidence" items to "Known Gaps" if resolved
3. Archive resolved items to a separate file `resolved-questions.md`

---

**Last Updated**: 2026-10-20  
**Maintained By**: Architecture Team
