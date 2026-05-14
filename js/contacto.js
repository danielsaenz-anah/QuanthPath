const API_URL = "https://quantpath-backend.onrender.com/api/contactos";

const formulario = document.getElementById("formContacto");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const tipoUsuario = document.getElementById("tipoUsuario").value;
  const mensaje = document.getElementById("mensaje").value;

  const nuevoContacto = {
    nombre,
    correo,
    tipoUsuario,
    mensaje,
  };

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoContacto),
    });

    if (respuesta.ok) {
      alert("Datos enviados correctamente.");
      formulario.reset();
    } else {
      alert("Ocurrió un error al enviar los datos.");
    }
  } catch (error) {
    console.log(error);
    alert("No se pudo conectar con el servidor.");
  }
});