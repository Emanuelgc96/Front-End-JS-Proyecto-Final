# Supermercado TodoMarket - Proyecto Final
Autor: Emanuel González Correa

## Descripción
Sitio web interactivo para el supermercado "TodoMarket". El proyecto permite:
- Visualizar productos por categorías.
- Agregar productos al carrito de compras dinámico.
- Editar cantidades y eliminar productos del carrito.
- Persistir el carrito usando `localStorage` para mantener el estado al actualizar o cerrar la página.
- Formularios de contacto funcionales con validación de campos.
- Sección de reseñas organizada en grid.
- Diseño responsive y accesible.

## Estructura del Proyecto
- `index.html`: Página de inicio con bienvenida y historia.
- `productos.html`: Sección de productos organizada en cards, cargadas dinámicamente desde `productos.json`.
- `contacto.html`: Formulario de contacto funcional con validación en JavaScript y envío a Formspree.
- `reseñas.html`: Formulario y sección de reseñas, organizadas en grid.
- `css/style.css`: Estilos generales de la página.
- `js/index.js`: Maneja la interactividad de la página (carrito, validación de formularios, fetch de productos).
- `productos.json`: Datos de productos (nombre, imagen, precio, categoría).
- `img/`: Imágenes de productos y fondos.

## Tecnologías utilizadas
- HTML
- CSS (Flexbox y Grid)
- JavaScript (DOM, fetch API, localStorage)
- Formspree (para manejo de formularios)
- Imágenes de productos y fondos
- Fuentes del sistema / Google Fonts

## Funcionalidad principal
- **Visualización de productos:** Cada producto tiene imagen, nombre y precio.
- **Carrito de compras dinámico:** Agregar, editar y eliminar productos.
- **Persistencia:** Carrito guardado en `localStorage`.
- **Contador dinámico:** Número total de productos en el carrito actualizado en tiempo real.
- **Mini-carrito:** Visualización flotante del carrito.
- **Formulario de contacto:** Validación de campos y envío funcional.
- **Diseño responsive:** Adaptable a distintos tamaños de pantalla (desktop, tablet, móvil).

## Adaptabilidad
El sitio se adapta a distintos tamaños de pantalla usando Media Queries:
- **Escritorio:** diseño completo con menú y productos alineados.
- **Tablet / Móvil:** cards y formularios se ajustan al ancho disponible.
