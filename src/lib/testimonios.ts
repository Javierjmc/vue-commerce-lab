/**
 * 1. Definición de la Interfaz (Type) simplificada
 */
export interface Testimonio {
    autor: string;
    tipoAutor: 'Local Guide' | null;
    fecha: string;
    calificacion: 1 | 5; // Calificación asumida: 1 (baja) o 5 (alta)
    texto: string;
    imagenAutor: string | null; // URL de la imagen (string) o null
  }
  
  /**
   * 2. Array de Testimonios Completo y simplificado (TypeScript)
   */
  export const testimoniosVitasfera: Testimonio[] = [
    {
      autor: "Yolanda Plaza",
      tipoAutor: "Local Guide",
      fecha: "Hace 7 meses",
      calificacion: 5,
      texto: "El trato siempre es muy bueno, se nota que tienen conocimiento sobre los productos que venden y sobre sus efectos en la salud, siempre te atienden con una sonrisa y son muy amables. Tuve que descambiar un producto y no me pusieron ningún problema, es más me asesoraron más sobre los otros productos. Tiene alimentación ecológica, miel, tes, huevos... Pocos herbolarios cuenta con tanta variedad lo cual se agradece, así como el asesoramiento y el trato. Y dispone de grandes marcas de vitaminas.",
      imagenAutor: "https://lh3.googleusercontent.com/a/ACg8ocIvLIGwas8rlpAjAjDyDsNtiPjip44G7FrwFI8R5Fbu2S7TDQ=w72-h72-p-rp-mo-ba5-br100",
    },
    {
      autor: "ALCALA DE HENARES NOMASVELLO DEPILACIÓN",
      tipoAutor: null,
      fecha: "Hace 5 meses",
      calificacion: 5,
      texto: "Encantada siempre de la atención y consejos recibidos y de poder aclarar cualquier duda. Siempre con gran variedad de productos. Muy buen trato y cercanía.",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br100",
    },
    {
      autor: "Paula Torre",
      tipoAutor: null,
      fecha: "Hace 5 meses",
      calificacion: 5,
      texto: "Dos hermanas suuuuper simpáticas. Nos han atendido super bien siempre que hemos ido y realmente saben aconsejar. Muchas gracias. Se ha convertido en nuestro herbolario de confianza :)",
      imagenAutor: "https://lh3.googleusercontent.com/a/ACg8ocJxP4cUJumBlrg4E20Tfh-ez3Y7rGBo8TwCo305OXcg5P_eXg=w72-h72-p-rp-mo-br100",
    },
    {
      autor: "Roberto Juárez",
      tipoAutor: "Local Guide",
      fecha: "3 semanas atrás",
      calificacion: 5,
      texto: "Tiene productos variados. La atención es buenísima y muy profesional.",
      imagenAutor: "https://lh3.googleusercontent.com/a/ACg8ocLIR36VqzhjqVe8T4InWFusn6z3VxqBCvh5jk81hMx6KUZtmg=w72-h72-p-rp-mo-ba3-br100",
    },
    {
      autor: "Ana C.",
      tipoAutor: "Local Guide",
      fecha: "Hace 8 meses",
      calificacion: 5,
      texto: "Tras buscar en casi todos los herbolarios de Alcalá de Henares un sustituto vegano de huevo fallidamente, he dado con vosotras. Habéis hecho el pedido esta mañana y acabo de recogerlo! Me ha encantado la tienda, por toda la variedad de producto que tenéis y lo bien que me habéis atendido. Ya tenéis una clienta fija. Muchas gracias",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjU3Z32Hh2NXj4buNt_lwrcFEKccJyUW6MniCXH6zVzkIN72Ek5Guw=w72-h72-p-rp-mo-ba4-br100",
    },
    {
      autor: "La bruja",
      tipoAutor: "Local Guide",
      fecha: "Hace 2 meses",
      calificacion: 5,
      texto: "El mejor de Alcalá, lo recomiendo, buena atención, buen asesoramiento, quien nos a atendido un encanto. UN DIEZ",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjX1-VEIZZs_W7IzoafmAD9aEs0bdkNrSX3d71WRN1RSPN9emE-4=w72-h72-p-rp-mo-ba3-br100",
    },
    {
      autor: "Diana Calabuig",
      tipoAutor: null,
      fecha: "Hace 6 meses",
      calificacion: 5,
      texto: "Trato muy profesional y agradable, sitio perfecto para muchas alternativas naturales de muy buena calidad y además con un servicio excelente",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjXxfr2lqtF-aQu_eA0Nh3MJLspR7q25lGzwREJR2o3w0czI0HU=w72-h72-p-rp-mo-br100",
    },
    {
      autor: "Iria Fernández Duarte",
      tipoAutor: null,
      fecha: "Hace 6 meses",
      calificacion: 5,
      texto: "Genial herboristería. El trato es estupendo. Te asesoran en base a tus necesidades y explican todo de forma clara. Mi lugar de referencia sin duda.",
      imagenAutor: null,
    },
    {
      autor: "Francisca Flores Muñoz",
      tipoAutor: null,
      fecha: "Hace 4 meses",
      calificacion: 5,
      texto: "Profesionales y trato muy personalizado. Y con gran variedad en suplementos y nutrición.",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1001",
    },
    {
      autor: "Antonio 1963",
      tipoAutor: "Local Guide",
      fecha: "Hace 7 meses",
      calificacion: 5,
      texto: "Muy buena atención, tienen mucha variedad de productos a un precio acorde con la calidad, la Dueña te aconseja muy bien y te responde a todo la que necesites saber, muy agradable.",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1002",
    },
    {
      autor: "ivan causapie",
      tipoAutor: "Local Guide",
      fecha: "Hace 6 meses",
      calificacion: 5,
      texto: "Solo decir gracias, desde la atención vía whatsapp a la presencial de 10, rápidas, atentas , un trato excelente, si buscas servicio, calidad precio, no lo dudes.",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjVgFR1b_C1ezqPeEiOEpwnHX7Ec349sh1TG4fS8pSqpOxiW6C8N=w72-h72-p-rp-mo-ba4-br100",
    },
    {
      autor: "abir el masri",
      tipoAutor: null,
      fecha: "Hace 7 meses",
      calificacion: 5,
      texto: '"Tuve una experiencia excepcional utilizando los productos naturales de esta tienda y fui recibida por una señora con una sonrisa encantadora que explica todo con paciencia."',
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjV0IpEO8XT6IiZ6yZz_YTCQp1tElrtGm5kzy6j840Qy-1-BVaoL=w72-h72-p-rp-mo-br100",
    },
    {
      autor: "Marrmari Jaraiz",
      tipoAutor: null,
      fecha: "Hace 7 meses",
      calificacion: 5,
      texto: "Muy buena atención e información y ademas puedes ir con tu perro ya que permiten su entrada en la tienda que es de agradecer ya que te facilita el ir a comprar acompañados de ellos cuando los paseamos asi no tenemos que dejarlos en casa o …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1003",
    },
    {
      autor: "Evelyn Ramírez",
      tipoAutor: "Local Guide",
      fecha: "Hace un año",
      calificacion: 5,
      texto: "Buenas tardes, es la segunda vez que voy a este herbolario y me he quedado encantada con la atención que tiene, Diana; es muy amable, respetuosa; tiene mucha empata con los clientes, porque sabe orientarte sobre los productos y sino lo …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1004",
    },
    {
      autor: "chris markham",
      tipoAutor: "Local Guide",
      fecha: "Editado Hace un año",
      calificacion: 5,
      texto: "Las tres señoritas que trabajan en este sitio no solamente son muy encantadoras (algo no tan fácil de encontrar) sino también saben de sobra orientar y aconsejar a los clientes sobre los productos naturales y sus beneficios. Diana, con …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjXsa4X2G8HyKxjKJ7A8VUS499-qcn6I6FLZ5JJDfS5WRhjuxELl=w72-h72-p-rp-mo-ba4-br100",
    },
    {
      autor: "Sofía López",
      tipoAutor: "Local Guide",
      fecha: "Hace un año",
      calificacion: 1,
      texto: "Tendría que haber sabido lo que me esperaba desde el momento en que entre y di las buenas tardes enérgicamente y buscando la ayuda de la dependienta y lo que recibo son ojos en blanco y cero respuesta a mi saludo. …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9ZVB_UVLc3Y_KNbaMbIr-7sPKm5Ya_htrJNli-cX2IfvBW9pf=w72-h72-p-rp-mo-ba3-br100",
    },
    {
      autor: "alberto martinez pozo",
      tipoAutor: null,
      fecha: "Hace 7 meses",
      calificacion: 5,
      texto: "Buen herbolario, saben orientarte y el trato es muy amable y cercano. Esta bien surtido y si algo no tienen te lo traen sin problema.",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1005",
    },
    {
      autor: "Francisco José Barroso Bermejo",
      tipoAutor: null,
      fecha: "Hace 6 meses",
      calificacion: 5,
      texto: "Siempre me han atendido muy bien y muy rápido, resolviendo todas mis dudas. Gracias",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1006",
    },
    {
      autor: "Iván Hombrados",
      tipoAutor: "Local Guide",
      fecha: "Hace un año",
      calificacion: 5,
      texto: "He tenido una experiencia increíble en el herbolario. El trato fue excepcional, me brindaron toda la ayuda que necesitaba y me explicaron todo detalladamente. Además, quedé sorprendido por lo competitivos que eran sus precios. Sin duda, …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1007",
    },
    {
      autor: "Mercedes Elipe Ramos",
      tipoAutor: null,
      fecha: "Hace un año",
      calificacion: 5,
      texto: "Llevo mucho años siendo clienta de Herbolario Vitasfera desde que abrieron Sandra y Laura, para mí es mi Herbolario de confianza, son muy profesionales y me atienden muy bien, con mucho cariño, están muy pendientes del cliente y se …Más",
      imagenAutor: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br1008",
    }
  ];