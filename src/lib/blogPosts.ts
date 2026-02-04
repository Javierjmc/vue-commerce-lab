import { BlogPost } from "@/components/blog/BlogCard";

// Importar imágenes del blog desde la carpeta assets/blog
import tesHerbalesImg from "@/assets/blog/5 Tés Herbales para Reducir el Estrés y Mejorar tu Sueño.jpg";
import ensaladaQuinoaImg from "@/assets/blog/Ensalada Proteica de Quinoa y Aguacate_ Nutrición Funcional de Grado Superior.jpg";
import guiaSuplementosImg from "@/assets/blog/Guía Completa de Suplementos Naturales_ Lo que Debes Saber.jpg";
import hierbasMedicinalesImg from "@/assets/blog/Hierbas Medicinales que Puedes Cultivar en Casa.jpg";
import mindfulnessImg from "@/assets/blog/Mindfulness al Aire Libre_ Reconecta tu Mente en la Naturaleza..jpg";
import smoothieBowlImg from "@/assets/blog/Smoothie Bowl de Frutos Rojos_ El Ritual Antioxidante para tu Cerebro y Cuerpo.jpg";

export const blogPosts: BlogPost[] = [
  {
    id: "smoothie-bowl-antioxidantes",
    title: "Smoothie Bowl de Frutos Rojos: El Ritual Antioxidante para tu Cerebro y Cuerpo",
    excerpt: "Descubre cómo preparar el smoothie bowl perfecto lleno de antioxidantes naturales que nutren tu cerebro y te dan energía durante toda la mañana.",
    image: smoothieBowlImg,
    category: "recetas",
    author: "Dra. María González",
    date: "28 Nov 2024",
    readTime: "5 min lectura",
  },
  {
    id: "te-herbal-relajante",
    title: "5 Tés Herbales para Reducir el Estrés y Mejorar tu Sueño",
    excerpt: "Conoce las infusiones naturales más efectivas para calmar la ansiedad y conseguir un descanso reparador de forma natural.",
    image: tesHerbalesImg,
    category: "salud",
    author: "Dr. Carlos Ruiz",
    date: "25 Nov 2024",
    readTime: "7 min lectura",
  },
  {
    id: "meditacion-naturaleza",
    title: "Mindfulness al Aire Libre: Conecta con la Naturaleza",
    excerpt: "Aprende técnicas de meditación y respiración que puedes practicar en espacios naturales para mejorar tu bienestar mental y reconectar tu mente.",
    image: mindfulnessImg,
    category: "bienestar",
    author: "Ana Martínez",
    date: "22 Nov 2024",
    readTime: "6 min lectura",
  },
  {
    id: "guia-suplementos-naturales",
    title: "Guía Completa de Suplementos Naturales: Lo que Debes Saber",
    excerpt: "Todo lo que necesitas conocer sobre vitaminas, minerales y suplementos herbales para tomar decisiones informadas sobre tu salud.",
    image: guiaSuplementosImg,
    category: "salud",
    author: "Dra. María González",
    date: "18 Nov 2024",
    readTime: "10 min lectura",
  },
  {
    id: "ensalada-proteica-vegana",
    title: "Ensalada Proteica de Quinoa y Aguacate: Nutrición Funcional de Grado Superior",
    excerpt: "Una receta deliciosa y nutritiva perfecta para mantener tus niveles de energía altos durante todo el día con ingredientes de calidad superior.",
    image: ensaladaQuinoaImg,
    category: "recetas",
    author: "Chef Nutricionista Laura",
    date: "15 Nov 2024",
    readTime: "4 min lectura",
  },
  {
    id: "hierbas-medicinales-hogar",
    title: "Hierbas Medicinales que Puedes Cultivar en Casa",
    excerpt: "Aprende a crear tu propio jardín de plantas medicinales y descubre sus propiedades curativas para el uso diario.",
    image: hierbasMedicinalesImg,
    category: "bienestar",
    author: "Dr. Carlos Ruiz",
    date: "10 Nov 2024",
    readTime: "8 min lectura",
  },
];

// Contenido de los artículos
// INSTRUCCIONES: Copia el contenido de tus archivos .docx aquí
// 1. Abre cada archivo .docx en Word
// 2. Copia todo el texto
// 3. Pégalo aquí y conviértelo al formato markdown:
//    - Títulos principales → ## Título
//    - Subtítulos → ### Subtítulo
//    - Listas → - Item
//    - Negrita → **texto**
//    - Párrafos normales → texto normal

const articleContent: Record<string, string> = {
  // ============================================
  // ARTÍCULO 1: Smoothie Bowl
  // ============================================
  "smoothie-bowl-antioxidantes": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: Smoothie Bowl de Frutos Rojos_ El Ritual Antioxidante para tu Cerebro y Cuerpo.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,

  // ============================================
  // ARTÍCULO 2: Tés Herbales
  // ============================================
  "te-herbal-relajante": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: 5 Tés Herbales para Reducir el Estrés y Mejorar tu Sueño.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,

  // ============================================
  // ARTÍCULO 3: Mindfulness
  // ============================================
  "meditacion-naturaleza": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: Mindfulness al Aire Libre_ Conecta con la Naturaleza.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,

  // ============================================
  // ARTÍCULO 4: Guía Suplementos
  // ============================================
  "guia-suplementos-naturales": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: Guía Completa de Suplementos Naturales_ Lo que Debes Saber.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,

  // ============================================
  // ARTÍCULO 5: Ensalada Quinoa
  // ============================================
  "ensalada-proteica-vegana": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: Ensalada Proteica de Quinoa y Aguacate_ Nutrición Funcional de Grado Superior.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,

  // ============================================
  // ARTÍCULO 6: Hierbas Medicinales
  // ============================================
  "hierbas-medicinales-hogar": `
## Introducción

[COPIA AQUÍ EL CONTENIDO DEL ARCHIVO: Hierbas Medicinales que Puedes Cultivar en Casa.docx]

Abre el archivo Word y copia todo el contenido aquí. Convierte:
- Los títulos principales a: ## Título
- Los subtítulos a: ### Subtítulo
- Las listas a: - Item
- El texto en negrita a: **texto**
  `,
};

// Función helper para obtener el contenido de un artículo
export function getBlogContent(postId: string): string {
  return articleContent[postId] || `
## Artículo en preparación

Este artículo está siendo actualizado. Vuelve pronto para leer el contenido completo.
  `;
}
