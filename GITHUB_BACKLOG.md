# GitHub Project & Backlog Specification: Industrial IIoT Frontend

Repository: https://github.com/igorhgds/industrial-iot-frontend
Backend Repository: https://github.com/igorhgds/industrial-iot-backend

---

## 📌 Labels Legend
- `epic`: Milestone epic container
- `architecture`: Angular workspace setup, routing, interceptors & core services
- `ui-design-system`: SCADA/HMI dark theme, layout shell & shared UI components
- `master-data`: Sectors, Gateways, Equipments, Sensors, Actuators & Users UI
- `realtime-telemetry`: SSE/WebSocket streaming, Signal store, live charts & gauges
- `rules-actuation`: Dynamic RuleGroups (AND/OR) builder & closed-loop actuation
- `operations`: Anomaly Alerts lifecycle, Sensor Snapshots & Work Orders Kanban
- `security-docs`: JWT authentication, Route Guards, Docker & README

---

## 🏁 Milestone 1 (F1): Workspace Setup, Core Architecture & UI Shell

### Issue #1: [F1-US01] Initialize Angular 21 Workspace, Tailwind CSS & Proxy Config
- **Labels:** `architecture`, `f1-foundation`
- **Acceptance Criteria:**
  - [x] Angular 21 workspace initialized with Standalone Components, strict TypeScript mode, and Tailwind CSS.
  - [x] Feature-based directory structure created (`core/`, `shared/`, `features/`).
  - [x] `proxy.conf.json` configured to forward `/api/v1/**` requests to `http://localhost:8080`.
  - [x] Environment files (`environment.ts` / `environment.development.ts`) configured with base API and real-time stream URLs.
- **Definition of Done (DoD):** Application starts cleanly via `npm start` (`ng serve`) with proxy enabled and zero console or linter errors.

### Issue #2: [F1-US02] Core HTTP Architecture: Global Error Interceptor & Domain Enums
- **Labels:** `architecture`, `f1-foundation`
- **Acceptance Criteria:**
  - [ ] TypeScript interfaces created for `ApiErrorResponse` and validation field errors.
  - [ ] Global `apiErrorInterceptor` (`HttpInterceptorFn`) implemented to catch HTTP 400/404/422/500 errors and notify the user.
  - [ ] Core domain enums defined in `core/models/`: `HealthStatus` (`HEALTH`, `WARNING`, `CRITICAL`), `AlertSeverity`, `AlertStatus`, `WorkOrderStatus`, `LogicalOperator`, `ComparisonOperator`, `SensorType`, and `ActuatorType`.
- **Definition of Done (DoD):** HTTP client and error interceptor registered in `app.config.ts` and validated against backend error responses.

### Issue #3: [F1-US03] Industrial SCADA/HMI App Shell & Shared Health Status Components
- **Labels:** `ui-design-system`, `f1-foundation`
- **Acceptance Criteria:**
  - [ ] `ShellComponent` created with collapsible sidebar navigation for Dashboard, Plant Assets, Rules Studio, Alerts, Work Orders, and Users.
  - [ ] Topbar displaying system connectivity indicator and active `PENDING` alerts badge counter.
  - [ ] Reusable `HealthBadgeComponent` rendering semantic colors/animations for `HEALTH`, `WARNING`, and `CRITICAL`.
  - [ ] Lazy-loaded top-level routes configured in `app.routes.ts`.
- **Definition of Done (DoD):** Responsive dark-mode SCADA layout navigating smoothly across all lazy-loaded feature placeholders.

---

## 🏭 Milestone 2 (F2): Plant Hierarchy & Master Data Management

### Issue #4: [F2-US01] Sectors & Edge Gateways Management Module
- **Labels:** `master-data`, `f2-assets`
- **Acceptance Criteria:**
  - [ ] `SectorApiService` and `GatewayApiService` created with typed DTOs (`SectorResponse`, `GatewayResponse`, create/update requests).
  - [ ] Sector list view and reactive form modal for creating/editing sectors.
  - [ ] Gateways list filtered by sector (`GET /api/v1/gateways?sectorId=...`) with MAC/IP address and gateway code validation.
