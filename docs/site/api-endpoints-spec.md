# FUSED PRODUCTIONS - CORE API ENDPOINTS SPECIFICATION

## 1. Authentication Endpoints

- `POST /api/auth/login` - Authenticates user credentials and returns JWT session token.
- `POST /api/auth/refresh` - Refreshes expired session tokens using secure HTTP-only cookies.

## 2. Client Portal Endpoints

- `GET /api/client/dashboard` - Retrieves active event countdown, milestone statuses, and financial totals for the logged-in client.
- `POST /api/client/payments/process` - Integrates with payment gateway to execute milestone draws (Retainer, Planning Draw, Final Settlement).
- `POST /api/client/documents/sign` - Handles digital e-signature logging and updates document status in the vault.

## 3. Vendor Portal Endpoints

- `GET /api/vendor/dispatch` - Retrieves assigned event run-sheets and load-in windows for the logged-in subcontractor.
- `POST /api/vendor/compliance/upload` - Handles file uploads for W-9 forms and Certificates of Insurance (COI).
- `POST /api/vendor/invoices/submit` - Submits milestone payout requests upon event wrap sign-off.
