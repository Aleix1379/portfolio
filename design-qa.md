# Portfolio redesign — revisión y validación

Fecha: 9 de octubre de 2026. Rama: `codex/portfolio-redesign`.

El rediseño de la versión local está implementado y validado. Se conserva Astro, React, TypeScript y CSS Modules; no se añadieron dependencias, servicios ni nuevas rutas. La entrega incluye recursos originales, frontend, pruebas y `dist`, que ya estaba versionado en este repositorio. Los commits son locales; no se ha realizado push ni publicación.

## Diseño aplicado

Se implementa la opción 1, «Quiet editorial», con navegación → presentación → proyectos → experiencia → sobre mí → contacto → pie. Se mantienen `#header`, `#projects`, `#experience`, `#about` y `#contact`.

- Geist Sans variable local con licencia OFL; Dancing Script sólo en el nombre y la firma.
- Tema oscuro inicial y claro disponible, con preferencia persistente y acceso a almacenamiento protegido.
- Navegación de 72/64 px; menú nativo bajo 1024 px; descarga nativa del CV.
- Tarjetas de Arcblink, Race Tracker y WishFetch, en ese orden, con capturas reales, aportación personal y detalles técnicos nativos.
- Tres empleos visibles y el historial restante desplegable, fechas conservadas y responsabilidades concretas sin métricas inventadas.
- Contacto por email, copia con anuncio de resultado y enlaces de LinkedIn/GitHub.
- Iconos originales de sol y luna. Ilustraciones sociales de 80 px en escritorio y 64 px en móvil, azul para LinkedIn y plateado para GitHub; separación de 64/32 px entre enlaces.
- Download CV gris con relieve discreto, altura de 44 px, ilustración de 32 px y estados de hover, pulsación y foco.
- Avatar con bucle infinito de 4,5 segundos por defecto, pausa manual, pausa fuera de pantalla/pestaña oculta y respeto de movimiento reducido.

[Composición seleccionada](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/proposal-1.png). La implementación aplica las medidas explícitas del plan cuando la maqueta las representa de forma aproximada; las pantallas reales conservan su proporción.

## Correcciones de la revisión final

| Hallazgo | Resolución |
| --- | --- |
| Al descargar el CV desde el menú móvil, el foco permanecía en el enlace oculto. | El menú se cierra y el foco vuelve a su disparador, preservando la descarga nativa; prueba unitaria y prueba real en los tres navegadores. |
| La animación continua carecía de pausa manual. | Control Pause animation / Resume animation; mantiene el fotograma al pausar y la elección tras salir de pantalla o cambiar la visibilidad. Pruebas de teclado, estado CSS y movimiento reducido. |
| Playwright dependía de una ruta personal del SSD. | Ruta predeterminada portable `test-results`; `PORTFOLIO_ARTIFACT_DIR` permite guardar nuestros resultados en el SSD externo. |
| El workflow también desplegaba producción en pull requests. | Vercel sólo se ejecuta en eventos push a las ramas principales. Las pull requests conservan build, Jest y Playwright. Se evita instalar dos veces los navegadores. El workflow no se ha ejecutado en GitHub. |
| React 18 advertía sobre `fetchPriority`. | Atributo nativo en minúsculas, conservando la prioridad alta de la imagen del hero; Jest termina sin esa advertencia. |
| Tipo incorrecto del favicon y enlaces históricos intercambiados. | MIME de ICO correcto y URLs de Spring Boot/MySQL corregidas. |
| Recursos de tema de una alternativa descartada. | Eliminados los SVG sin uso; se conservan las imágenes originales elegidas. |

