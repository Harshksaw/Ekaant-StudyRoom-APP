const connectionString = 'postgres://your_user:your_password@your_postgres_container_name:5432/your_db';

const { exec } = require('child_process');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const backupDatabase = (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const backupFilename = `/home/ubuntu/Backup/backup_${timestamp}.sql`;
    // const backupFilename = `/tmp/db_backup_${timestamp}.sql`;
    // Construct the pg_dump command
    const pgDumpCommand = `docker exec backend-psql-1 pg_dump -U postgres postgres > ${backupFilename}`;

    // Execute the command
    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error backing up database: ${error}`);
        return;
      }
      console.log(`Database backup successful. Saved to ${backupFilename}`);
      // ... (Optional) Add logic to compress and upload to cloud storage ...
      // Upload backup to Google Drive

      // Setup Google Drive API
      const auth = new google.auth.GoogleAuth({
        keyFile: './ekaant.json', // Update with your credentials path
        scopes: ['https://www.googleapis.com/auth/drive'],
      });

      const drive = google.drive({ version: 'v3', auth });

      // Upload file to Google Drive
      const fileMetadata = {
        name: path.basename(backupFilename),
        parents: ['1MTf1IMys_Ju9ST5r0oN8JR-oxgrhblNV'], // Replace with your Google Drive folder ID
      };

      const media = {
        mimeType: 'application/sql',
        body: fs.createReadStream(backupFilename),
      };

      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      }, (err, file) => {
        if (err) {
          console.error('Error uploading to Google Drive:', err);
        } else {
          console.log('Backup uploaded to Google Drive with ID:', file.data.id);
        }
      });


      if (res) {
        return res.status(200).json({ backupFilename });
      }
    });
  } catch (error) {
    console.error('Error backing up database:', error);
  }
};

module.exports = backupDatabase;