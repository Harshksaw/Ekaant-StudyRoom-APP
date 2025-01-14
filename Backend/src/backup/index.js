const connectionString = 'postgres://your_user:your_password@your_postgres_container_name:5432/your_db';

const { exec } = require('child_process');

const backupDatabase = () => {
  try {
    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const backupFilename = `/home/ubuntu/Ekaant-StudyRoom-APP/Backend/Backup/backup_${timestamp}.sql`;

    // Construct the pg_dump command
    const pgDumpCommand = `docker exec -i ekaant-studyroom-app-db-1 pg_dump -U postgres postgres > ${backupFilename}`;

    // Execute the command
    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error backing up database: ${error}`);
        return;
      }
      console.log(`Database backup successful. Saved to ${backupFilename}`);
      // ... (Optional) Add logic to compress and upload to cloud storage ...
    });
  } catch (error) {
    console.error('Error backing up database:', error);
  }
};

module.exports = backupDatabase;