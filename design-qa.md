# Revisión del índice de proyectos

El índice presenta Arcblink, Race Tracker, WishFetch y Skenium. Cada portada se compone con HTML y CSS. Los enlaces de producto y las plataformas están dentro de un desplegable nativo.

## Comprobaciones reproducibles

- En escritorio, enfocar Arcblink con el teclado y pasar el ratón por el nombre. Comprobar que la portada aparece y mantiene al menos 24 px de separación con la categoría.
- A 320 px de ancho, abrir Arcblink. Comprobar que los enlaces a las tiendas quedan juntos, que los detalles técnicos aparecen debajo de la portada y que el control mide al menos 44 px de alto.
- Navegar hasta Experience y volver a Projects desde el menú fijo. Probar también el menú móvil, la descarga del CV y los enlaces a correo, LinkedIn y GitHub.
- Con movimiento reducido, comprobar que los nombres y las portadas aparecen sin transición. Con JavaScript desactivado, abrir un proyecto y consultar sus plataformas.

Las pruebas de navegador de `e2e/` cubren estos recorridos en Chromium, Firefox y WebKit.
