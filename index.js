const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const httpServer = require("https").createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.crt')),
  ca:fs.readFileSync(path.join(__dirname, 'cert', 'ca_bundle.crt'))
},app);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist', 'pmgui')));

// Serve the Angular app's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist'  ,'pmgui', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080; // Use the port provided by the environment or default to 3000
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
