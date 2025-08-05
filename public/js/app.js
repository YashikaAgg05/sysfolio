// Fetch and populate Last 5 Investments
fetch('/api/investments')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#last-investments tbody');
    tbody.innerHTML = '';
    data.forEach(inv => {
      const row = `<tr>
        <td>${inv.company_name}</td>
        <td>${inv.symbol}</td>
        <td>₹${inv.amount_invested}</td>
        <td>₹${(inv.quantity * inv.current_price).toFixed(2)}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  });

// Fetch and display Sector-wise Pie Chart
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
  });s

// Stub for Profit/Loss chart (Monthly)
// Replace with real data if you have historical DB
const dummyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const dummyProfit = [5000, 3000, 7000, 2000, 8000, 9000];

new Chart(document.getElementById('profitLossChart'), {
  type: 'line',
  data: {
    labels: dummyMonths,
    datasets: [{
      label: 'Monthly Profit',
      data: dummyProfit,
      borderColor: '#28a745',
      fill: false,
      tension: 0.1
    }]
  }
});

// Dark/Light Mode Toggle
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
