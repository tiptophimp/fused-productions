# FUSED PRODUCTIONS - DATABASE SCHEMA SPECIFICATION (POSTGRESQL)

## 1. Core Tables

### `users`

- `id` (UUID, Primary Key)
- `email` (Varchar, Unique, Not Null)
- `password_hash` (Varchar, Not Null)
- `role` (Enum: `admin`, `client`, `vendor`)
- `created_at` (Timestamp)

### `events`

- `id` (UUID, Primary Key)
- `client_id` (UUID, Foreign Key -> `users.id`)
- `event_name` (Varchar, Not Null)
- `event_date` (Timestamp, Not Null)
- `status` (Enum: `prospect`, `contracted`, `planning`, `completed`, `cancelled`)
- `total_contract_price` (Decimal, Not Null)

### `milestones`

- `id` (UUID, Primary Key)
- `event_id` (UUID, Foreign Key -> `events.id`)
- `milestone_name` (Varchar: e.g., "Initial Retainer", "Planning Draw", "Final Settlement")
- `percentage` (Decimal, Not Null)
- `amount` (Decimal, Not Null)
- `status` (Enum: `pending`, `paid`, `overdue`)
- `due_date` (Timestamp)

### `vendors`

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> `users.id`)
- `company_name` (Varchar, Not Null)
- `service_type` (Varchar: e.g., `Catering`, `Audio/Visual`, `Rentals`)
- `coi_verified` (Boolean, Default False)
- `w9_on_file` (Boolean, Default False)

### `event_assignments`

- `id` (UUID, Primary Key)
- `event_id` (UUID, Foreign Key -> `events.id`)
- `vendor_id` (UUID, Foreign Key -> `vendors.id`)
- `load_in_window` (Timestamp)
- `dispatch_status` (Enum: `assigned`, `confirmed`, `completed`)
