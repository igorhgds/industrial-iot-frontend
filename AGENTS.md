# AGENTS.md — Industrial IIoT Frontend

## Quick Commands

```bash
# Start development server (with proxy to Spring Boot backend on :8080)
npm start

# Build production bundle
npm run build

# Run unit tests (Vitest)
npm test
```

## Architecture Overview

- **Angular 21.1.x**, **TypeScript 5.x (Strict Mode)**, **Tailwind CSS 4**
- **Feature-Based Clean Architecture**:
  - `src/app/core/`: Singletons, HTTP interceptors (`apiErrorInterceptor`, `authInterceptor`), real-time stream services (`TelemetryStreamService`), global layout (`ShellComponent`), and domain enums.
  - `src/app/shared/`: Purely presentational ("Dumb") components (`HealthBadgeComponent`, `SensorGaugeComponent`, `ConfirmDialogComponent`) and formatting pipes.
  - `src/app/features/`: Lazy-loaded domain features mapped 1:1 with the Spring Boot backend:
    - `dashboard/` — Plant Health Grid ($O(1)$ `EquipmentState`) & Live Telemetry Charts
    - `plant-assets/` — Sectors, Gateways, Equipments, Sensors & Actuators
    - `rules-engine/` — Dynamic RuleGroups (`AND` / `OR` conditions) & Closed-Loop AutomationRules
    - `alerts/` — Anomaly Alerts console (`PENDING` -> `ACKNOWLEDGED` -> `RESOLVED`) & Sensor Snapshots
    - `work-orders/` — Maintenance Work Orders lifecycle & Kanban
    - `users/` — Operators, Engineers & Maintenance Technicians directory

## Key Architectural Rules

1. **Standalone Everything**: All components, directives, and pipes are `standalone: true` (default in Angular 21). Do not introduce `NgModule`.
2. **Signals + RxJS Interop**:
   - Use **RxJS** for asynchronous event streams (`HttpClient`, SSE `EventSource`, WebSockets, timers, retry/backoff operators).
   - Use **Angular Signals** (`signal()`, `computed()`, `input()`, `output()`, `toSignal()`) for synchronous UI state and template binding.
3. **Smart vs. Dumb Components**:
   - **Smart Components (`pages/`)**: Inject services/stores, orchestrate API calls, and pass state down via `input()` signals.
   - **Dumb Components (`components/`)**: Rely strictly on `input()` and `output()` signals. Never inject `HttpClient` or feature API services inside presentational components.
4. **Native Control Flow**: Always use `@if`, `@for (item of items(); track item.id)`, and `@switch` instead of legacy `*ngIf` / `*ngFor`.
5. **Performance & Change Detection**: Use `ChangeDetectionStrategy.OnPush` across components to ensure high-frequency telemetry (every 3s) renders with zero UI jitter.

## Backend API Contract (`localhost:8080`)

All `/api/v1/**` calls are proxied via `proxy.conf.json` to `http://localhost:8080`:
- `/api/v1/sectors`
- `/api/v1/gateways`
- `/api/v1/equipments`
- `/api/v1/equipment-states`
- `/api/v1/sensors`
- `/api/v1/actuators`
- `/api/v1/rule-groups`
- `/api/v1/automation-rules`
- `/api/v1/alerts`
- `/api/v1/work-orders`
- `/api/v1/users`
