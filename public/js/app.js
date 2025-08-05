


// // Fetch and populate Last 5 Investments
// fetch('/api/investments')
//   .then(res => res.json())
//   .then(data => {
//     const tbody = document.querySelector('#last-investments tbody');
//     tbody.innerHTML = '';
//     data.forEach(inv => {
//       const row = `<tr>
//         <td>${inv.company}</td>
//         <td>${inv.symbol}</td>
//         <td>₹${(inv.price * inv.quantity).toFixed(2)}</td>
//         <td>₹${(inv.current_value).toFixed(2)}</td>
//       </tr>`;
//       tbody.innerHTML += row;
//     });
//   });

// // Fetch and display Sector-wise Pie Chart
// fetch('/api/chart-data')
//   .then(res => res.json())
//   .then(data => {
//     const labels = data.map(d => d.sector);
//     const values = data.map(d => d.total);

//     new Chart(document.getElementById('sectorChart'), {
//       type: 'pie',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Sectors',
//           data: values,
//           backgroundColor: [
//             '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
//             '#20c997', '#fd7e14', '#17a2b8', '#6610f2'
//           ]
//         }]
//       }
//     });
//   });

// // Fetch portfolio value
// fetch('/api/portfolio-value')
//   .then(res => res.json())
//   .then(data => {
//     document.getElementById('total-invested').innerText = `₹${data.total_invested.toFixed(2)}`;
//     document.getElementById('current-value').innerText = `₹${data.current_value.toFixed(2)}`;

//     const diff = data.current_value - data.total_invested;
//     const status = document.getElementById('profit-status');
//     if (diff > 0) {
//       status.innerHTML = `<span class="text-success">▲ Profit: ₹${diff.toFixed(2)}</span>`;
//     } else if (diff < 0) {
//       status.innerHTML = `<span class="text-danger">▼ Loss: ₹${Math.abs(diff).toFixed(2)}</span>`;
//     } else {
//       status.innerHTML = `<span class="text-muted">No change in value</span>`;
//     }
//   });

// // Dummy Monthly Profit Chart (You can use real data from DB if available)
// const dummyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
// const dummyProfit = [1200, 2300, 1800, 2500, 1900, 3100];

// new Chart(document.getElementById('profitLossChart'), {
//   type: 'line',
//   data: {
//     labels: dummyMonths,
//     datasets: [{
//       label: 'Monthly Profit',
//       data: dummyProfit,
//       borderColor: '#28a745',
//       fill: false,
//       tension: 0.2
//     }]
//   }
// });

// // Toggle Mode
// document.getElementById('toggle-mode').addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });


// Last 5 investments
fetch('/api/investments')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#last-investments tbody');
    tbody.innerHTML = '';
    data.forEach(inv => {
      const row = `<tr>
        <td>${inv.company}</td>
        <td>${inv.symbol}</td>
        <td>₹${inv.amount_invested}</td>
        <td>₹${inv.current_value}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  });

// Portfolio status
fetch('/api/portfolio-status')
  .then(res => res.json())
  .then(data => {
    const statusDiv = document.getElementById('portfolio-status');
    let color = 'text-secondary';
    if (data.profit_loss > 0) color = 'text-success';
    else if (data.profit_loss < 0) color = 'text-danger';
    statusDiv.innerHTML = `
      <h5>Total Invested: ₹${data.total_invested}</h5>
      <h5>Current Value: ₹${data.total_current}</h5>
      <h5 class="${color}">Profit/Loss: ₹${data.profit_loss}</h5>
    `;
  });

// Sector Pie Chart
fetch('/api/chart-data')
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => d.sector);
    const values = data.map(d => d.total);
    new Chart(document.getElementById('sectorChart'), {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sectors',
          data: values,
          backgroundColor: [
            '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
            '#20c997', '#fd7e14', '#17a2b8', '#6610f2'
          ]
        }]
      }
    });
  });

// Dummy profit chart (replace if you have historical data)
new Chart(document.getElementById('profitLossChart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Profit',
      data: [3000, 2000, 5000, 4000, 6000, 4500],
      borderColor: '#28a745',
      fill: false,
      tension: 0.1
    }]
  }
});

// Toggle Mode
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
