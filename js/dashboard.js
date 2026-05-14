const API_MOVIMIENTOS = "https://quantpath-backend.onrender.com/api/movimientos";

const movimientosBody = document.getElementById("movimientosBody");

async function cargarMovimientos() {
  try {
    const respuesta = await fetch(API_MOVIMIENTOS);
    const movimientos = await respuesta.json();

    movimientosBody.innerHTML = "";

    movimientos.forEach((movimiento) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${movimiento.fecha}</td>
        <td>${movimiento.tipo}</td>
        <td>${movimiento.descripcion}</td>
        <td class="text-end">$${movimiento.monto}</td>
        <td class="text-end">
          <span class="badge bg-success">${movimiento.estado}</span>
        </td>
      `;

      movimientosBody.appendChild(fila);
    });
  } catch (error) {
    console.log(error);
    movimientosBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Error al cargar movimientos.
        </td>
      </tr>
    `;
  }
}

cargarMovimientos();