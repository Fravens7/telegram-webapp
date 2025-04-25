const API_URL = "https://script.google.com/macros/s/AKfycbxlFI24VM5frmWeGHCyHFf4imso68BvxaiUo9yilm9sE7EnCXA91nPntltrmAW7p2Na/exec";

async function loadData() {
  try {
    const spinner = document.getElementById("spinner");
    const table = document.getElementById("data-table");
    const tbody = table.querySelector("tbody");
    
    const response = await fetch(API_URL);
    const data = await response.json();
    
    tbody.innerHTML = "";
    
    data.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.className = "bg-white text-gray-800 row-enter";
      setTimeout(() => {
        tr.classList.add("row-enter-active");
      }, 100 * index);
      
      row.forEach(cell => {
        const td = document.createElement("td");
        td.className = "border px-4 py-2";
        td.textContent = cell;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    spinner.classList.add("hidden");
    table.classList.remove("hidden");

  } catch (err) {
    console.error("Error al cargar los datos:", err);
  }
}

window.onload = loadData;