- **Definition of Done (DoD):** Operators can create sectors and register IoT gateways linked to those sectors end-to-end.

### Issue #5: [F2-US02] Equipment Catalog & 360º Motor Detail View (Sensors & Actuators)
- **Labels:** `master-data`, `f2-assets`
- **Acceptance Criteria:**
  - [ ] `EquipmentApiService`, `SensorApiService`, and `ActuatorApiService` implemented.
  - [ ] Equipment registration and update forms.
  - [ ] Equipment Detail view displaying motor metadata, attached sensors (Voltage, Current, Temperature, Vibration with units), and actuators (with `commandMqttTopic`).
  - [ ] Forms to register/edit sensors and actuators directly within the equipment detail page.
- **Definition of Done (DoD):** Full asset hierarchy (Sector -> Gateway -> Equipment -> Sensors & Actuators) manageable through the UI.

### Issue #6: [F2-US03] Users & Technicians Directory Module
- **Labels:** `master-data`, `f2-assets`
- **Acceptance Criteria:**
  - [ ] `UserApiService` implemented for creating and updating users.
  - [ ] User directory table and reactive registration/update form with role selection.
- **Definition of Done (DoD):** Users can be created and selected in downstream Alert acknowledgement and Work Order assignment flows.

---

## 📊 Milestone 3 (F3): Real-Time Telemetry Command Center & Charts

### Issue #7: [F3-US01] Plant Health Overview Grid (Equipment State O(1) Integration)
- **Labels:** `realtime-telemetry`, `f3-realtime`
- **Acceptance Criteria:**
  - [ ] `EquipmentStateApiService` consuming `/api/v1/equipment-states` and `/api/v1/equipment-states/{equipmentId}`.
  - [ ] Summary KPI cards at the top of the dashboard (Total Motors, Healthy, Warning, Critical).
  - [ ] `MotorHealthCardComponent` displaying equipment code, current `HealthStatus`, last telemetry timestamp, and quick navigation to live charts.
- **Definition of Done (DoD):** Dashboard displays accurate $O(1)$ health state for all motors with visual priority for `WARNING` and `CRITICAL` states.

### Issue #8: [F3-US02] Real-Time Telemetry Streaming Service (SSE / WebSocket) & Signal Store
- **Labels:** `realtime-telemetry`, `architecture`, `f3-realtime`
- **Acceptance Criteria:**
  - [ ] `TelemetryStreamService` managing the SSE (`EventSource`) or WebSocket connection with automatic exponential backoff reconnection.
  - [ ] Signal-based state store maintaining the latest readings per sensor and a bounded sliding window (e.g., last 50 data points) for time-series charts.
  - [ ] Automatic cleanup on component destroy (`DestroyRef` / `takeUntilDestroyed`).
- **Definition of Done (DoD):** Live telemetry packets published every 3s by the Python simulator update Angular Signals reactively without page reloads or memory leaks.

### Issue #9: [F3-US03] Live Sensor Gauges & Multi-Axis Time-Series Charts
- **Labels:** `realtime-telemetry`, `ui-design-system`, `f3-realtime`
- **Acceptance Criteria:**
  - [ ] `SensorGaugeComponent` rendering instantaneous sensor values with semantic threshold zones.
  - [ ] `LiveTelemetryChartComponent` plotting real-time time-series trends for temperature, vibration, current, and voltage.
  - [ ] Optimized rendering using `ChangeDetectionStrategy.OnPush` and Signals.
- **Definition of Done (DoD):** Charts and gauges smoothly animate incoming 3-second telemetry readings with zero UI lag.

---

## ⚡ Milestone 4 (F4): Dynamic Rules Engine Studio & Actuation

