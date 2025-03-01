-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "offlinePaymentPermission" BOOLEAN NOT NULL DEFAULT false;
npx prisma migrate dev --name add_offline_payment_permission