const companyList = {
    AAPL: "Apple",
    GOOGL: "Google",
    MSFT: "Microsoft",
    AMZN: "Amazon",
    TSLA: "Tesla"
  };
  
  const companySelect = document.getElementById("company");
  Object.entries(companyList).forEach(([symbol, name]) => {
    const opt = document.createElement("option");
    opt.value = symbol;
    opt.textContent = name;
    companySelect.appendChild(opt);
  });
  
  companySelect.addEventListener("change", async (e) => {
    const symbol = e.target.value;
    const res = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=41f6ea7d936343458b1b895847fe6459`);
    const data = await res.json();
    document.getElementById("symbol").value = data.symbol;
    document.getElementById("current_price").value = data.price;
  });
  
  document.getElementById("buyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      company_name: companyList[companySelect.value],
      symbol: document.getElementById("symbol").value,
      current_price: parseFloat(document.getElementById("current_price").value),
      sector: document.getElementById("sector").value,
      quantity: parseInt(document.getElementById("quantity").value),
      amount_invested: parseFloat(document.getElementById("current_price").value) * parseInt(document.getElementById("quantity").value)
    };
  
    await fetch("/api/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    const card = `
      <div class="col-md-4 mt-3">
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">${data.company_name}</h5>
            <p>Symbol: ${data.symbol}</p>
            <p>Sector: ${data.sector}</p>
            <p>Quantity: ${data.quantity}</p>
            <p>Invested: ₹${data.amount_invested}</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById("cards").innerHTML += card;
  });
  