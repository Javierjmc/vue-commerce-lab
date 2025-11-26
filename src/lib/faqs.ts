export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  faqs: FAQItem[];
}

export const FAQ_DATA: FAQCategory[] = [
  {
    title: "Preguntas sobre Productos y Recomendaciones",
    faqs: [
      {
        question: "¿Qué suplemento me recomiendas para…?",
        answer: "Puedo ayudarte a elegir el mejor suplemento. ¿Qué quieres mejorar? Energía y vitalidad, Estrés, ansiedad o sueño, Sistema inmune, Digestión, Pérdida de peso, Dolor articular. Elige una opción y te guío.",
      },
      {
        question: "¿Qué diferencia hay entre magnesio bisglicinato y citrato?",
        answer: "El bisglicinato es ideal para estrés, sueño y músculos. El citrato ayuda más al tránsito intestinal. Si quieres, te digo cuál te conviene según tus síntomas.",
      },
      {
        question: "¿Tenéis productos naturales para reforzar defensas?",
        answer: "Sí, trabajamos con equinácea, propóleo, vitamina C, hongos medicinales y fórmulas completas. ¿Para ti o para un niño?",
      },
      {
        question: "¿Qué puedo tomar para perder peso de forma natural?",
        answer: "Las opciones más efectivas son: berberina, cromo, drenantes naturales y proteínas saciantes. Dime tu objetivo y te recomiendo algo específico.",
      },
    ],
  },
  {
    title: "Preguntas de Cosmética Natural",
    faqs: [
      {
        question: "¿Qué crema me recomendáis si tengo piel sensible?",
        answer: "Las mejores opciones son cremas sin perfumes, con caléndula, aloe o rosa mosqueta. ¿Quieres tratamiento facial o corporal?",
      },
      {
        question: "¿Tenéis champús sin sulfatos?",
        answer: "Sí, contamos con varias marcas naturales aptas para cuero cabelludo sensible. ¿Buscas para caspa, caída, grasa o uso diario?",
      },
    ],
  },
  {
    title: "Alimentación Saludable",
    faqs: [
      {
        question: "¿Qué puedo desayunar si quiero algo sano?",
        answer: "Tenemos granolas sin azúcar, cremas de frutos secos, bebidas vegetales, y opciones proteicas. ¿Prefieres dulce o salado?",
      },
      {
        question: "¿Tenéis productos sin gluten?",
        answer: "Sí, disponemos de panes, harinas, galletas y snacks 100% sin gluten. ¿Qué tipo estás buscando?",
      },
    ],
  },
  {
    title: "Consultas de Salud Natural",
    faqs: [
      {
        question: "Tengo digestiones pesadas, ¿qué me recomendáis?",
        answer: "Para digestión lenta van muy bien el jengibre, enzimas digestivas y probióticos. Si me dices tus síntomas te hago una recomendación más personalizada.",
      },
      {
        question: "Duermo mal, ¿qué puedo tomar?",
        answer: "Las opciones más efectivas son melatonina, pasiflora, magnesio y fórmulas relajantes. ¿Tienes dificultad para dormir o te despiertas a mitad de la noche?",
      },
      {
        question: "Estoy muy estresado/a, ¿algo para calmarme?",
        answer: "Puedes probar ashwagandha, rhodiola o magnesio bisglicinato. ¿Tu estrés es más mental (rumiación) o físico (agotamiento)?",
      },
    ],
  },
  {
    title: "Preguntas sobre Envíos y Tienda",
    faqs: [
      {
        question: "¿Cuánto tarda el envío?",
        answer: "24–48 horas en Península. Pedidos antes de las 16:00 salen el mismo día.",
      },
      {
        question: "¿Puedo recoger mi pedido en tienda?",
        answer: "Sí, puedes recogerlo en nuestra tienda de Vitasfera sin coste.",
      },
      {
        question: "¿Tenéis promociones o descuentos?",
        answer: "Sí, te puedo mostrar las ofertas activas. ¿Quieres ver suplementos, cosmética o alimentación?",
      },
    ],
  },
  {
    title: "Funciones Estratégicas para Aumentar Ventas",
    faqs: [
      {
        question: "¿Qué va bien con la vitamina C?",
        answer: "La vitamina D3 + K2 y el zinc potencian su efecto.",
      },
      {
        question: "Quiero algo para articulaciones",
        answer: "Genial, tenemos colágeno, cúrcuma y magnesio que funcionan muy bien juntos.",
      },
    ],
  },
  {
    title: "Mamás, Niños y Familia",
    faqs: [
      {
        question: "¿Qué puedo darle a mi hijo para defensas?",
        answer: "Para niños funcionan muy bien el propóleo infantil, equinácea suave y jarabes naturales. ¿Qué edad tiene?",
      },
    ],
  },
  {
    title: "Captación de Contacto",
    faqs: [
      {
        question: "Quiero una recomendación personalizada",
        answer: "Para darte una recomendación realmente precisa, necesito algunos detalles sobre tu situación. Si me facilitas tu nombre y tu email o teléfono, un especialista podrá contactarte por privado para hacerte las preguntas necesarias y ofrecerte la mejor solución.",
      },
    ],
  },
];
