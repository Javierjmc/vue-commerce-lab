import { ListaProductos, ProductoNutricional } from "./productos";
import ansionat1 from "../assets/productos/ANSIONAT/1.png"; // Importar imagen
import vitaminaC1 from "../assets/productos/VITAMINA C/1.png"; // Importar imagen
import hepanat1 from "../assets/productos/HEPANAT/1.png"; // Importar imagen

export interface ProductCombo {
  id: string;
  name: string;
  tagline: string;
  description: string; // Descripción general del combo
  productsIncludedIds: number[]; // IDs de los productos incluidos
  originalPrice: string; // Precio original sumando los productos
  comboPrice: string; // Precio con descuento del combo
  imageUrl: string; // Imagen principal del combo
}

// Función auxiliar para obtener el primer importe de un producto por su ID
const getProductImage = (productId: number): string => {
  const product = ListaProductos.find(p => p.id === productId);
  return product && product.imagenes.length > 0 ? product.imagenes[0] : "https://via.placeholder.com/600x400";
};

export const productCombos: ProductCombo[] = [
  {
    id: "combo-bienestar-total",
    name: "Combo Bienestar Total",
    tagline: "Armonía para cuerpo y mente",
    description: "Un conjunto esencial para el bienestar diario, combinando relajación, energía y soporte digestivo. Perfecto para quienes buscan un equilibrio integral.",
    productsIncludedIds: [3, 23, 29], // ANSIONAT, MAGNAT, PROBIONAT
    originalPrice: "€52,75", // (18.00 + 15.80 + 18.95)
    comboPrice: "€44,99",
    imageUrl: ansionat1,
  },
  {
    id: "combo-defensas-invencibles",
    name: "Combo Defensas Invencibles",
    tagline: "Fortaleza natural para tu sistema inmune",
    description: "Refuerza tus defensas con nuestra selección de productos clave. Mantente protegido y lleno de vitalidad durante todo el año.",
    productsIncludedIds: [38, 14, 28], // VITAMINA C, CURCUNAT, OMEGA 3
    originalPrice: "€74,65", // (18.00 + 22.15 + 34.50)
    comboPrice: "€64,99",
    imageUrl: vitaminaC1,
  },
  {
    id: "combo-detox-profundo",
    name: "Combo Detox Profundo",
    tagline: "Renueva tu cuerpo, revitaliza tu energía",
    description: "Una combinación potente para depurar y revitalizar tu organismo. Ideal para limpiar el hígado, mejorar la digestión y eliminar toxinas.",
    productsIncludedIds: [21, 10, 2], // HEPANAT, CARDONAT, ALOE RAPID
    originalPrice: "€53,35", // (21.40 + 15.90 + 13.95)
    comboPrice: "€45,99",
    imageUrl: hepanat1,
  },
];
