-- AlterTable
ALTER TABLE "outbox_emails" ADD COLUMN "sent_at" TIMESTAMP(3);
ALTER TABLE "outbox_emails" ADD COLUMN "sent_via" TEXT;
ALTER TABLE "outbox_emails" ADD COLUMN "error" TEXT;
