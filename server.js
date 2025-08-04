const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const routes = require('./server/routes');

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(express.static('public'));

// Redirect root to dashboard
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SYSFOLIO server running at http://localhost:${PORT}`);
});