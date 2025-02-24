const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const backupDatabase = (req, res) => {
  try {
    const now = new Date();
    // Replace colons with underscores to make the filename safe
    const dateString = now.toISOString().replace(/[:]/g, '_');
    const filename = `backup_${dateString}.sql`;
    const backupDir = '/home/ubuntu/Backup';

    // Ensure the backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Construct the pg_dump command using the database container hostname.
    // Replace 'your_db_password' with the actual password, or set it as an environment variable.
    const pgDumpCommand = `pg_dump -h psql -U postgres postgres`;

    // Pass PGPASSWORD via env to avoid interactive prompt
    exec(pgDumpCommand, { env: { ...process.env, PGPASSWORD: 'ekaant' } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup error: ${error}`);
        return res.status(500).json({ error: stderr });
      }

      // Write the backup output to a file
      const backupPath = path.join(backupDir, filename);
      fs.writeFileSync(backupPath, stdout);

      // Return the backup file information in the response
      res.json({
        filename,
        backupPath,
        backupData: stdout
      });
    });
  } catch (error) {
    console.error('Error backing up database:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = backupDatabase;
