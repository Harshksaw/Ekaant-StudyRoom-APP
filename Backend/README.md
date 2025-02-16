## **Demo project for learning Docker**

Clone this repo to follow along with me. Or you can create your own project too.

### PSQL Backup Restoration

1. Build and start the Docker container:

   ````bash
   docker compose up --build



    docker cp db_backup/backup.sql <container_id>:/backup.sql

    docker exec -i <container_id> psql -U testing -d notonProduction -f /backup.sql ```
   ````
