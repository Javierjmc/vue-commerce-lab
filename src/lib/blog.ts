import curcunat1 from "../assets/productos/CURCUNAT 60 CAP/1.jpg";
import ansionat1 from "../assets/productos/ANSIONAT/1.png";
import magnat1 from "../assets/productos/MAGNAT/1.jpg";
import melatonat1 from "../assets/productos/MELATONAT/1.png";
import ashwagandha1 from "../assets/productos/ASAWANDA/1.png";
import probionat1 from "../assets/productos/PROBIONAT/1.png";
import digesnat1 from "../assets/productos/DIGESNAT/1.jpg";

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  summary: string;
  content: string[]; // Array of strings for paragraphs
}

export const blogPosts: BlogPost[] = [
  {
    id: "beneficios-curcuma",
    title: "Los Increíbles Beneficios de la Cúrcuma para tu Salud",
    author: "Laura Martínez",
    date: "15 de Noviembre, 2025",
    imageUrl: curcunat1,
    summary: "Descubre cómo esta especia dorada puede transformar tu bienestar y proteger tu cuerpo de diversas enfermedades.",
    content: [
      "La cúrcuma, conocida como la 'especia dorada', ha sido utilizada durante siglos en la medicina ayurvédica y la medicina tradicional china por sus potentes propiedades medicinales. Su componente activo principal, la curcumina, es un poderoso antioxidante y antiinflamatorio. Para aprovechar al máximo sus propiedades, te recomendamos nuestro producto **CURCUNAT 60CAP**.",
      "Entre sus múltiples beneficios, la cúrcuma ayuda a mejorar la función cerebral, reduce el riesgo de enfermedades cardíacas, combate la inflamación crónica y puede tener efectos protectores contra ciertos tipos de cáncer. Es un excelente suplemento natural para mantener un estilo de vida saludable.",
      "Puedes incorporar la cúrcuma en tu dieta diaria a través de tés, batidos, curries o suplementos como el **CURCUNAT**. ¡Aprovecha el poder de la naturaleza!",
    ],
  },
  {
    id: "gestion-estres-plantas",
    title: "Plantas Medicinales para el Manejo del Estrés y la Ansiedad",
    author: "Sandra Gómez",
    date: "22 de Noviembre, 2025",
    imageUrl: ansionat1,
    summary: "Explora cómo la naturaleza nos ofrece soluciones efectivas para calmar la mente y reducir los niveles de estrés en tu día a día.",
    content: [
      "En el ritmo acelerado de la vida moderna, el estrés y la ansiedad se han convertido en problemas comunes. Afortunadamente, la naturaleza nos proporciona una variedad de plantas medicinales que pueden ayudar a mitigar estos síntomas sin los efectos secundarios de los fármacos convencionales.",
      "Hierbas como la valeriana, la manzanilla, la pasiflora y la lavanda son conocidas por sus propiedades sedantes y ansiolíticas. Nuestros productos como **ANSIONAT**, **MAGNAT (Magnesio)**, **MELATONAT** y **ASHWAGANDHA KSM-66** están formulados con ingredientes naturales para promover la relajación y mejorar la calidad del sueño.",
      "Integrar estos productos en tu rutina, ya sea en infusiones, aceites esenciales o suplementos, puede ser un paso significativo hacia una mayor tranquilidad y bienestar emocional. Consulta siempre a un especialista antes de iniciar cualquier tratamiento.",
    ],
  },
  {
    id: "alimentacion-saludable-intestino",
    title: "La Importancia de una Alimentación Saludable para un Intestino Feliz",
    author: "Laura Martínez",
    date: "29 de Noviembre, 2025",
    imageUrl: probionat1,
    summary: "Descubre el vínculo entre tu dieta y la salud intestinal, y cómo un intestino equilibrado impacta en todo tu organismo.",
    content: [
      "El intestino es a menudo considerado nuestro 'segundo cerebro' debido a su compleja red neuronal y su profunda influencia en nuestra salud general, incluyendo el sistema inmunitario, el estado de ánimo y la digestión. Una microbiota intestinal equilibrada es clave para un bienestar óptimo. Nuestros productos como **PROBIONAT** y **DIGESNAT** pueden ofrecer un soporte fundamental para tu salud intestinal.",
      "Una dieta rica en fibra, prebióticos y probióticos es esencial para nutrir las bacterias beneficiosas de nuestro intestino. Alimentos fermentados como el yogur, el kéfir y el chucrut, así como frutas, verduras y cereales integrales, son fundamentales.",
      "Evitar los alimentos procesados, azúcares refinados y grasas trans es crucial para prevenir la disbiosis intestinal, que puede conducir a problemas digestivos, inflamación y otras afecciones de salud. Cuida tu intestino y él cuidará de ti. Considera complementar tu dieta con **PROBIONAT** para mantener un equilibrio saludable.",
    ],
  },
];
