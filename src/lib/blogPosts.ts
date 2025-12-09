import { BlogPost } from "@/components/blog/BlogCard";
import smoothieImg from "@/assets/productos/ALOE RAPID/1.png";
import teaImg from "@/assets/productos/ARTINAT 90 CAP/1.png";
import wellnessImg from "@/assets/productos/CURCUNAT 60 CAP/1.jpg";
import supplementsImg from "@/assets/productos/ANSIONAT/1.png";
import saladImg from "@/assets/productos/ASAWANDA/1.png";
import heroImg from "@/assets/productos/BEAUTYNAT/1.png";

export const blogPosts: BlogPost[] = [
  {
    id: "smoothie-bowl-antioxidantes",
    title: "Smoothie Bowl de Frutos Rojos: Antioxidantes para Empezar el Día",
    excerpt: "Descubre cómo preparar el smoothie bowl perfecto lleno de antioxidantes naturales que te darán energía durante toda la mañana.",
    image: smoothieImg,
    category: "recetas",
    author: "Dra. María González",
    date: "28 Nov 2024",
    readTime: "5 min lectura",
  },
  {
    id: "te-herbal-relajante",
    title: "5 Tés Herbales para Reducir el Estrés y Mejorar tu Sueño",
    excerpt: "Conoce las infusiones naturales más efectivas para calmar la ansiedad y conseguir un descanso reparador de forma natural.",
    image: teaImg,
    category: "salud",
    author: "Dr. Carlos Ruiz",
    date: "25 Nov 2024",
    readTime: "7 min lectura",
  },
  {
    id: "meditacion-naturaleza",
    title: "Mindfulness al Aire Libre: Conecta con la Naturaleza",
    excerpt: "Aprende técnicas de meditación y respiración que puedes practicar en espacios naturales para mejorar tu bienestar mental.",
    image: wellnessImg,
    category: "bienestar",
    author: "Ana Martínez",
    date: "22 Nov 2024",
    readTime: "6 min lectura",
  },
  {
    id: "guia-suplementos-naturales",
    title: "Guía Completa de Suplementos Naturales: Lo que Debes Saber",
    excerpt: "Todo lo que necesitas conocer sobre vitaminas, minerales y suplementos herbales para tomar decisiones informadas sobre tu salud.",
    image: supplementsImg,
    category: "salud",
    author: "Dra. María González",
    date: "18 Nov 2024",
    readTime: "10 min lectura",
  },
  {
    id: "ensalada-proteica-vegana",
    title: "Ensalada Proteica Vegana con Quinoa y Aguacate",
    excerpt: "Una receta deliciosa y nutritiva perfecta para mantener tus niveles de energía altos durante todo el día sin productos animales.",
    image: saladImg,
    category: "recetas",
    author: "Chef Nutricionista Laura",
    date: "15 Nov 2024",
    readTime: "4 min lectura",
  },
  {
    id: "hierbas-medicinales-hogar",
    title: "Hierbas Medicinales que Puedes Cultivar en Casa",
    excerpt: "Aprende a crear tu propio jardín de plantas medicinales y descubre sus propiedades curativas para el uso diario.",
    image: heroImg,
    category: "bienestar",
    author: "Dr. Carlos Ruiz",
    date: "10 Nov 2024",
    readTime: "8 min lectura",
  },
];
