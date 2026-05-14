const API_STOCKS = "https://quantpath-backend.onrender.com/api/stocks";

const stocksContainer = document.getElementById("stocksContainer");
const inputBuscar = document.getElementById("buscarStock");

let stocks = [];

async function cargarStocks() {
  try {
    const respuesta = await fetch(API_STOCKS);
    stocks = await respuesta.json();

    mostrarStocks(stocks);
  } catch (error) {
    console.log(error);
    stocksContainer.innerHTML = `
      <div class="col-12">
        <div class="card-qp p-4 text-center">
          <p class="text-danger mb-0">Error al cargar stocks.</p>
        </div>
      </div>
    `;
  }
}

function mostrarStocks(listaStocks) {
  stocksContainer.innerHTML = "";

  if (listaStocks.length === 0) {
    stocksContainer.innerHTML = `
      <div class="col-12">
        <div class="card-qp p-4 text-center">
          <p class="text-muted-qp mb-0">No se encontraron resultados.</p>
        </div>
      </div>
    `;
    return;
  }

  listaStocks.forEach((stock) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    let badge = "bg-secondary";

    if (stock.tendencia === "Subida") {
      badge = "bg-success";
    } else if (stock.tendencia === "Bajada") {
      badge = "bg-danger";
    }

    col.innerHTML = `
      <div class="card-qp p-4 h-100">
        <h5 class="fw-bold">${stock.simbolo}</h5>
        <p class="text-muted-qp mb-1">${stock.nombreEmpresa}</p>
        <div class="display-6 fw-bold">$${stock.precio}</div>
        <span class="badge ${badge}">${stock.cambio}</span>
      </div>
    `;

    stocksContainer.appendChild(col);
  });
}

inputBuscar.addEventListener("input", function () {
  const texto = inputBuscar.value.toLowerCase();

  const filtrados = stocks.filter((stock) => {
    return (
      stock.simbolo.toLowerCase().includes(texto) ||
      stock.nombreEmpresa.toLowerCase().includes(texto)
    );
  });

  mostrarStocks(filtrados);
});

cargarStocks();