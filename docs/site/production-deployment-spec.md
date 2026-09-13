# FUSED PRODUCTIONS - PRODUCTION DEPLOYMENT & INFRASTRUCTURE SPECIFICATION

## 1. Hosting & Infrastructure Architecture

- **Frontend & Backend Hosting:** Deploy Next.js application and Node.js API services to high-availability cloud infrastructure.
- **Database Deployment:** Provision a managed, secure PostgreSQL database instance with automated daily backups and encrypted storage at rest.
- **Domain & DNS Configuration:** Link custom domain names (`fusedproductions.com`) with strict SSL/TLS certificates enforced via automated HTTPS redirection.

## 2. Final Security & Launch Checklist

- **Environment Variables:** Verify that all API keys, database connection strings, JWT secrets, and payment gateway credentials are securely configured in production environment files.
- **Rate Limiting & Firewall:** Enable DDoS protection, IP rate limiting on authentication routes, and CORS policies to restrict unauthorized API access.
- **Final Smoke Test:** Run a final verification of login credentials, role-based access control (RBAC) boundaries, and email notification webhooks prior to public launch.

## 3. Current production note

Marketing site today deploys to GMKtec via GitHub Actions / Docker / Nginx Proxy Manager. Portal, PostgreSQL, JWT, and payment gateway items in this spec are **not live** until those systems are built and provisioned.
