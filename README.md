<p align="center">
  <img src="public/images/logo.png" alt="Marimar Milenium" width="280" />
</p>

<h1 align="center">🛒 Marimar Milenium — E-commerce Mayorista</h1>

<p align="center">
  <strong>Plataforma de comercio electrónico B2B para la distribución de víveres, embutidos y productos alimenticios en toda Venezuela.</strong>
</p>

> ⚠️ **Nota:** Este proyecto se encuentra actualmente **en proceso de finalización**.

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Productos-600+-FF6B00?style=for-the-badge" alt="600+ Productos" />
</p>

---

## 📋 Tabla de Contenidos

- [✨ Sobre el Proyecto](#-sobre-el-proyecto)
- [🎯 Funcionalidades Principales](#-funcionalidades-principales)
- [🏗️ Arquitectura y Componentes](#️-arquitectura-y-componentes)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📝 Notas Técnicas](#-notas-técnicas)

---

## ✨ Sobre el Proyecto

**Marimar Milenium** es una aplicación web tipo e-commerce diseñada para la venta mayorista (B2B) de productos alimenticios. La plataforma ofrece un catálogo extenso de **más de 600 productos**, organizados en múltiples categorías como embutidos, quesos, salsas, aderezos, bebidas y más.

La interfaz está construida con un diseño moderno, responsivo y profesional, optimizada para que los negocios puedan explorar el catálogo, filtrar productos y gestionar sus pedidos de forma rápida e intuitiva.

> 🇻🇪 **Enfocada al mercado venezolano** — Precios en USD, métodos de pago locales (Zelle, Pago Móvil, Efectivo) y delivery a nivel nacional.

---

## 📸 Muestras de la Interfaz

<p align="center">
  <img src="muestras/Screenshot%202026-05-31%20161741.png" alt="Muestra 1" width="800" />
  <br/><br/>
  <img src="muestras/Screenshot%202026-05-31%20162405.png" alt="Muestra 2" width="800" />
  <br/><br/>
  <img src="muestras/Screenshot%202026-05-31%20162449.png" alt="Muestra 3" width="800" />
  <br/><br/>
  <img src="muestras/Screenshot%202026-05-31%20162529.png" alt="Muestra 4" width="800" />
  <br/><br/>
  <img src="muestras/Screenshot%202026-05-31%20162550.png" alt="Muestra 5" width="800" />
</p>

---

## 🎯 Funcionalidades Principales

### 🏠 Página Principal
| Función | Descripción |
|---------|-------------|
| **Hero Carousel** | Banner rotativo con auto-play (6s) y navegación manual. Muestra promociones destacadas con animaciones suaves de entrada. |
| **Barra de Confianza** | Indicadores de Delivery Nacional, Pago Seguro, Soporte 24/7 y Precios Mayoristas. |
| **Promociones Destacadas** | Fila de tarjetas promocionales con ofertas especiales del momento. |

### 🔍 Búsqueda y Filtrado Avanzado
| Función | Descripción |
|---------|-------------|
| **Barra de búsqueda** | Busca productos por nombre o marca en tiempo real, integrada en el header. |
| **Filtro por Categorías** | 13 categorías principales: Aceites, Aderezos, Bebidas, Cereales, Embutidos, Jamones, Mayonesas, Mostazas, Quesos, Salsas BBQ, Salsas de Tomate, Vinagres y más. |
| **Filtro por Marcas** | Selección múltiple por marca (checkbox). Se generan automáticamente del catálogo. |
| **Filtro por Presentación** | Filtra por tipo de empaque o unidad de venta. |
| **Rango de Precios** | Inputs numéricos para definir precio mínimo y máximo. |
| **Ordenamiento** | Relevancia, Más Vendidos, Precio ascendente/descendente, Nombre A-Z. |
| **Sidebar responsivo** | Filtros colapsables en móvil con botón toggle. |

### 🛍️ Catálogo de Productos
| Función | Descripción |
|---------|-------------|
| **Tarjetas de Producto** | Grid responsivo (2-4 columnas) con imagen, marca, nombre, categoría, precio y badges (Oferta, Nuevo, Más Vendido). |
| **Efecto Hover** | Zoom en imagen, aparición de botón "Agregar" y opción de Vista Rápida al pasar el cursor. |
| **Imagen alternativa** | Soporte para imagen secundaria en hover (para productos con foto dual). |
| **Fallback visual** | Productos sin fotografía muestran iniciales de la marca con un ícono elegante como placeholder dinámico. |
| **Paginación** | Navegación por páginas con indicador de total de productos encontrados. |
| **Breadcrumbs** | Navegación contextual que refleja la categoría seleccionada. |

### 👁️ Vista Rápida (Quick View)
| Función | Descripción |
|---------|-------------|
| **Modal de producto** | Vista detallada en overlay con imagen ampliada, marca, nombre y precio. |
| **Info de disponibilidad** | Indicador de disponibilidad inmediata en almacén. |
| **Presentación** | Muestra el tipo de empaque/unidad de venta del producto. |
| **Agregar al carrito** | Botón de acción directa desde la vista rápida. |

### 🛒 Carrito de Compras
| Función | Descripción |
|---------|-------------|
| **Drawer lateral** | Panel deslizable desde la derecha con efecto blur en el fondo. |
| **Gestión de cantidades** | Botones +/- para actualizar cantidades de cada producto. |
| **Eliminar productos** | Botón para remover ítems individuales del carrito. |
| **Resumen financiero** | Subtotal, envío estimado (gratis +$100) y total. |
| **Estado vacío** | Diseño elegante cuando el carrito no tiene productos, con CTA para explorar. |
| **Badge dinámico** | Contador de productos en el ícono del carrito del header. |

### 📱 Menú Móvil
| Función | Descripción |
|---------|-------------|
| **Drawer lateral izquierdo** | Menú hamburguesa con overlay oscuro y animación. |
| **Búsqueda integrada** | Campo de búsqueda dentro del menú móvil. |
| **Navegación por categorías** | Listado completo de categorías con scroll suave al catálogo. |

### 📧 Footer y Contacto
| Función | Descripción |
|---------|-------------|
| **Información de contacto** | Dirección, teléfono y email de la empresa. |
| **Redes sociales** | Enlaces a Facebook, Instagram y WhatsApp. |
| **Categorías populares** | Acceso directo a las categorías más buscadas. |
| **Newsletter** | Formulario de suscripción para recibir ofertas. |
| **Métodos de pago** | Indicadores de Zelle, Pago Móvil y Efectivo. |

---

## 🏗️ Arquitectura y Componentes

```
┌──────────────────────────────────────────────────┐
│                    App.tsx                        │
│           (Estado global + Filtrado)             │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Header  │  │ HeroCarousel │  │  TrustBar  │  │
│  └─────────┘  └──────────────┘  └────────────┘  │
│                                                  │
│  ┌──────────────┐  ┌─────────────────────────┐   │
│  │ FilterSidebar│  │     Catálogo Grid       │   │
│  │  • Categorías│  │  ┌───────┐ ┌───────┐    │   │
│  │  • Marcas    │  │  │Product│ │Product│    │   │
│  │  • Empaque   │  │  │ Card  │ │ Card  │ …  │   │
│  │  • Precio    │  │  └───────┘ └───────┘    │   │
│  └──────────────┘  │  ┌────────────────────┐ │   │
│                    │  │    Pagination       │ │   │
│                    │  └────────────────────┘ │   │
│                    └─────────────────────────┘   │
│                                                  │
│  ┌──────────────┐  ┌─────────────────────────┐   │
│  │  QuickView   │  │      CartDrawer         │   │
│  │   (Modal)    │  │   (Drawer lateral)      │   │
│  └──────────────┘  └─────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │              Footer                      │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### Componentes Principales

| Componente | Archivo | Función |
|:-----------|:--------|:--------|
| `Header` | `Header.tsx` | Barra superior con logo, navegación, búsqueda, dropdown de categorías, carrito y menú móvil. |
| `HeroCarousel` | `HeroCarousel.tsx` | Carrusel hero con slides automáticos, controles laterales e indicadores de posición. |
| `TrustBar` | `TrustBar.tsx` | Fila de 4 indicadores de confianza con íconos y descripciones. |
| `FilterSidebar` | `FilterSidebar.tsx` | Panel lateral con filtros por categoría, marca, presentación y rango de precios. |
| `ProductCard` | `ProductCard.tsx` | Tarjeta de producto con imagen, badges, hover effects y acciones (agregar/vista rápida). |
| `ProductImage` | `ProductImage.tsx` | Componente de imagen inteligente con sistema de fallback dinámico para productos sin foto. |
| `QuickView` | `QuickView.tsx` | Modal de vista rápida con detalle del producto, disponibilidad y botón de compra. |
| `CartDrawer` | `CartDrawer.tsx` | Drawer lateral del carrito con lista de ítems, control de cantidad, resumen y checkout. |
| `Pagination` | `Pagination.tsx` | Controles de paginación numérica para navegar el catálogo. |
| `PromoRow` | `PromoRow.tsx` | Fila de tarjetas promocionales con ofertas destacadas. |
| `RelatedCarousel` | `RelatedCarousel.tsx` | Carrusel de productos relacionados (se activa al filtrar por categoría). |
| `Breadcrumbs` | `Breadcrumbs.tsx` | Navegación contextual tipo breadcrumb. |
| `Footer` | `Footer.tsx` | Pie de página con contacto, categorías, newsletter, redes sociales y métodos de pago. |

---

## 📂 Estructura del Proyecto

```
marimar_wed/
├── public/
│   └── images/              # Imágenes del catálogo y assets estáticos
├── src/
│   ├── components/          # Componentes modulares de la interfaz
│   │   ├── ui/              # Componentes base de shadcn/ui (40+)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroCarousel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductImage.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── QuickView.tsx
│   │   ├── Pagination.tsx
│   │   ├── PromoRow.tsx
│   │   ├── RelatedCarousel.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── TrustBar.tsx
│   ├── data/
│   │   └── products.ts      # Catálogo completo (600+ productos)
│   ├── hooks/
│   │   ├── useCart.ts        # Hook del carrito (add, remove, update, totales)
│   │   └── use-mobile.ts    # Hook para detección responsive
│   ├── lib/
│   │   └── utils.ts         # Utilidades (formatPrice, scrollToCatalog, cn)
│   ├── types/
│   │   └── index.ts         # Tipos TypeScript (Product, CartItem, Promo, HeroSlide)
│   ├── App.tsx              # Componente raíz con lógica de filtrado y estado
│   ├── App.css              # Estilos específicos de la aplicación
│   ├── index.css            # Estilos globales y configuración de Tailwind
│   └── main.tsx             # Punto de entrada de React
├── index.html               # HTML base
├── tailwind.config.js       # Configuración de Tailwind CSS
├── vite.config.ts           # Configuración de Vite
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias y scripts
```

---

## 🚀 Instalación y Uso

### Requisitos Previos

- **Node.js** v20 o superior
- **npm** v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/marimar_wed.git
cd marimar_wed

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

> 🌐 La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera el bundle de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|:-----------|:--------|:----|
| ⚛️ **React** | 19.2 | Librería UI con hooks y componentes funcionales |
| 📘 **TypeScript** | 5.9 | Tipado estricto en toda la aplicación |
| ⚡ **Vite** | 7.2 | Bundler y servidor de desarrollo ultrarrápido |
| 🎨 **Tailwind CSS** | 3.4 | Framework de utilidades CSS con tema personalizado |
| 🧩 **shadcn/ui** | — | Librería de componentes accesibles basada en Radix UI |
| 🎭 **Lucide React** | 0.562 | Iconografía consistente y moderna |
| 📊 **Recharts** | 2.15 | Componentes de gráficos (para futuras analíticas) |
| ✅ **Zod** | 4.3 | Validación de esquemas y datos |
| 🔔 **Sonner** | 2.0 | Sistema de notificaciones toast |

---

## 📝 Notas Técnicas

- **Catálogo Gold Standard**: 75 productos con imágenes optimizadas y fotografía profesional.
- **Catálogo Extendido**: +560 productos importados desde archivo maestro TSV con estrategia de *fallback visual* dinámico (iniciales de marca + ícono) cuando no hay fotografía disponible.
- **Filtrado en Tiempo Real**: Todo el filtrado se ejecuta localmente con `useMemo` en `App.tsx`, combinando categoría, marca, presentación, rango de precio y búsqueda de texto sin pérdida de estado.
- **Estado del Carrito**: Gestionado mediante el custom hook `useCart`, que provee funciones de `addToCart`, `removeFromCart`, `updateQuantity` y cálculos derivados (`cartCount`, `cartTotal`).
- **Componentes UI**: La aplicación incluye **40+ componentes base** de shadcn/ui (Accordion, Dialog, Tabs, Tooltip, etc.) disponibles para extensión futura.
- **Diseño Responsivo**: Layout adaptativo para móvil, tablet y desktop con breakpoints `sm`, `md`, `lg`, `xl`.

---

<p align="center">
  Hecho con 🧡 para el mercado venezolano<br/>
  <strong>Marimar Milenium</strong> — Tu aliado en distribución mayorista
</p>