### Issue #10: [F4-US01] Dynamic Rule Groups & Logical Conditions Builder (AND / OR)
- **Labels:** `rules-actuation`, `f4-rules`
- **Acceptance Criteria:**
  - [ ] `RuleGroupApiService` supporting creation, updates, activation/deactivation, and condition attachment (`POST /api/v1/rule-groups/{id}/conditions`).
  - [ ] Visual builder to select logical operator (`AND` / `OR`), target sensor, comparison operator (`>`, `<`, `>=`, `<=`, `==`), threshold value, and resulting severity (`WARNING` / `CRITICAL`).
  - [ ] Toggle switch to activate/deactivate rule groups dynamically.
- **Definition of Done (DoD):** Engineers can visually create and toggle multi-sensor anomaly rules that immediately govern backend telemetry ingestion.

### Issue #11: [F4-US02] Closed-Loop Automation Rules & Manual Actuation Command Panel
- **Labels:** `rules-actuation`, `f4-rules`
- **Acceptance Criteria:**
  - [ ] `AutomationRuleApiService` implementing `create`, `toggle`, and `executeCommand`.
  - [ ] UI to bind a `RuleCondition` to a target `Actuator` and command payload (e.g., emergency stop, cooling fan activation).
  - [ ] Manual Actuation Command panel on the Equipment Detail page with a safety confirmation modal before dispatching MQTT commands.
- **Definition of Done (DoD):** Closed-loop automation rules and manual actuation commands can be configured and triggered from the UI.

---

## 🚨 Milestone 5 (F5): Incident Management (Alerts) & Work Orders

### Issue #12: [F5-US01] Anomaly Alerts Console & Sensor Snapshot Inspector
- **Labels:** `operations`, `f5-operations`
- **Acceptance Criteria:**
  - [ ] `AlertApiService` supporting `listAll(equipmentId, status)`, `acknowledge(id, request)`, and `dismiss(id)`.
  - [ ] Filterable alerts table by `AlertStatus` (`PENDING`, `ACKNOWLEDGED`, `RESOLVED`) and Equipment.
  - [ ] `SensorSnapshotDrawerComponent` displaying `AlertSensorSnapshotResponse` (exact sensor readings vs. violated thresholds at the moment of the anomaly).
  - [ ] Action buttons/modals for operators to Acknowledge or Dismiss alerts.
- **Definition of Done (DoD):** Complete human-in-the-loop alert lifecycle (`PENDING` -> `ACKNOWLEDGED` -> `RESOLVED`) operational in the frontend.

### Issue #13: [F5-US02] Maintenance Work Orders Kanban & Lifecycle Management
- **Labels:** `operations`, `f5-operations`
- **Acceptance Criteria:**
  - [ ] `WorkOrderApiService` implementing `create`, `assign`, `updateStatus`, and `close`.
  - [ ] Kanban board / status view representing the Work Order state machine.
  - [ ] Modals to assign a technician, transition work order status, and close the work order with resolution notes.
  - [ ] Quick action on an Alert to open a linked Maintenance Work Order.
- **Definition of Done (DoD):** Maintenance teams can track work orders from creation to resolution and closure.

---

## 🔒 Milestone 6 (F6): Security (JWT), Dockerization & Documentation

### Issue #14: [F6-US01] JWT Auth Flow, Route Guards, Nginx Dockerfile & README Documentation
- **Labels:** `security-docs`, `f6-enterprise`
- **Acceptance Criteria:**
  - [ ] Login page, `AuthService` (Signals-based auth state), `authInterceptor` (Bearer JWT token), and functional `authGuard`.
  - [ ] Multi-stage `Dockerfile` (Node 24 Alpine build -> Nginx Alpine runtime with SPA fallback routing).
  - [ ] Complete English `README.md` with Mermaid architecture diagrams, setup instructions, and screenshots.
- **Definition of Done (DoD):** Frontend is secured, containerized via Docker, and documented to enterprise portfolio standards.
