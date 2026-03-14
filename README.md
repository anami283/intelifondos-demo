# Intelifondos

**La inteligencia que su fondo necesitaba.**

Intelifondos es una plataforma SaaS diseñada para modernizar la gestión de crédito, cartera y nómina en fondos de empleados colombianos. Combina análisis financiero en tiempo real con inteligencia artificial para acelerar decisiones crediticias, reducir la mora y automatizar procesos operativos.

---

## Descripción del producto

La plataforma ofrece cuatro módulos principales:

- **Dashboard ejecutivo** — KPIs de cartera, gráficas de desembolsos vs recaudo y actividad en tiempo real
- **Gestión de solicitudes** — tabla con filtros, score IA por solicitud y flujo de aprobación con un clic
- **Score IA** — análisis de riesgo crediticio impulsado por Gemini: velocímetro de score, barras de factores y recomendación justificada
- **Cartera inteligente** — seguimiento de mora, ICV y alertas proactivas con reporte generado por IA
- **Nómina automatizada** — planilla mensual con exportación CSV e integración con RRHH
- **Asistente financiero IA** — chat en streaming con Gemini entrenado sobre los datos reales del fondo

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS + shadcn/ui |
| IA | Google Gemini 1.5 Flash (API) |
| Gráficas | Recharts |
| Animaciones | Framer Motion + CSS |
| Iconos | Lucide React |
| Deploy | Vercel (CI/CD automático desde GitHub) |

---

## Variables de entorno

El proyecto requiere una sola variable de entorno:

```env
GEMINI_API_KEY=<tu_clave_de_google_ai_studio>
```

**Importante:** Esta variable nunca debe tener el prefijo `NEXT_PUBLIC_`. Se usa exclusivamente en las rutas de servidor (`/api/ai/*`), nunca en el cliente.

Para obtener la clave: [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/<usuario>/intelifondos-demo.git
cd intelifondos-demo

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local y agregar tu GEMINI_API_KEY

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Flujo de ramas

```
main      → producción (auto-deploy Vercel)
develop   → preview (auto-deploy en URL preview Vercel)
```

**Convención de commits:**
```
feat: landing page hero section
feat: dashboard KPIs con animaciones
feat: score IA pantalla WOW
feat: chat Gemini integración real
fix: responsive mobile sidebar
```

Los merges a `main` se realizan mediante Pull Request una vez que cada sección está completa y validada. Vercel despliega automáticamente al detectar cambios en `main`.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                    ← Landing /
│   ├── demo/page.tsx               ← Selector de roles
│   ├── demo/dashboard/page.tsx     ← Dashboard ejecutivo
│   ├── demo/solicitudes/
│   │   ├── page.tsx                ← Tabla de solicitudes
│   │   └── [id]/page.tsx           ← Score IA (detalle)
│   ├── demo/cartera/page.tsx       ← Gestión de cartera
│   ├── demo/nomina/page.tsx        ← Planilla de nómina
│   ├── demo/ia/page.tsx            ← Chat Gemini
│   └── api/ai/
│       ├── chat/route.ts           ← Streaming Gemini
│       └── score/route.ts          ← Análisis de riesgo
├── components/
│   ├── layout/                     ← Sidebar, Header, DemoBanner
│   ├── dashboard/                  ← KPICard, CarteraChart, AlertasPanel
│   ├── solicitudes/                ← ScoreIA
│   └── ia/                         ← ChatGemini
├── data/
│   └── demo-data.ts                ← Datos hardcoded COFEM
└── lib/
    ├── gemini.ts                   ← Cliente Gemini
    └── utils.ts                    ← Utilidades
```

---

## Demo en producción

La demo pública muestra datos del fondo ficticio **COFEM** (Cooperativa de Empleados de Pereira, Colombia). Todos los datos son hardcoded con fines demostrativos. La única integración real es la API de Gemini para el score IA y el chat financiero.

---

## Equipo

Desarrollado por el equipo de producto de **Intelifondos** · Pereira, Colombia.
