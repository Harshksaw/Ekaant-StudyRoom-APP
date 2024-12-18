-- AlterTable
CREATE SEQUENCE location_appid_seq;
ALTER TABLE "Location" ALTER COLUMN "appId" SET DEFAULT nextval('location_appid_seq');
ALTER SEQUENCE location_appid_seq OWNED BY "Location"."appId";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
