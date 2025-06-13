# 🐾 SmartPets - Landing Page

Una elegante landing page para SmartPets, un collar GPS inteligente para mascotas que incluye códigos QR para información de contacto rápida.

## ✨ Características

- **🎨 Diseño Moderno**: Interfaz elegante con gradientes y efectos de vidrio esmerilado
- **📍 Mapa Interactivo**: Visualización de ubicación en tiempo real usando Leaflet
- **📱 Código QR Dinámico**: Generación de QR con información de la mascota y dueño
- **📋 Información Detallada**: Componente interactivo para mostrar datos al escanear QR
- **🚀 Características del Producto**: Grid animado con las ventajas de SmartPets
- **💰 Call-to-Action**: Sección de precios y suscripción por email
- **📱 Responsive**: Diseño adaptable para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Next.js 15.3.3** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React Leaflet** - Mapas interactivos
- **QRCode.react** - Generación de códigos QR
- **CSS Modules** - Estilos encapsulados
- **Bun** - Runtime y gestor de paquetes

## 🚀 Instalación y Uso

1. **Instalar dependencias:**

   ```bash
   bun install
   ```

2. **Ejecutar en desarrollo:**

   ```bash
   bun run dev
   ```

3. **Construir para producción:**

   ```bash
   bun run build
   ```

4. **Ejecutar en producción:**
   ```bash
   bun run start
   ```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── CTA.tsx           # Call-to-action con pricing
│   ├── Features.tsx      # Grid de características
│   ├── Map.tsx          # Mapa interactivo
│   └── PetInfo.tsx      # Información de mascota/dueño
├── landing-page.tsx     # Página principal
├── landing.module.css   # Estilos principales
└── page.tsx            # Página de entrada
```

## 🎨 Paleta de Colores

- **Primario**: `#1ecbe1` (Azul turquesa)
- **Secundario**: `#16a085` (Verde turquesa)
- **Fondo**: Gradiente de negro a turquesa
- **Texto**: Blanco y grises

## 📱 Características Responsive

- **Desktop**: Layout en grid con sidebar para QR
- **Tablet**: Diseño adaptado con elementos apilados
- **Mobile**: Vista de columna única optimizada

## 🔧 Configuración

### Variables de Entorno (Opcional)

Puedes agregar variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_MAPS_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_ANALYTICS_ID=tu_analytics_id
```

### Personalización

- **Logo**: Reemplaza `/public/smartpets-logo.svg` con tu logo
- **Colores**: Modifica las variables CSS en los archivos `.module.css`
- **Contenido**: Actualiza los datos en `landing-page.tsx`

## 🚀 Deployment

### Vercel (Recomendado)

```bash
vercel --prod
```

### Netlify

```bash
netlify deploy --prod --dir=out
```

## 📄 Licencia

Este proyecto es parte de SmartPets © 2025. Todos los derechos reservados.

---

Desarrollado con ❤️ para mantener a nuestras mascotas seguras.
