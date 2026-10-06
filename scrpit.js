const productos = [
  {
    id: 1,
    nombre: "PEPTIDE LIP BALM",
    descripcion: "Combo de 5 tonos con distintos aromas. ¡Descubre tu match!",
    precio: 65000,
    imagen: "https://ateneaprofesional.com/cdn/shop/files/COMPLEMENTARIAS-PEPTIDELIPBALM-TODOSLOSTONOS.webp?v=1788788078&width=800"
  },
  {
    id: 2,
    nombre: "LIP BALM MASK",
    descripcion: "¡Hidratación profunda en un solo paso!",
    precio: 38000,
    imagen: "https://ateneaprofesional.com/cdn/shop/files/Atenea_Ecommerce_Agosto0922.jpg?v=1764340656&width=1000"
  },
  {
    id: 3,
    nombre: "PESRAÑINA 1ST SCENE",
    descripcion: " Ideal para quienes desean resaltar sus ojos sin perder naturalidad ni sofisticación..",
    precio: 30000,
    imagen: "https://ateneaprofesional.com/cdn/shop/files/Pestanina_cafe_15798438-8c2b-4e75-a1ae-5d74dbc3f4e3.jpg?v=1756475587&width=1000"
  },
  {
    id: 4,
    nombre: "PALETA DE RUBORES BLUSHED CHEEKS",
    descripcion: "Paleta de 9 rubores creada para pieles blancas, trigueñas y morenas.",
    precio: 120000,
    imagen: "https://ateneaprofesional.com/cdn/shop/files/Frame_240.png?v=1743915849&width=800"
  },
  {
    id: 5,
    nombre: "KIT DE BROCHAS DE MAQUILLAJE SILVER",
    descripcion: "El kit de brochas Silver es perfecto para dar un acabado profesional a tu maquillaje, su textura es suave y no maltrata la piel.",
    precio: 220000,
    imagen: "https://ateneaprofesional.com/cdn/shop/files/Atenea_Mayo_Ecommerce0663.jpg?v=1743915965&width=1000"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
