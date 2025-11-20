export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  features: string[];
}

import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import keyboardImg from "@/assets/keyboard.jpg";
import webcamImg from "@/assets/webcam.jpg";
import mouseImg from "@/assets/mouse.jpg";
import powerbankImg from "@/assets/powerbank.jpg";
import speakerImg from "@/assets/speaker.jpg";
import hubImg from "@/assets/hub.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Auriculares Premium Pro",
    description: "Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería",
    price: 299.99,
    image: headphonesImg,
    category: "Audio",
    stock: 15,
    features: [
      "Cancelación de ruido activa",
      "30 horas de batería",
      "Bluetooth 5.0",
      "Sonido Hi-Fi"
    ]
  },
  {
    id: "2",
    name: "Smartwatch Ultra",
    description: "Reloj inteligente con GPS, monitor de salud y pantalla AMOLED",
    price: 399.99,
    image: smartwatchImg,
    category: "Wearables",
    stock: 8,
    features: [
      "GPS integrado",
      "Monitor de frecuencia cardíaca",
      "Pantalla AMOLED",
      "Resistente al agua"
    ]
  },
  {
    id: "3",
    name: "Teclado Mecánico RGB",
    description: "Teclado mecánico gaming con switches cherry y iluminación RGB personalizable",
    price: 149.99,
    image: keyboardImg,
    category: "Gaming",
    stock: 22,
    features: [
      "Switches Cherry MX",
      "RGB personalizable",
      "Anti-ghosting",
      "Cable trenzado"
    ]
  },
  {
    id: "4",
    name: "Cámara Web 4K",
    description: "Cámara web profesional con resolución 4K y micrófono incorporado",
    price: 179.99,
    image: webcamImg,
    category: "Streaming",
    stock: 12,
    features: [
      "Resolución 4K",
      "60 fps",
      "Micrófono dual",
      "Autoenfoque"
    ]
  },
  {
    id: "5",
    name: "Mouse Gaming Pro",
    description: "Mouse gaming de alta precisión con sensor óptico de 16000 DPI",
    price: 89.99,
    image: mouseImg,
    category: "Gaming",
    stock: 30,
    features: [
      "16000 DPI",
      "8 botones programables",
      "RGB",
      "Peso ajustable"
    ]
  },
  {
    id: "6",
    name: "Power Bank 20000mAh",
    description: "Batería externa de carga rápida con 20000mAh de capacidad",
    price: 59.99,
    image: powerbankImg,
    category: "Accesorios",
    stock: 45,
    features: [
      "20000mAh",
      "Carga rápida",
      "3 puertos USB",
      "Display LED"
    ]
  },
  {
    id: "7",
    name: "Altavoz Bluetooth 360°",
    description: "Altavoz portátil con sonido 360° y resistencia al agua IPX7",
    price: 129.99,
    image: speakerImg,
    category: "Audio",
    stock: 18,
    features: [
      "Sonido 360°",
      "IPX7 resistente al agua",
      "12 horas de batería",
      "Bluetooth 5.0"
    ]
  },
  {
    id: "8",
    name: "Hub USB-C 7 en 1",
    description: "Hub multipuerto con HDMI 4K, USB 3.0 y lector de tarjetas SD",
    price: 79.99,
    image: hubImg,
    category: "Accesorios",
    stock: 25,
    features: [
      "HDMI 4K",
      "3x USB 3.0",
      "Lector SD/microSD",
      "USB-C PD"
    ]
  }
];
