import { ChatOption, ChatFlowState } from './ChatbotTypes';
import { getUniqueProductCategories, getProductsByCategory } from '../../lib/productos';

export const greetingMessage = "¡Hola! Soy Clara, tu asistente de Bienestar Natural de Vitásfera. ¿Cómo puedo ayudarte hoy?";

export const mainMenuMessage = "Para tu comodidad, hemos ideado estas opciones con nuestras principales áreas de atención. Por favor, elige una de las siguientes opciones para que te guíe en tu Bienestar Natural:";

export const mainMenuOptions: ChatOption[] = [
  { id: 'product', icon: '🌿', label: 'Producto', action: 'product-flow' },
  { id: 'consultation', icon: '🧑‍⚕️', label: 'Consultoría de Bienestar', action: 'consultation-start' },
  { id: 'logistics', icon: '🚚', label: 'Pedido / Tienda', action: 'logistics-menu' },
  { id: 'returns', icon: '🔄', label: 'Devoluciones', action: 'returns' },
  { id: 'payment', icon: '💳', label: 'Formas de Pago', action: 'payment' },
  { id: 'location', icon: '📍', label: 'Ubicación', action: 'location' },
];

export const logisticsMenuMessage = "¡Perfecto! ¿Sobre qué necesitas ayuda específica? Elige una opción para que te demos una respuesta inmediata:";

