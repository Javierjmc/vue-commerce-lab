# 📝 Cómo Agregar el Contenido de Word al Blog

## ✅ Lo que ya está hecho:
- ✅ Las imágenes JPG ya están importadas y funcionando
- ✅ Los artículos ya están configurados con títulos y metadatos
- ✅ La estructura está lista para recibir el contenido

## 📋 Pasos para agregar el contenido:

### Paso 1: Abre el archivo `src/lib/blogPosts.ts`

### Paso 2: Para cada artículo, encuentra su sección en `articleContent`

Cada artículo tiene una sección como esta:
```typescript
"smoothie-bowl-antioxidantes": `
## Introducción

[COPIA AQUÍ EL CONTENIDO...]
`,
```

### Paso 3: Abre el archivo Word correspondiente

Los archivos están en `src/assets/blog/`:
1. `Smoothie Bowl de Frutos Rojos_ El Ritual Antioxidante para tu Cerebro y Cuerpo.docx`
2. `5 Tés Herbales para Reducir el Estrés y Mejorar tu Sueño.docx`
3. `Mindfulness al Aire Libre_ Conecta con la Naturaleza.docx`
4. `Guía Completa de Suplementos Naturales_ Lo que Debes Saber.docx`
5. `Ensalada Proteica de Quinoa y Aguacate_ Nutrición Funcional de Grado Superior.docx`
6. `Hierbas Medicinales que Puedes Cultivar en Casa.docx`

### Paso 4: Copia y convierte el contenido

1. **Copia todo el texto** del Word
2. **Reemplaza** el texto `[COPIA AQUÍ EL CONTENIDO...]` con tu contenido
3. **Convierte el formato**:

#### Conversión de formato:

| En Word | En el código |
|---------|--------------|
| Título principal (grande) | `## Título` |
| Subtítulo | `### Subtítulo` |
| Lista con viñetas | `- Item de la lista` |
| Texto en negrita | `**texto en negrita**` |
| Párrafo normal | Texto normal (sin cambios) |

### Ejemplo de conversión:

**En Word:**
```
Introducción
Este es el primer párrafo.

Beneficios
- Primer beneficio
- Segundo beneficio

Conclusión
Este es el párrafo final.
```

**En el código:**
```typescript
"smoothie-bowl-antioxidantes": `
## Introducción

Este es el primer párrafo.

## Beneficios

- Primer beneficio
- Segundo beneficio

## Conclusión

Este es el párrafo final.
`,
```

## 🎯 Mapeo de archivos a IDs:

| Archivo Word | ID en el código |
|--------------|-----------------|
| Smoothie Bowl de Frutos Rojos... | `smoothie-bowl-antioxidantes` |
| 5 Tés Herbales... | `te-herbal-relajante` |
| Mindfulness al Aire Libre... | `meditacion-naturaleza` |
| Guía Completa de Suplementos... | `guia-suplementos-naturales` |
| Ensalada Proteica de Quinoa... | `ensalada-proteica-vegana` |
| Hierbas Medicinales... | `hierbas-medicinales-hogar` |

## 💡 Tips:

1. **Mantén el formato simple**: No necesitas HTML, solo markdown básico
2. **Espacios en blanco**: Deja una línea en blanco entre secciones
3. **Listas numeradas**: Si tienes listas numeradas, conviértelas a listas con viñetas `-`
4. **Imágenes dentro del texto**: Por ahora no se soportan, pero puedes mencionarlas
5. **Enlaces**: Si hay enlaces, mantenlos como texto por ahora

## ⚠️ Importante:

- **No borres** las comillas invertidas (`` ` ``) al inicio y final
- **No borres** el ID del artículo (ej: `"smoothie-bowl-antioxidantes"`)
- **Mantén** la indentación correcta (2 espacios)
- **Guarda** el archivo después de cada cambio

## 🚀 Una vez completado:

1. Guarda el archivo `src/lib/blogPosts.ts`
2. El blog debería mostrar automáticamente el contenido nuevo
3. Verifica en el navegador que todo se vea correctamente

## ❓ ¿Necesitas ayuda?

Si tienes problemas con el formato, puedes:
1. Copiar el texto tal cual del Word
2. Yo te ayudo a convertirlo al formato correcto
3. O puedes usar una herramienta online como [Word to Markdown Converter](https://word2md.com/)

