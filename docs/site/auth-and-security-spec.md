# FUSED PRODUCTIONS - AUTHENTICATION & SECURITY SPECIFICATION

## 1. Authentication Strategy

- **JWT (JSON Web Tokens):** Stateless authentication tokens issued upon successful login, expiring after 24 hours with secure refresh token rotation.
- **Role-Based Access Control (RBAC):** Middleware checks embedded user roles (`admin`, `client`, `vendor`) on incoming requests:
  - **Clients:** Restricted exclusively to their own project dashboard, documents, and milestone payment ledgers.
  - **Vendors:** Restricted exclusively to their assigned dispatch boards, run-sheets, and upload portals.
  - **Admins (Fused Productions Management):** Full global read/write access across all system records.

## 2. Security Best Practices

- **Password Hashing:** Bcrypt with a work factor of 12.
- **Data Encryption:** TLS 1.3 enforced for all transit traffic; sensitive database fields encrypted at rest.
- **Environment Isolation:** Database credentials, payment gateway keys, and JWT secrets managed securely via environment variables.
