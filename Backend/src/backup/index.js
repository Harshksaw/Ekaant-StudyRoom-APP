const connectionString = 'postgres://your_user:your_password@your_postgres_container_name:5432/your_db';

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const backupDatabase = (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const backupFilename = `/home/ubuntu/Backup/backup_${timestamp}.sql`;

    // Construct the pg_dump command
    const pgDumpCommand = `sudo docker exec -i ekaant-studyroom-app-db-1 pg_dump -U postgres postgres > ${backupFilename}`;

    // Execute the command
    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error backing up database: ${error}`);
        return res.status(500).json({ error: 'Error backing up database' });
      }
      console.log(`Database backup successful. Saved to ${backupFilename}`);

      // Serve the backup file as a downloadable response
      res.download(backupFilename, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          return res.status(500).json({ error: 'Error downloading the file' });
        }
      });
    });
  } catch (error) {
    console.error('Error backing up database:', error);
    return res.status(500).json({ error: 'Error backing up database' });
  }
};

module.exports = backupDatabase;