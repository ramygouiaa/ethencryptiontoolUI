const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
/*
app.use(cors({
origin:"*"
}));
*/
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`UI server listening on port ${port}...`);
});