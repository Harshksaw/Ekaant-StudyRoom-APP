-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "Banner" TEXT[],
    "RegistrationFee" DOUBLE PRECISION,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "locationImage" TEXT,
    "coords" DOUBLE PRECISION[],
    "appId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
