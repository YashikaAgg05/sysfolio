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

const express = require('express');
const path = require('path');
const db = require('./server/db'); // Make sure db.js exports connection
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to insert data
app.post('/buy', (req, res) => {
  const { company, symbol, sector, price, quantity, date, remarks } = req.body;

  console.log("Data received from frontend:", req.body); // Debug

  const sql = `INSERT INTO investments (company, symbol, sector, price, quantity, date, remarks)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [company, symbol, sector, price, quantity, date, remarks], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Send back the inserted data to render the card
    return res.json({
      success: true,
      data: {
        company,
        symbol,
        sector,
        price,
        quantity,
        date,
        remarks
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
