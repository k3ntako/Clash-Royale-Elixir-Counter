const express = require('express');
const path = require('path');

// Express Setup
const app = express();

// Static Files
app.use('/', express.static('public'));

// Error Handling
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || err.code;
  if (typeof (statusCode) !== 'number' || statusCode < 100) {
    statusCode = 500;
  }

  if (statusCode === 500) {
    console.error(err);
  }

  if (!res.headersSent) {
    res.status(statusCode);
    res.json({ error: err.message })
  }
});


// START SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Started at port ${process.env.PORT || 3000}`);
});
