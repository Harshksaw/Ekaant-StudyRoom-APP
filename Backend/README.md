## **Demo project for learning Docker**

Clone this repo to follow along with me. Or you can create your own project too.

### PSQL Backup Restoration

1. Build and start the Docker container:

   ````bash
   docker compose up --build
   ````


   ````docker exec -it f2d1fefc532e psql -U testing -d notonProduction -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;
   ````

2. Copy the backup file into the container:

   ````bash
   docker cp db_backup/backup.sql 08d48d126ef6:/backup.sql
   ````

3. Restore the backup inside the container:

   ````bash
   docker exec -i 08d48d126ef6 psql -U postgres -d postgres -f /backup.sql
   ````
