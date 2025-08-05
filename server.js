// const express = require('express');
// const cors = require('cors');
// const app = express();
// require('dotenv').config();
// const routes = require('./server/routes');

// app.use(cors());
// app.use(express.json());
// app.use('/api', routes);
// app.use(express.static('public'));

// // Redirect root to dashboard
// app.get('/', (req, res) => {
//   res.redirect('/index.html');
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`SYSFOLIO server running at http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const db = require("./server/db");
const path = require("path");

app.use(express.static("public"));
app.use(express.json());

// Buy route
app.post("/buy", (req, res) => {
  console.log("Received data:", req.body);
  const { company, symbol, sector, price, quantity, date, remarks } = req.body;

  if (!company || !symbol || !sector || !price || !quantity || !date) {
    return res.json({ success: false, error: "Missing required fields" });
  }

  const sql =  `INSERT INTO investments (company, symbol, sector, price, quantity, date, remarks)
             VALUES ('${company}', '${symbol}', '${sector}', '${price}', '${quantity}', '${date}', '${remarks}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

// Launch server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
