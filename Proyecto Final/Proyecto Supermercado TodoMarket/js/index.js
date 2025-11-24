document.addEventListener('DOMContentLoaded', () => {
    console.log("JS cargado correctamente");

    validarFormularioContacto();
    actualizarContadorCarrito();
    actualizarMiniCarrito();

    const contenedorProductos = document.querySelector('#contenedor-productos');
    const botonesCategorias = document.querySelectorAll('.ver-productos');
    let categoriaVisible = null;

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.dataset.categoria;

            if (categoriaVisible === categoria) {
                contenedorProductos.innerHTML = '';
                categoriaVisible = null;
                return;
            }

            contenedorProductos.innerHTML = '';

            fetch('./productos.json')
                .then(res => {
                    if (!res.ok) throw new Error('Error al cargar JSON');
                    return res.json();
                })
                .then(data => {

                    const productosFiltrados = data.filter(prod => prod.categoria === categoria);

                    if (productosFiltrados.length === 0) {
                        contenedorProductos.innerHTML = `<p style="color:white;">No hay productos en esta categoría</p>`;
                        categoriaVisible = categoria;
                        return;
                    }

                    productosFiltrados.forEach(prod => {

                        const card = document.createElement('div');
                        card.classList.add('producto-card');

                        // Aquí creamos los botones con la clase correcta
                        card.innerHTML = `
                            <img src="${prod.imagen}" alt="${prod.nombre}">
                            <h3>${prod.nombre}</h3>
                            <p>$${prod.precio}</p>

                            <div class="botones-producto">
                                <button class="comprar-carrito">Comprar</button>
                                <button class="borrar-carrito"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        `;

                        contenedorProductos.appendChild(card);

                        const botonAgregar = card.querySelector('.comprar-carrito');
                        const botonBorrar = card.querySelector('.borrar-carrito');

                        const precio = Number(prod.precio.toString().replace(/\./g, '').replace(',', '.')) || 0;

                        // AGREGAR
                        botonAgregar.addEventListener('click', () => {
                            const productoExistente = carrito.find(item => item.nombre === prod.nombre);

                            if (productoExistente) {
                                productoExistente.cantidad++;
                            } else {
                                carrito.push({ ...prod, precio, cantidad: 1 });
                            }

                            guardarCarrito();
                            actualizarContadorCarrito();
                            actualizarMiniCarrito();

                            const cantidad = carrito.find(i => i.nombre === prod.nombre).cantidad;
                            botonAgregar.textContent = `Comprar (${cantidad})`;
                        });

                        // BORRAR 1
                        botonBorrar.addEventListener('click', () => {
                            const productoExistente = carrito.find(item => item.nombre === prod.nombre);
                            if (!productoExistente) return;

                            if (productoExistente.cantidad > 1) {
                                productoExistente.cantidad--;
                            } else {
                                carrito = carrito.filter(item => item.nombre !== prod.nombre);
                            }

                            guardarCarrito();
                            actualizarContadorCarrito();
                            actualizarMiniCarrito();

                            const prodEnCarrito = carrito.find(item => item.nombre === prod.nombre);
                            botonAgregar.textContent = prodEnCarrito ? `Comprar (${prodEnCarrito.cantidad})` : "Comprar";
                        });

                        // Si ya existe en el carrito al cargar la card
                        const productoEnCarrito = carrito.find(item => item.nombre === prod.nombre);
                        botonAgregar.textContent = productoEnCarrito ? `Comprar (${productoEnCarrito.cantidad})` : "Comprar";
                    });

                    categoriaVisible = categoria;
                })
                .catch(err => console.error('Error al cargar productos:', err));
        });
    });
});

// -----------------------------------------
// FORMULARIO
// -----------------------------------------
function validarFormularioContacto() {
    const form = document.querySelector('#form-contacto');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const nombre = document.querySelector('#nombre').value.trim();
        const email = document.querySelector('#email').value.trim();

        if (nombre === '' || !email.includes('@')) {
            e.preventDefault();
            alert('Por favor completa todos los campos correctamente.');
        }
    });
}

// -----------------------------------------
// CARRITO
// -----------------------------------------
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const contador = document.querySelector('#contador-carrito');
    if (!contador) return;

    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
}

// -----------------------------------------
// MINI CARRITO
// -----------------------------------------
function actualizarMiniCarrito() {
    const miniCarrito = document.querySelector('#mini-carrito');
    if (!miniCarrito) return;

    miniCarrito.innerHTML = '';

    let totalCarrito = 0;

    carrito.forEach(prod => {
        const item = document.createElement('div');
        item.classList.add('item-carrito');

        const subtotal = prod.precio * prod.cantidad;
        totalCarrito += subtotal;

        item.innerHTML = `<span>${prod.nombre} × ${prod.cantidad}</span>`;
        miniCarrito.appendChild(item);
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.textContent = `Total: $${totalCarrito}`;
    miniCarrito.appendChild(totalDiv);
}

// VACIAR CARRITO
const botonVaciar = document.querySelector('#vaciar-carrito');
if (botonVaciar) {
    botonVaciar.addEventListener('click', () => {
        carrito = [];
        guardarCarrito();
        actualizarContadorCarrito();
        actualizarMiniCarrito();

        // Reiniciar todos los botones "Comprar" a su estado inicial
        const botonesComprar = document.querySelectorAll('.comprar-carrito');
        botonesComprar.forEach(boton => {
            boton.textContent = "Comprar";
        });
    });
}

// MOSTRAR / OCULTAR MINI CARRITO
const botonCarrito = document.querySelector('#boton-carrito');
const miniCarrito = document.querySelector('#mini-carrito');

if (botonCarrito && miniCarrito) {
    botonCarrito.addEventListener('click', () => {
        miniCarrito.classList.toggle('oculto');
    });
}


