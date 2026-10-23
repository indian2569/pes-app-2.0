# Frontend Component Diagram - Angular SPA

## Overview

This document describes the internal structure of the Angular Frontend Single Page Application.

**Evidence Base**: Code inspection of `angular/src/app/` including `app.module.ts`, `entry.module.ts`.

## Container: Angular Frontend SPA

| Property | Value |
|----------|-------|
| **Port** | 4200 (development) |
| **Framework** | Angular 16 with Standalone Components |
| **UI Library** | Angular Material |
| **State Management** | Native Angular services + BehaviorSubject |
| **HTTP Client** | @angular/common/http with JWT token in headers |

## Root Module Structure (`app.module.ts`)

```typescript
@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    FontAwesomeModule,
    MaterialModules (MatCard, MatProgressSpinner, etc)
  ],
  providers: [authInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
```

## Entry Module Structure (`entry/entry.module.ts`)

```typescript
@NgModule({
  declarations: [
    EntryComponent,      // Main entry view
    AllEntryComponent    // Entries list view
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,   // Route definitions
    SharedModule,        // Shared UI components
    MatProgressSpinnerModule
  ]
})
```

## Module Structure Summary

| Module Directory | Purpose | Key Components |
|-----------------|---------|----------------|
| `home/` | Landing/home page with navigation | HomeModule |
| `entry/` | Entry line management | EntryComponent, AllEntryComponent |
| `card/` | Card management (CRUD) | Card components |
| `setting/` | System settings configuration | Settings components |
| `report/` | Report generation and display | Report components |
| `info/` | Application information display | Info components |
| `login/` | User authentication form | LoginComponent |
| `register/` | User registration form | RegisterComponent |
| `profile/` | User profile view/edit | ProfileComponent |
| `shared/` | Shared UI components | Header, Footer, MenuItem |

## Component Diagram

```plantuml
@startuml
left to right direction
skinparam component { ArrowColor black }

title Frontend Component Architecture - Angular SPA

package "Root Module" {
    component "AppComponent" as AppComponent : Main application shell
    
    component "LoginComponent" as LoginComponent : User login form
    
    component "RegisterComponent" as RegisterComponent : User registration form
    
    component "ProfileComponent" as ProfileComponent : User profile view/edit
}

package "Home Module" {
    component "HomeModule" as HomeModule : Landing page\nNavigation hub to all modules
}

package "Entry Management Module" {
    component "EntryModule" as EntryMod : entry.module.ts
    
    component "EntryComponent" as EntryComp : Main entry view
    note right of EntryComp: Primary form for creating/updating entries
    
    component "AllEntryComponent" as AllEntryComp : Entries list view
}

package "Card Management Module" {
    component "CardModule" as CardMod : card.module.ts
    
    component "CardComponent" as CardComp : Main card management view
    note right of CardComp: CRUD operations\nGet by code/Delete by code
}

package "Shared Components" {
    component "HeaderComponent" as HeaderComp : shared/header.component.ts\nMain navigation menu
    
    component "FooterComponent" as FooterComp : shared/footer.component.ts\nApp footer with links
}

package "Authentication Layer" {
    component "AuthInterceptor" as AuthInter : Interceptor service\nExtracts JWT from response\nAttaches to future requests
    
    component "ErrorInterceptor" as ErrorInter : Error handling interceptor
}

package "Service Components (_services/)" {
    component "AuthService" as AuthService : auth.service.ts\nJWT token management\nLogin/logout logic
    
    component "TokenService" as TokenService : token.service.ts\nToken storage (localStorage)
    
    component "UserService" as UserService : user.service.ts\nUser profile data operations
}

HomeModule --> EntryMod : Router.navigate()
HomeModule --> CardMod : Router.navigate()

LoginComp -[>> AuthInter : Login response handling
RegisterComp -[>> AuthInter : Registration auth flow
ProfileComp -[>> UserService, TokenService : Profile operations
```

## Router Structure

Routes are lazy-loaded and protected by `AuthGuard`:

- `/home` - Home landing page (HomeModule)
- `/entry` - Entry management (EntryModule)
- `/card` - Card management (CardModule)
- `/setting` - Settings (SettingModule)
- `/report` - Reports (ReportModule)
- `/info` - Information (InfoModule)

## Key Services Architecture

| Service | Responsibility | Location |
|---------|----------------|----------|
| `auth.service.ts` | JWT token management, login/logout logic | `_services/auth/` |
| `token.service.ts` | Token storage/retrieval (localStorage) | `_services/token/` |
| `user.service.ts` | User profile data operations | `_services/user/` |

## Evidence Sources

- `app.module.ts` - Root module with shared components and providers
- `entry/entry.module.ts` - Entry domain module example
- `_helpers/auth.interceptor.ts` - JWT token interceptor
- `_helpers/error.interceptor.ts` - Error handling interceptor