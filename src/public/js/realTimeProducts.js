// CLIENTE
import { io } from "socket.io-client";



const socket = io();

// escucho evento del post/delete
socket.on("actualizarLista", () => {

  console.log("Recibido evento para actualizar la lista");

  // solicitud fetch para obtener la nueva lista de productos
  fetch("/api/products")
    .then(response => response.json())
    .then(data => {
      // manipulo DOM para actualizar lista
      actualizarListaEnVista(data.productos);
    })
    .catch(error => {
      console.error("Error al obtener la lista de productos:", error);
    });
});

function actualizarListaEnVista(nuevaLista) {
  // reemplazo el contenido de lista vieja con la nueva lista
  const listaProductos = document.getElementById("listaProductos");
  // limpio lista vieja
  listaProductos.innerHTML = ""; 

  nuevaLista.forEach((producto) => {
    const nuevoProducto = document.createElement("li");
    nuevoProducto.innerHTML = `
      <strong>Producto: </strong>${producto.title}<br>
      <strong>Detalle: </strong>${producto.description}<br>
      <strong>Imagen: </strong>${producto.thumbnail}<br>
      <strong>Precio: $</strong>${producto.price}<br>
      <strong>Stock: </strong>${producto.stock} u.<br><br>
    `;
    listaProductos.appendChild(nuevoProducto);
  });
}
