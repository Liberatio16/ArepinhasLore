let carrito = [];


// =========================
// AL CARGAR LA PAGINA
// =========================

window.addEventListener("load", function () {

    const usuarioGuardado =
        localStorage.getItem("usuarioArepas");

    if (usuarioGuardado) {

        mostrarBienvenida(usuarioGuardado);

    } else {

        document.getElementById(
            "pantallaUsuario"
        ).style.display = "flex";

    }

});


// =========================
// INICIAR SESION
// =========================

function entrarTienda() {

    const input =
        document.getElementById("usuario");

    const nombre =
        input.value.trim();


    if (nombre === "") {

        alert(
            "Por favor escribe tu nombre 🫓"
        );

        return;

    }


    localStorage.setItem(
        "usuarioArepas",
        nombre
    );


    document.getElementById(
        "pantallaUsuario"
    ).style.display = "none";


    mostrarBienvenida(nombre);

}


// =========================
// BIENVENIDA
// =========================

function mostrarBienvenida(nombre) {

    const mensaje =
        document.getElementById(
            "mensajeBienvenida"
        );


    mensaje.textContent =
        "¡Hola, " +
        nombre +
        "! Bienvenido 🫓";


    mensaje.classList.add(
        "mostrar"
    );


    setTimeout(function () {

        mensaje.classList.remove(
            "mostrar"
        );

    }, 3000);

}


// =========================
// CERRAR SESION
// =========================

function cerrarSesion() {

    localStorage.removeItem(
        "usuarioArepas"
    );


    carrito = [];


    actualizarCarrito();


    document.getElementById(
        "usuario"
    ).value = "";


    document.getElementById(
        "pantallaUsuario"
    ).style.display = "flex";

}


// =========================
// AGREGAR CARRITO
// =========================

function agregarCarrito(
    nombre,
    precio
) {

    carrito.push({

        nombre: nombre,

        precio: precio

    });


    actualizarCarrito();


    mostrarNotificacion(
        "🫓 " +
        nombre +
        " agregado"
    );

}


// =========================
// ACTUALIZAR CARRITO
// =========================

function actualizarCarrito() {

    const lista =
        document.getElementById(
            "listaCarrito"
        );


    const cantidad =
        document.getElementById(
            "cantidad"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    lista.innerHTML = "";


    let total = 0;


    if (carrito.length === 0) {

        lista.innerHTML =
            "<p style='text-align:center; color:#888; padding:25px 0;'>Tu carrito está vacío 🫓</p>";

    }


    carrito.forEach(
        function (
            producto,
            indice
        ) {

            total +=
                producto.precio;


            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "item-carrito"
            );


            item.innerHTML = `

                <div class="item-info">

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p>
                        Q${producto.precio.toFixed(2)}
                    </p>

                </div>


                <button
                    class="eliminar"
                    onclick="eliminarProducto(${indice})"
                >

                    Eliminar

                </button>

            `;


            lista.appendChild(item);

        }
    );


    cantidad.textContent =
        carrito.length;


    totalElemento.textContent =
        total.toFixed(2);

}


// =========================
// ELIMINAR PRODUCTO
// =========================

function eliminarProducto(indice) {

    carrito.splice(
        indice,
        1
    );


    actualizarCarrito();

}


// =========================
// MOSTRAR CARRITO
// =========================

function mostrarCarrito() {

    document.getElementById(
        "carrito"
    ).style.display = "flex";

}


// =========================
// CERRAR CARRITO
// =========================

function cerrarCarrito() {

    document.getElementById(
        "carrito"
    ).style.display = "none";

}


// =========================
// FINALIZAR COMPRA
// =========================

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío 🛒"
        );

        return;

    }


    const usuario =
        localStorage.getItem(
            "usuarioArepas"
        ) || "cliente";


    let total = 0;


    carrito.forEach(
        function (producto) {

            total +=
                producto.precio;

        }
    );


    cerrarCarrito();


    document.getElementById(
        "nombreCompra"
    ).textContent =
        usuario;


    document.getElementById(
        "totalCompra"
    ).textContent =
        "Q" +
        total.toFixed(2);


    document.getElementById(
        "compraExitosa"
    ).style.display = "flex";


    carrito = [];


    actualizarCarrito();

}


// =========================
// CERRAR COMPRA EXITOSA
// =========================

function cerrarCompraExitosa() {

    document.getElementById(
        "compraExitosa"
    ).style.display = "none";

}


// =========================
// NOTIFICACION
// =========================

function mostrarNotificacion(texto) {

    const notificacion =
        document.getElementById(
            "notificacion"
        );


    notificacion.textContent =
        texto;


    notificacion.classList.add(
        "mostrar"
    );


    setTimeout(function () {

        notificacion.classList.remove(
            "mostrar"
        );

    }, 2500);

}


// =========================
// FILTRAR PRODUCTOS
// =========================

function filtrarProductos(
    categoria,
    boton
) {

    const productos =
        document.querySelectorAll(
            ".producto"
        );


    productos.forEach(
        function (producto) {

            if (

                categoria === "todos" ||

                producto.dataset.categoria ===
                categoria

            ) {

                producto.style.display =
                    "block";

            } else {

                producto.style.display =
                    "none";

            }

        }
    );


    const botones =
        document.querySelectorAll(
            ".filtros button"
        );


    botones.forEach(
        function (btn) {

            btn.classList.remove(
                "activo"
            );

        }
    );


    boton.classList.add(
        "activo"
    );

}


// =========================
// FORMULARIO
// =========================

function enviarFormulario(event) {

    event.preventDefault();


    const nombre =
        document.getElementById(
            "nombre"
        ).value;


    mostrarNotificacion(
        "¡Gracias, " +
        nombre +
        "! Recibimos tu mensaje ❤️"
    );


    event.target.reset();

}