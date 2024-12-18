/*
  Warnings:

  - You are about to alter the column `RegistrationFee` on the `App` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `registrationFees` on the `Library` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `doorPosition` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "RegistrationFee" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Library" ALTER COLUMN "registrationFees" SET DEFAULT 0,
ALTER COLUMN "registrationFees" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[],
ALTER COLUMN "doorPosition" SET DATA TYPE INTEGER[];