export const logisticsMenuOptions: ChatOption[] = [
  { id: 'tracking', icon: '📦', label: 'Estado de mi Pedido', action: 'tracking' },
  { id: 'shipping', icon: '⏱️', label: 'Tiempo y Costo de Envío', action: 'shipping' },
  { id: 'promotions', icon: '🏷️', label: 'Promociones o Descuentos', action: 'promotions' },
  { id: 'advisor', icon: '🧑‍💻', label: 'Hablar con un Asesor', action: 'advisor' },
  { id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' },
];

export const productFlowMessage = "¡Claro que sí! En Vitásfera queremos guiarte a tu Bienestar Natural. ¿Qué área de tu salud buscas mejorar? Te ayudo a elegir el mejor suplemento:";

export const productOptions: ChatOption[] = getUniqueProductCategories().map(category => ({
  id: category.toLowerCase().replace(/ /g, '-'),
  icon: '🌱',
  label: category,
  action: `show-products-${category.toLowerCase().replace(/ /g, '-')}`,
}));
productOptions.push({ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' });

export const consultationQuestions: Record<string, { message: string; options: ChatOption[] }> = {
  'consultation-start': {
    message: '👉 Entendido. Para darte la mejor asesoría... ❓ ¿Estás tomando algún medicamento recetado o sufres alguna condición de salud crónica?',
    options: [
      { id: 'yes', icon: '✅', label: 'Sí', action: 'consultation-pregnant' },
      { id: 'no', icon: '❌', label: 'No', action: 'consultation-pregnant' },
    ],
  },
  'consultation-pregnant': {
    message: '❓ ¿Estás embarazada o en periodo de lactancia?',
    options: [
      { id: 'yes', icon: '✅', label: 'Sí', action: 'consultation-allergies' },
      { id: 'no', icon: '❌', label: 'No', action: 'consultation-allergies' },
      { id: 'na', icon: '➖', label: 'No aplica', action: 'consultation-allergies' },
    ],
  },
  'consultation-allergies': {
    message: '❓ ¿Tienes alguna alergia conocida a plantas, frutos secos o cualquier ingrediente de suplementos?',
    options: [
      { id: 'yes', icon: '✅', label: 'Sí', action: 'consultation-goal' },
      { id: 'no', icon: '❌', label: 'No', action: 'consultation-goal' },
    ],
  },
  'consultation-goal': {
    message: '❓ ¿Cuál es tu objetivo principal?',
    options: [
      { id: 'sleep', icon: '😴', label: 'Dormir mejor', action: 'consultation-expert' },
      { id: 'weight', icon: '⚖️', label: 'Perder peso', action: 'consultation-expert' },
      { id: 'joints', icon: '🦴', label: 'Mejorar articulaciones', action: 'consultation-expert' },
      { id: 'energy', icon: '⚡', label: 'Más energía', action: 'consultation-expert' },
      { id: 'immunity', icon: '🛡️', label: 'Reforzar defensas', action: 'consultation-expert' },
      { id: 'other', icon: '📝', label: 'Otro objetivo', action: 'consultation-expert' },
    ],
  },
  'consultation-expert': {
    message: '❓ Con base en esta información, ¿te gustaría que te pase directamente con uno de nuestros expertos para una asesoría personalizada?',
    options: [
      { id: 'yes', icon: '✅', label: 'Sí, quiero hablar con un experto', action: 'advisor' },
      { id: 'no', icon: '❌', label: 'No, gracias', action: 'main-menu' },
    ],
  },
};

export const staticResponses: Record<string, string> = {
  'location': '👉 ¡Estamos encantados de recibirte! Nuestra tienda física de Vitásfera se encuentra en nuestra dirección principal. Puedes encontrarnos fácilmente buscando "Vitásfera" en Google Maps. ¡Te esperamos!',
  'returns': '🔄 **Política de Devoluciones de Vitásfera:**\n\nTienes 14 días desde la recepción para devolver productos sin abrir y en perfecto estado. Para iniciar una devolución, contacta con nuestro equipo de atención al cliente y te guiaremos en el proceso. Los gastos de envío de devolución corren por cuenta del cliente, salvo productos defectuosos.',
  'payment': '💳 **Formas de Pago Disponibles:**\n\n• Tarjeta de crédito/débito (Visa, Mastercard)\n• PayPal\n• Bizum\n• Transferencia bancaria\n• Contrareembolso (cargo adicional)\n\nTodas las transacciones son 100% seguras.',
  'tracking': '📦 Para conocer el estado de tu pedido, necesitamos tu número de pedido o email de compra. Por favor, escríbenos por WhatsApp o email con estos datos y te informamos al momento.',
  'shipping': '⏱️ **Tiempos y Costos de Envío:**\n\n• Península: 24-48 horas laborables\n• Baleares: 3-5 días laborables\n• Canarias: 5-7 días laborables\n\n✨ **¡Envío GRATIS en Península a partir de 20€!**\n\nSi pides antes de las 16:00, tu pedido sale ese mismo día.',
  'promotions': '🏷️ **¡Sí! Tenemos ofertas activas para tu Bienestar Natural.**\n\nActualmente puedes encontrar:\n• Descuentos en packs de suplementos\n• Ofertas especiales en productos Naturdix\n• Promociones de temporada\n\nVisita nuestra web para ver todas las ofertas vigentes o pregúntame por un producto específico.',
  'advisor': '🧑‍💻 **Conectando con un Asesor**\n\nNuestro equipo de expertos en Bienestar Natural está disponible para ayudarte de forma personalizada.\n\n📱 WhatsApp: Envíanos un mensaje y te atenderemos lo antes posible.\n📧 Email: info@vitasfera.com\n\n¡Estaremos encantados de guiarte en tu camino hacia el bienestar!',
  'product-detail': '¡Excelente elección! En Vitásfera tenemos productos naturales de alta calidad para esa necesidad. Te recomiendo visitar nuestra tienda online para ver todas las opciones disponibles, o si prefieres una recomendación más personalizada, puedo conectarte con uno de nuestros expertos.',
};

export function getFlowData(state: ChatFlowState): { message: string; options?: ChatOption[] } {
  switch (state) {
    case 'greeting':
      return { message: greetingMessage };
    case 'main-menu':
      return { message: mainMenuMessage, options: mainMenuOptions };
    case 'logistics-menu':
      return { message: logisticsMenuMessage, options: logisticsMenuOptions };
    case 'product-flow':
      return { message: productFlowMessage, options: productOptions };
    case 'consultation-start':
    case 'consultation-pregnant':
    case 'consultation-allergies':
    case 'consultation-goal':
    case 'consultation-expert':
      return consultationQuestions[state];
    case 'location':
      return { message: staticResponses['location'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    case 'returns':
      return { message: staticResponses['returns'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    case 'payment':
      return { message: staticResponses['payment'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    case 'tracking':
      return { message: staticResponses['tracking'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    case 'shipping':
      return { message: staticResponses['shipping'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    case 'promotions':
      return { message: staticResponses['promotions'], options: [{ id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' }] };
    default:
      if (state.startsWith('show-products-')) {
        const category = state.replace('show-products-', '').replace(/-/g, ' ').toUpperCase();
        const products = getProductsByCategory(category);
        let productsMessage = `Aquí tienes algunos productos en nuestra categoría de ${category.charAt(0).toUpperCase() + category.slice(1)}:\n\n`;
        products.forEach(product => {
          productsMessage += `**${product.titulo}**\n`;
          if (product.imagenes && product.imagenes.length > 0) {
            productsMessage += `<img src="${product.imagenes[0]}" alt="${product.titulo}" width="100"/><br/>\n`;
          }
          productsMessage += `*${product.subtitulo}*\n`;
          productsMessage += `*${product.subtituloComplemento}*\n`;
          productsMessage += `${product.textoDePresentacionCta}\n\n`;
        });
        return { message: productsMessage, options: [{ id: 'back', icon: '↩️', label: 'Volver a Categorías', action: 'product-flow' }] };
      }
      return { message: mainMenuMessage, options: mainMenuOptions };
  }
}
