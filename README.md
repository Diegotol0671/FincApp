# Mi Finca — solo React (sin backend)

Una sola app de React con TypeScript. Sin Express, sin servidor propio:
los datos se guardan en el navegador con `localStorage`, igual que en el
prototipo original.

```
mi-finca-react/
├── src/
│   ├── features/            una carpeta por sección de la app
│   │   ├── panel/            PanelPage.tsx
│   │   ├── ganado/            GanadoPage.tsx + ganado.storage.ts
│   │   ├── sanidad/           SanidadPage.tsx + sanidad.storage.ts
│   │   ├── potreros/          PotrerosPage.tsx + potreros.storage.ts
│   │   └── finanzas/          FinanzasPage.tsx + finanzas.storage.ts
│   ├── components/           piezas reutilizables (NavBar, etc.)
│   ├── router/                rutas de la aplicación (AppRouter.tsx)
│   ├── services/storage.ts    helpers genéricos para leer/escribir en localStorage
│   ├── types/index.ts         Animal, EventoSanidad, Potrero, Movimiento
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Por qué cada `*.storage.ts` en vez de `*.api.ts`

Antes esos archivos llamaban a una API con `fetch`. Sin backend, cada uno
se encarga de leer y escribir directamente en `localStorage` (por ejemplo
bajo la clave `mi-finca:ganado`). La página (`*Page.tsx`) no necesita
saber si los datos vienen de `localStorage` o de una API — eso es justo
la ventaja de mantenerlos en archivos separados: si más adelante agregas
un backend, solo cambias el contenido de estos archivos.

`src/services/storage.ts` es un buen lugar para un helper genérico, algo
como:

```ts
export function cargar<T>(clave: string, porDefecto: T): T { ... }
export function guardar<T>(clave: string, valor: T): void { ... }
```

y cada `*.storage.ts` lo usa con su propia clave y su propio tipo.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`).

## Orden sugerido para programar

1. `src/types/index.ts` — define Animal, EventoSanidad, Potrero, Movimiento.
2. `src/services/storage.ts` — helpers genéricos de localStorage.
3. `src/features/ganado/ganado.storage.ts` — usa esos helpers para leer/guardar animales.
4. `src/features/ganado/GanadoPage.tsx` — la vista, usando `ganado.storage.ts`.
5. Repite 3 y 4 para `sanidad`, `potreros`, `finanzas` y `panel`.
6. `src/router/AppRouter.tsx`, `components/NavBar.tsx`, `App.tsx`, `main.tsx` — arman la navegación general.

## Si más adelante quieres agregar un backend

Nada se pierde: vuelves a crear una carpeta `backend/` aparte (API en
Express, o lo que prefieras) y solo reescribes el contenido de los
`*.storage.ts` del frontend para que hagan `fetch` en vez de usar
`localStorage`. La estructura de `features/` no cambia.
