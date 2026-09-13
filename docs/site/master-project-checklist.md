# Fused Productions — master project checklist

Status: **Phases 1–5 docs complete. Ops portals implemented in this repo** (login, APIs, Prisma). Stripe Checkout and production Postgres on GMKtec are not live yet — see [portal-runbook.md](./portal-runbook.md).

## Phase 1 — Contracts

- [x] Item 1: Customer Master Service Agreement → [docs/contracts/customers/fused-productions-customer-msa.md](../contracts/customers/fused-productions-customer-msa.md)
- [x] Item 2: Vendor Subcontractor Agreement & SLA → [docs/contracts/vendors/fused-productions-vendor-sla.md](../contracts/vendors/fused-productions-vendor-sla.md)

## Phase 2 — Backend & database architecture

- [x] Item 3: PostgreSQL schema → [database-schema-spec.md](./database-schema-spec.md)
- [x] Item 4: Authentication & security → [auth-and-security-spec.md](./auth-and-security-spec.md)
- [x] Item 5: Core API endpoints → [api-endpoints-spec.md](./api-endpoints-spec.md)

## Phase 3 — Frontend & portals

- [x] Item 6: Public marketing site spec → [public-marketing-site-spec.md](./public-marketing-site-spec.md)
- [x] Item 7: Client portal dashboard spec → [client-portal-dashboard-spec.md](./client-portal-dashboard-spec.md)
- [x] Item 8: Vendor portal dispatch spec → [vendor-portal-dispatch-spec.md](./vendor-portal-dispatch-spec.md)

## Phase 4 — Operations

- [x] Item 9: Subcontractor onboarding workflow → [subcontractor-onboarding-workflow.md](./subcontractor-onboarding-workflow.md)
- [x] Item 10: Day-of run-sheet & contingency → [day-of-run-sheet-and-contingency.md](./day-of-run-sheet-and-contingency.md)

## Phase 5 — Testing & launch specs

- [x] Item 11: End-to-end integration testing protocol → [integration-testing-protocol.md](./integration-testing-protocol.md)
- [x] Item 12: Production deployment & infrastructure → [production-deployment-spec.md](./production-deployment-spec.md)

## Not in this checklist (later, if you want code)

- Build PostgreSQL + auth + APIs
- Build client portal and vendor dispatch UI
- Payment gateway and e-sign
- Wire marketing inquiry form into a CRM pipeline
