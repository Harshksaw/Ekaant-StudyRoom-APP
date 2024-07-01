const express = require('express');
const app = express();
const PORT = 9000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.post('/library', )

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