La pausa manual apoya el objetivo de [WCAG 2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Las comprobaciones automáticas y manuales no constituyen una certificación completa.

## Validación final

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Correcto; Astro check: 0 errores, 0 advertencias, 0 sugerencias. |
| Jest | 11 suites, 43 pruebas correctas. |
| Playwright sobre compilación final | 84/84 correctas: 28 escenarios en Chromium, Firefox y WebKit, reutilizando los navegadores instalados. |
| Matriz visual | 320, 390, 768, 1024 y 1440 px, ambos temas; 26 PNG y manifest con medidas. Sin errores JavaScript ni desbordamiento horizontal en los casos registrados. |
| Primer proyecto | La captura comienza a 712 px en 1440 × 900 y 965 px en 390 × 844; cumple los límites de una y dos pantallas. |
| Texto y zoom | Texto al 200 % y zoom CSS al 200 % a 320 px; reflujo y menú abierto/cerrado operativos en ambos temas y tres motores. CSS zoom no equivale a todos los ajustes nativos de cada navegador. |
| Teclado | Foco visible, Escape, cierre del menú y foco del destino, descarga móvil con foco visible y plataformas con flechas/Home/End. |
| Sin JavaScript | Perfil, proyectos, todas las plataformas, experiencia ampliable, email y CV disponibles mediante HTML nativo. |
| Tema y contacto | Persistencia, almacenamiento bloqueado, copia correcta y fallida, y Clipboard API ausente cubiertos por las pruebas. Email seleccionable y resultado anunciado mediante status. |
| Movimiento | Bucle infinito, pausa/reanudación, fallback por error de imagen, visibilidad y movimiento reducido cubiertos por pruebas. |
| Revisión visual manual | Hero y contacto en escritorio oscuro; contacto móvil claro. Se conserva la jerarquía, separación y estilo elegidos. |

Contrastes de los tokens: texto normal/fondo 16,90:1 oscuro y 15,51:1 claro; secundario/superficie 7,95:1 y 6,32:1; texto de acción principal 6,89:1 y 5,27:1. LinkedIn/fondo 5,75:1 y 5,10:1; GitHub/fondo 13,81:1 y 5,66:1. Foco visible y bordes de controles distinguibles. El texto de pausa utiliza el token secundario.

### Lighthouse

Auditorías nuevas, seriales, con Lighthouse 13.5.0 y Chromium instalado, sobre la compilación final local.

| Perfil | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Escritorio | 98 | 100 | 100 | 100 | 1.0 s | 0.002 | 0 ms |
| Móvil | 80 | 100 | 100 | 100 | 4.7 s | 0.001 | 0 ms |

No hay comprobaciones binarias fallidas. Rendimiento móvil queda como mejora posterior: optimización de fuentes y avatar; el plan no fija una puntuación mínima. Son medidas de laboratorio: el servidor estático local no representa compresión ni caché de producción.

## Evidencias

Resultados nuevos en `/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review`, separados de las iteraciones anteriores:

- [Build](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/build.log), [Jest](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/jest.log) y [Playwright](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/playwright.log).
- [Informe HTML Playwright](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/report/index.html).
- [Manifest visual y medidas](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/visual-evidence-manifest.json).
- [Hero con pausa manual](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/hero-desktop.jpg) y [contacto escritorio](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/contact-desktop.jpg).
- [Página completa oscura](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/visual-evidence/implemented-dark-1440-full.png), [clara](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/visual-evidence/implemented-light-1440-full.png) y [contacto móvil claro](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/visual-evidence/implemented-light-390-contact.png).
- [Lighthouse escritorio](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/lighthouse-desktop.report.html) y [móvil](/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review/lighthouse-mobile.report.html).

## Procedencia y límites

Las capturas auténticas y variantes de 480/800/1600 px están documentadas en [manifest.json](public/images/projects/previews/manifest.json). Arcblink muestra partida Android; Race Tracker, calendario y resultados; WishFetch, lista compartida y reserva de una prueba real de junio de 2026. WishFetch conserva una interfaz anterior y nombres técnicos de QA; no se presenta como captura actual de producción. No se generaron interfaces ficticias.

Los PNG transparentes originales y prompts de las ilustraciones se conservan en [social/README.md](public/images/social/README.md) y [download-cv-low-poly-v1.md](public/images/icons/download-cv-low-poly-v1.md). La fuente incluye [licencia OFL](public/fonts/Geist/OFL.txt). Las evidencias voluminosas permanecen en el SSD externo y sus enlaces locales requieren ese entorno.

No se añadió CMS, API, base de datos, analítica, formulario de envío ni servicio de correo. No se ejecutó despliegue. Se respetaron los hooks de Git.

## Reproducción

```sh
npm test -- --runInBand
npm run build
PORTFOLIO_ARTIFACT_DIR=/Volumes/Aleix-SSD/dev-cache/tmp/portfolio-redesign-20261009/tests/final-review \
PLAYWRIGHT_BROWSERS_PATH=/Volumes/Aleix-SSD/dev-cache/ms-playwright \
TMPDIR=/Volumes/Aleix-SSD/dev-cache/tmp \
npx playwright test --workers=3
```

Fuera de este entorno puede omitirse la configuración de rutas externas: Playwright utiliza `test-results`. Los navegadores deben estar instalados previamente. Para revisar la web: `npm run preview -- --host 127.0.0.1 --port 4322`, si ese puerto no está ocupado. La sesión actual sirve `dist` en [127.0.0.1:4322](http://127.0.0.1:4322/?preview=final-review).
