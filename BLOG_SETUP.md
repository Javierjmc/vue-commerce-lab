# Guía para Agregar Contenido al Blog

## Estructura de Carpetas

1. **Imágenes**: Coloca todas las imágenes JPG en `src/assets/blog/`
   - Nombra las imágenes de forma descriptiva, por ejemplo:
     - `articulo-1.jpg`
     - `articulo-2.jpg`
     - `smoothie-bowl.jpg`
     - etc.

2. **Contenido**: Los textos se agregan en `src/lib/blogPosts.ts`

## Pasos para Agregar un Nuevo Artículo

### Paso 1: Agregar la Imagen
1. Coloca tu imagen JPG en `src/assets/blog/`
2. Por ejemplo: `src/assets/blog/mi-articulo.jpg`

### Paso 2: Importar la Imagen en blogPosts.ts
```typescript
import miArticuloImg from "@/assets/blog/mi-articulo.jpg";
```

### Paso 3: Agregar el Artículo al Array
En `src/lib/blogPosts.ts`, agrega un nuevo objeto al array `blogPosts`:

```typescript
{
  id: "mi-articulo-unico", // ID único, sin espacios, usar guiones
  title: "Título de tu Artículo",
  excerpt: "Resumen corto del artículo que aparecerá en la lista",
  image: miArticuloImg, // La imagen importada
  category: "salud", // "recetas" | "salud" | "bienestar"
  author: "Nombre del Autor",
  date: "15 Dic 2024", // Formato: "DD MMM YYYY"
  readTime: "5 min lectura", // Tiempo estimado de lectura
}
```

### Paso 4: Agregar el Contenido Completo
En `src/lib/blogPosts.ts`, actualiza la función `getBlogContent` para incluir el contenido de tu artículo:

```typescript
export function getBlogContent(postId: string): string {
  const content: Record<string, string> = {
    "mi-articulo-unico": `
## Introducción

Tu contenido aquí...

## Sección 1

Más contenido...

### Subsección

- Lista de puntos
- Otro punto

## Conclusión

Final del artículo...
    `,
  };

  return content[postId] || content["default"];
}
```

## Formato del Contenido

El contenido usa un formato markdown simplificado:

- `## Título Principal` - Para secciones principales
- `### Subtítulo` - Para subsecciones
- `- Punto` - Para listas
- `**Texto en negrita**` - Para texto destacado
- Texto normal - Para párrafos

## Ejemplo Completo

```typescript
// 1. Importar imagen
import miArticuloImg from "@/assets/blog/mi-articulo.jpg";

// 2. Agregar al array blogPosts
{
  id: "beneficios-aloe-vera",
  title: "Los Increíbles Beneficios del Aloe Vera",
  excerpt: "Descubre cómo el aloe vera puede mejorar tu salud y bienestar de forma natural.",
  image: miArticuloImg,
  category: "salud",
  author: "Dra. María González",
  date: "20 Dic 2024",
  readTime: "8 min lectura",
}

// 3. Agregar contenido en getBlogContent
"beneficios-aloe-vera": `
## Introducción

El aloe vera es una planta milenaria con propiedades increíbles...

## Propiedades Curativas

- Antiinflamatorio natural
- Hidratante profundo
- Regenerador celular

## Cómo Usarlo

### Uso Tópico
Aplicar directamente sobre la piel...

### Uso Interno
Beber jugo de aloe vera...

## Conclusión

El aloe vera es un aliado natural para tu salud...
`
```

## Notas Importantes

1. **IDs únicos**: Cada artículo debe tener un ID único que coincida en `blogPosts` y en `getBlogContent`
2. **Imágenes**: Usa formato JPG o PNG, optimiza las imágenes antes de agregarlas
3. **Fechas**: Mantén el formato consistente "DD MMM YYYY" (ej: "15 Dic 2024")
4. **Categorías**: Solo usa "recetas", "salud" o "bienestar"

## Conversión de Word a Markdown

Si tienes textos en Word:
1. Copia el texto del Word
2. Convierte los títulos a `## Título` o `### Subtítulo`
3. Convierte las listas a formato `- Item`
4. Mantén los párrafos como texto normal
5. Agrega `**negrita**` donde sea necesario

## Herramientas Útiles

- Para convertir Word a Markdown: [Pandoc](https://pandoc.org/) o editores online
- Para optimizar imágenes: [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)

