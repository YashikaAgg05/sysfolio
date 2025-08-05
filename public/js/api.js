const API_KEY = "41f6ea7d936343458b1b895847fe6459"; // Replace with your actual Twelve Data API Key
const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];

async function fetchStocks() {
  const tbody = document.querySelector("#stockTable tbody");
  tbody.innerHTML = "";

  for (const symbol of stockSymbols) {
    const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const row = `
      <tr>
        <td>${data.name || "N/A"}</td>
        <td>${data.symbol}</td>
        <td>${getSector(data.symbol)}</td>
        <td>${data.price}</td>
        <td>${data.high}</td>
        <td>${data.low}</td>
        <td>${getArrow(data)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  }
}

function getSector(symbol) {
  const sectors = {
    AAPL: "IT",
    GOOGL: "Tech",
    MSFT: "IT",
    AMZN: "Retail",
    TSLA: "Automobile"
  };
  return sectors[symbol] || "N/A";
}

function getArrow(data) {
  const price = parseFloat(data.price);
  const open = parseFloat(data.open);
  return price > open ? "📈" : "📉";
}

fetchStocks();
