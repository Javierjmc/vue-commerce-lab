// 1. Definición de la Interfaz para la estructura de datos
export interface ProductoNutricional {
  id: number;
  producto: string;
  precioCosto: string; // Mantengo string por el símbolo '€' y los vacíos
  pvp: string; // Precio de Venta al Público
  clasificacionFuncionPrincipal: string;
  categoriaPorPatologia: string;
  subcategoriaPorPatologia: string;
  titulo: string;
  subtitulo: string;
  subtituloComplemento: string;
  textoDePresentacionCta: string;
  productosAsociadosSugeridos: string;
  imagenes: string[];
  destacado: boolean;
}

// 2. Definición del array de datos con la interfaz aplicada
import alernat1 from "../assets/productos/ALERNAT/1.png";
import alernat2 from "../assets/productos/ALERNAT/2.png";
import alernat3 from "../assets/productos/ALERNAT/3.png";
import alernat4 from "../assets/productos/ALERNAT/4.png";
import alernat5 from "../assets/productos/ALERNAT/5.png";
import alernat6 from "../assets/productos/ALERNAT/6.png";

import aloeRapid1 from "../assets/productos/ALOE RAPID/1.png";
import aloeRapid2 from "../assets/productos/ALOE RAPID/2.png";
import aloeRapid3 from "../assets/productos/ALOE RAPID/3.png";
import aloeRapid4 from "../assets/productos/ALOE RAPID/4.png";
import aloeRapid5 from "../assets/productos/ALOE RAPID/5.png";
import aloeRapid6 from "../assets/productos/ALOE RAPID/6.png";
import aloeRapid7 from "../assets/productos/ALOE RAPID/7.png";

import ansionat1 from "../assets/productos/ANSIONAT/1.png";
import ansionat2 from "../assets/productos/ANSIONAT/2.png";
import ansionat3 from "../assets/productos/ANSIONAT/3.png";
import ansionat4 from "../assets/productos/ANSIONAT/4.png";
import ansionat5 from "../assets/productos/ANSIONAT/5.png";
import ansionat6 from "../assets/productos/ANSIONAT/6.png";
import ansionat7 from "../assets/productos/ANSIONAT/7.png";

import artinaat1 from "../assets/productos/ARTINAT 90 CAP/1.png";
import artinaat2 from "../assets/productos/ARTINAT 90 CAP/2.png";
import artinaat3 from "../assets/productos/ARTINAT 90 CAP/3.png";
import artinaat4 from "../assets/productos/ARTINAT 90 CAP/4.png";
import artinaat5 from "../assets/productos/ARTINAT 90 CAP/5.png";
import artinaat6 from "../assets/productos/ARTINAT 90 CAP/6.png";

import ashwagandha1 from "../assets/productos/ASAWANDA/1.png";
import ashwagandha2 from "../assets/productos/ASAWANDA/2.png";
import ashwagandha3 from "../assets/productos/ASAWANDA/3.png";
import ashwagandha4 from "../assets/productos/ASAWANDA/4.png";
import ashwagandha5 from "../assets/productos/ASAWANDA/5.png";
import ashwagandha6 from "../assets/productos/ASAWANDA/6.png";

import beautynat1 from "../assets/productos/BEAUTYNAT/1.png";
import beautynat2 from "../assets/productos/BEAUTYNAT/2.png";
import beautynat3 from "../assets/productos/BEAUTYNAT/3.png";
import beautynat4 from "../assets/productos/BEAUTYNAT/4.png";
import beautynat5 from "../assets/productos/BEAUTYNAT/5.png";

import berberina1 from "../assets/productos/BERBERINA/1.png";
import berberina2 from "../assets/productos/BERBERINA/2.png";
import berberina3 from "../assets/productos/BERBERINA/3.jpg";
import berberina4 from "../assets/productos/BERBERINA/4.jpg";
import berberina5 from "../assets/productos/BERBERINA/5.jpg";
import berberina6 from "../assets/productos/BERBERINA/6.png";
import berberina7 from "../assets/productos/BERBERINA/7.png";

import bronquinat1 from "../assets/productos/BRONQUINAT 500ML/1.png";
import bronquinat2 from "../assets/productos/BRONQUINAT 500ML/2.png";
import bronquinat3 from "../assets/productos/BRONQUINAT 500ML/3.png";
import bronquinat4 from "../assets/productos/BRONQUINAT 500ML/4.png";
import bronquinat5 from "../assets/productos/BRONQUINAT 500ML/5.png";

import carbonat1 from "../assets/productos/CARBONAT/1.jpg";
import carbonat2 from "../assets/productos/CARBONAT/2.png";
import carbonat3 from "../assets/productos/CARBONAT/3.png";
import carbonat4 from "../assets/productos/CARBONAT/4.png";
import carbonat5 from "../assets/productos/CARBONAT/5.png";
import carbonat6 from "../assets/productos/CARBONAT/6.png";
import carbonat7 from "../assets/productos/CARBONAT/7.png";
import carbonat8 from "../assets/productos/CARBONAT/8.png";

import cardonat1 from "../assets/productos/CARDONAT/1.png";
import cardonat2 from "../assets/productos/CARDONAT/2.png";
import cardonat3 from "../assets/productos/CARDONAT/3.png";
import cardonat4 from "../assets/productos/CARDONAT/4.png";
import cardonat5 from "../assets/productos/CARDONAT/5.png";

import circulnat1 from "../assets/productos/CIRCULNAT/1.png";
import circulnat2 from "../assets/productos/CIRCULNAT/2.png";
import circulnat3 from "../assets/productos/CIRCULNAT/3.jpg";
import circulnat4 from "../assets/productos/CIRCULNAT/4.jpg";
import circulnat5 from "../assets/productos/CIRCULNAT/5.png";
import circulnat6 from "../assets/productos/CIRCULNAT/6.png";

import colageno1 from "../assets/productos/COLAGENO/1.png";
import colageno2 from "../assets/productos/COLAGENO/2.jpg";
import colageno3 from "../assets/productos/COLAGENO/3.png";
import colageno4 from "../assets/productos/COLAGENO/4.jpg";
import colageno5 from "../assets/productos/COLAGENO/5.png";
import colageno6 from "../assets/productos/COLAGENO/6.png";
import colageno7 from "../assets/productos/COLAGENO/7.png";

import colesnat1 from "../assets/productos/COLESNAT/1.png";
import colesnat2 from "../assets/productos/COLESNAT/2.jpg";
import colesnat3 from "../assets/productos/COLESNAT/3.png";
import colesnat4 from "../assets/productos/COLESNAT/4.jpg";
import colesnat5 from "../assets/productos/COLESNAT/5.png";
import colesnat6 from "../assets/productos/COLESNAT/6.png";
import colesnat7 from "../assets/productos/COLESNAT/7.png";

import curcunat1 from "../assets/productos/CURCUNAT 60 CAP/1.jpg";
import curcunat2 from "../assets/productos/CURCUNAT 60 CAP/2.jpg";
import curcunat3 from "../assets/productos/CURCUNAT 60 CAP/3.jpg";
import curcunat3_png from "../assets/productos/CURCUNAT 60 CAP/3.png";
import curcunat4 from "../assets/productos/CURCUNAT 60 CAP/4.jpg";
import curcunat5 from "../assets/productos/CURCUNAT 60 CAP/5.png";
import curcunat6 from "../assets/productos/CURCUNAT 60 CAP/6.png";
import curcunat7 from "../assets/productos/CURCUNAT 60 CAP/7.png";

import cystinat1 from "../assets/productos/CYSTINAT/1.png";
import cystinat2 from "../assets/productos/CYSTINAT/2.png";
import cystinat3 from "../assets/productos/CYSTINAT/3.png";
import cystinat4 from "../assets/productos/CYSTINAT/4.png";
import cystinat5 from "../assets/productos/CYSTINAT/5.png";

import digesnat1 from "../assets/productos/DIGESNAT/1.jpg";
import digesnat2 from "../assets/productos/DIGESNAT/2.jpg";
import digesnat3 from "../assets/productos/DIGESNAT/3.jpg";
import digesnat4 from "../assets/productos/DIGESNAT/4.jpg";
import digesnat5 from "../assets/productos/DIGESNAT/5.png";
import digesnat6 from "../assets/productos/DIGESNAT/6.png";
import digesnat7 from "../assets/productos/DIGESNAT/7.png";

import diurcap1 from "../assets/productos/DIURCAP/1.png";
import diurcap2 from "../assets/productos/DIURCAP/2.png";
import diurcap3 from "../assets/productos/DIURCAP/3.png";
import diurcap4 from "../assets/productos/DIURCAP/4.png";

import diurnat1 from "../assets/productos/DIURNAT 500/1.png";
import diurnat2 from "../assets/productos/DIURNAT 500/2.png";
import diurnat3 from "../assets/productos/DIURNAT 500/3.png";
import diurnat4 from "../assets/productos/DIURNAT 500/4.png";
import diurnat5 from "../assets/productos/DIURNAT 500/5.png";
import diurnat6 from "../assets/productos/DIURNAT 500/6.png";
import diurnatLateralGotero from "../assets/productos/DIURNAT 500/Latersl gotero.png";
import diurnatUnnamed13 from "../assets/productos/DIURNAT 500/unnamed (13).png";

import gaba1 from "../assets/productos/GABA/1.png";
import gaba2 from "../assets/productos/GABA/2.png";
import gaba3 from "../assets/productos/GABA/3.png";
import gaba4 from "../assets/productos/GABA/4.png";

import gluconat1 from "../assets/productos/GLUCONAT/1.png";
import gluconat2 from "../assets/productos/GLUCONAT/2.jpg";
import gluconat3 from "../assets/productos/GLUCONAT/3.png";
import gluconat4 from "../assets/productos/GLUCONAT/4.jpg";
import gluconat5 from "../assets/productos/GLUCONAT/5.png";
import gluconat6 from "../assets/productos/GLUCONAT/6.png";
import gluconat7 from "../assets/productos/GLUCONAT/7.png";

import hepanat1 from "../assets/productos/HEPANAT/1.png";
import hepanat2 from "../assets/productos/HEPANAT/2.png";
import hepanat3 from "../assets/productos/HEPANAT/3.png";
import hepanat4 from "../assets/productos/HEPANAT/4.png";
import hepanat5 from "../assets/productos/HEPANAT/5.png";
import hepanat6 from "../assets/productos/HEPANAT/6.png";
import hepanat7 from "../assets/productos/HEPANAT/7.png";
import hepanatHepant1 from "../assets/productos/HEPANAT/Hepant1.png";

import kOgrass1 from "../assets/productos/k.0 grass/1.png";
import kOgrass2 from "../assets/productos/k.0 grass/2.png";
import kOgrass3 from "../assets/productos/k.0 grass/3.png";

import magnat1 from "../assets/productos/MAGNAT/1.jpg";
import magnat2 from "../assets/productos/MAGNAT/2.png";
import magnat3 from "../assets/productos/MAGNAT/3.png";

import megavitamin1 from "../assets/productos/MEGAVITAMIN/1.png";
import megavitamin2 from "../assets/productos/MEGAVITAMIN/2.png";
import megavitamin3 from "../assets/productos/MEGAVITAMIN/3.png";
import megavitaminMega from "../assets/productos/MEGAVITAMIN/MEGA.png";

import melatonat1 from "../assets/productos/MELATONAT/1.png";
import melatonat2 from "../assets/productos/MELATONAT/2.png";
import melatonat3 from "../assets/productos/MELATONAT/3.jpg";
import melatonat4 from "../assets/productos/MELATONAT/4.png";
import melatonat5 from "../assets/productos/MELATONAT/5.png";
import melatonat6 from "../assets/productos/MELATONAT/6.png";
import melatonat7 from "../assets/productos/MELATONAT/7.png";
import melatonat8 from "../assets/productos/MELATONAT/8.png";

import memorinat1 from "../assets/productos/MEMORINAT/1.png";
import memorinat2 from "../assets/productos/MEMORINAT/2.jpg";
import memorinat3 from "../assets/productos/MEMORINAT/3.png";
import memorinat4 from "../assets/productos/MEMORINAT/4.png";
import memorinat5 from "../assets/productos/MEMORINAT/5.png";
import memorinat6 from "../assets/productos/MEMORINAT/6.png";
import memorinat7 from "../assets/productos/MEMORINAT/7.png";
import memorinat8 from "../assets/productos/MEMORINAT/8.png";

import menonat1 from "../assets/productos/MENONAT/1.jpg";
import menonat2 from "../assets/productos/MENONAT/2.jpg";
import menonat3 from "../assets/productos/MENONAT/3.jpg";
import menonat4 from "../assets/productos/MENONAT/4.png";
import menonat5 from "../assets/productos/MENONAT/5.jpg";
import menonat6 from "../assets/productos/MENONAT/6.png";
import menonat7 from "../assets/productos/MENONAT/7.png";
import menonat8 from "../assets/productos/MENONAT/8.png";

import omega3_1 from "../assets/productos/OMEGA 3 200 Perlas/1.png";
import omega3_2 from "../assets/productos/OMEGA 3 200 Perlas/2.png";
import omega3_3 from "../assets/productos/OMEGA 3 200 Perlas/3.png";

import probionat1 from "../assets/productos/PROBIONAT/1.png";
import probionat2 from "../assets/productos/PROBIONAT/2.jpg";
import probionat3 from "../assets/productos/PROBIONAT/3.jpg";
import probionat4 from "../assets/productos/PROBIONAT/4.jpg";
import probionat5 from "../assets/productos/PROBIONAT/5.png";
import probionat6 from "../assets/productos/PROBIONAT/6.png";
import probionat7 from "../assets/productos/PROBIONAT/7.png";
import probionat8 from "../assets/productos/PROBIONAT/8.png";

import renalnat1 from "../assets/productos/RENALNAT/1.jpg";
import renalnat2 from "../assets/productos/RENALNAT/2.jpg";
import renalnat3 from "../assets/productos/RENALNAT/3.jpg";
import renalnat4 from "../assets/productos/RENALNAT/4.png";
import renalnat5 from "../assets/productos/RENALNAT/5.png";
import renalnat6 from "../assets/productos/RENALNAT/6.png";

import rompepiedras1 from "../assets/productos/ROMPEPIEDRAS/1.png";
import rompepiedras2 from "../assets/productos/ROMPEPIEDRAS/2.png";
import rompepiedras3 from "../assets/productos/ROMPEPIEDRAS/3.jpg";
import rompepiedras4 from "../assets/productos/ROMPEPIEDRAS/4.png";
import rompepiedras5 from "../assets/productos/ROMPEPIEDRAS/5.jpg";
import rompepiedras6 from "../assets/productos/ROMPEPIEDRAS/6.png";
import rompepiedras7 from "../assets/productos/ROMPEPIEDRAS/7.png";

import salvianat1 from "../assets/productos/SALVIANAT/1.png";
import salvianat2 from "../assets/productos/SALVIANAT/2.png";
import salvianat3 from "../assets/productos/SALVIANAT/3.png";

import seronat1 from "../assets/productos/SERONAT K/1.jpg";
import seronat2 from "../assets/productos/SERONAT K/2.jpg";
import seronat3 from "../assets/productos/SERONAT K/3.jpg";
import seronat4 from "../assets/productos/SERONAT K/4.jpg";
import seronat5 from "../assets/productos/SERONAT K/5.png";
import seronat6 from "../assets/productos/SERONAT K/6.png";

import tensionat1 from "../assets/productos/TENSIONAT/1.png";
import tensionat2 from "../assets/productos/TENSIONAT/2.jpg";
import tensionat3 from "../assets/productos/TENSIONAT/3.png";
import tensionat4 from "../assets/productos/TENSIONAT/4.png";
import tensionat5 from "../assets/productos/TENSIONAT/5.png";
import tensionat6 from "../assets/productos/TENSIONAT/6.png";
import tensionat7 from "../assets/productos/TENSIONAT/7.png";
import tensionat8 from "../assets/productos/TENSIONAT/8.png";

import treenat1 from "../assets/productos/TREE NAT 30ML/1.png";
import treenat2 from "../assets/productos/TREE NAT 30ML/2.png";
import treenat3 from "../assets/productos/TREE NAT 30ML/3.png";
import treenat4 from "../assets/productos/TREE NAT 30ML/4.jpg";
import treenat5 from "../assets/productos/TREE NAT 30ML/5.png";
import treenat6 from "../assets/productos/TREE NAT 30ML/6.png";

import vitaminaB1 from "../assets/productos/VITAMINA B/1.png";
import vitaminaB2 from "../assets/productos/VITAMINA B/2.png";
import vitaminaB3 from "../assets/productos/VITAMINA B/3.png";

import vitaminaBReforzada1 from "../assets/productos/Vitamina B Reforzada/1.png";
import vitaminaBReforzada2 from "../assets/productos/Vitamina B Reforzada/2.png";

import vitaminaC1 from "../assets/productos/VITAMINA C/1.png";
import vitaminaC2 from "../assets/productos/VITAMINA C/2.png";
import vitaminaC3 from "../assets/productos/VITAMINA C/3.png";


export const ListaProductos: ProductoNutricional[] = [
  {
    id: 1,
    producto: "ALERNAT",
    precioCosto: "€5,25",
    pvp: "€18,00",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "INMUNIDAD",
    subcategoriaPorPatologia: "Alergias y Rinitis",
    titulo: "ALERNAT",
    subtitulo: "Soporte Antialérgico/stop alergia",
    subtituloComplemento: "FÓRMULA SIN SOMNOLENCIA: Alivia los síntomas sin causar sueño.",
    textoDePresentacionCta: "Alivio Respiratorio. Neutraliza alérgenos y respira libre. ¡Compra ya!",
    productosAsociadosSugeridos: "VITAMINA C, PROBIONAT, TREE NAT,OMEGA 3, HEPANAT",
    imagenes: [alernat1, alernat2, alernat3, alernat4, alernat5, alernat6],
    destacado: true
  },
  {
    id: 2,
    producto: "ALOE RAPID 60CAP",
    precioCosto: "€5,75",
    pvp: "€13,95",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "DIGESTIVO",
    subcategoriaPorPatologia: "Acidez y Tránsito Lento",
    titulo: "ALOE RAPID",
    subtitulo: "Laxante ,Reparador de Mucosa",
    subtituloComplemento: "Calma el intestino y repara la pared celular.",
    textoDePresentacionCta: "Reparación Rápida. Calma acidez y regula tu tránsito. ¡Consigue confort!S",
    productosAsociadosSugeridos: "PROBIONAT, CARBONAT, MAGNAT",
    imagenes: [aloeRapid1, aloeRapid2, aloeRapid3, aloeRapid4, aloeRapid5, aloeRapid6, aloeRapid7],
    destacado: false
  },
  {
    id: 3,
    producto: "ANSIONAT",
    precioCosto: "€7,69",
    pvp: "€18,00",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Ansiedad y Nerviosismo",
    titulo: "ANSIONAT",
    subtitulo: "Equilibrio Emocional",
    subtituloComplemento: "EFECTO ANTI-ESTRÉS SIN ADICCIÓN: Equilibrio emocional de larga duración.",
    textoDePresentacionCta: "Reduce la ansiedad y el nerviosismo. ¡Recupera tu calma diaria!S",
    productosAsociadosSugeridos: "MAGNAT, GABA, MELATONAT",
    imagenes: [ansionat1, ansionat2, ansionat3, ansionat4, ansionat5, ansionat6, ansionat7],
    destacado: false
  },
  {
    id: 4,
    producto: "ARTINAAT 90CAP",
    precioCosto: "€10,75",
    pvp: "€28,65",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "ARTICULAR",
    subcategoriaPorPatologia: "Dolor y Rigidez Articular",
    titulo: "ARTINAAT",
    subtitulo: "Reconstructor Articular",
    subtituloComplemento: "ACCIÓN DUAL: REPARA CARTÍLAGO Y LÍQUIDO SINOVIAL.",
    textoDePresentacionCta: "Reconstructor Articular. Repara cartílago. ¡Recupera el movimiento!S",
    productosAsociadosSugeridos: "CURCUMAT, COLÁGENO UC-II, UNGÜENTO CALORÍFICO",
    imagenes: [artinaat1, artinaat2, artinaat3, artinaat4, artinaat5, artinaat6],
    destacado: false
  },
  {
    id: 5,
    producto: "ASHWAGANDHA",
    precioCosto: "€9,84",
    pvp: "€23,65",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Estrés Crónico y Fatiga",
    titulo: "ASHWAGANDHA KSM-66",
    subtitulo: "Adaptógeno Calmante",
    subtituloComplemento: "CON KSM-66® (MÁXIMA POTENCIA Y ABSORCIÓN): La mejor cepa de Ashwagandha.",
    textoDePresentacionCta: "Adaptógeno Calmante. Combate estrés y fatiga. ¡Tu equilibrio mental!S",
    productosAsociadosSugeridos: "MAGNAT, RHODIOLA, MELATONAT",
    imagenes: [ashwagandha1, ashwagandha2, ashwagandha3, ashwagandha4, ashwagandha5, ashwagandha6],
    destacado: false
  },
  {
    id: 6,
    producto: "BEAUTYNAT",
    precioCosto: "€9,10",
    pvp: "€21,95",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "PIEL Y BELLEZA",
    subcategoriaPorPatologia: "Envejecimiento y Piel Opaca",
    titulo: "BEAUTYNAT",
    subtitulo: "Beauty Booster",
    subtituloComplemento: "PEPTIDOS DE COLÁGENO MARINO HIDROLIZADO: Alta biodisponibilidad para piel y cabello.",
    textoDePresentacionCta: "Beauty Booster. Juventud y luminosidad. Nutrición desde dentro.",
    productosAsociadosSugeridos: "OMEGA 3, VITAMINA C, COLÁGENO UC-II",
    imagenes: [beautynat1, beautynat2, beautynat3, beautynat4, beautynat5],
    destacado: false
  },
  {
    id: 7,
    producto: "BERBERINA",
    precioCosto: "€10,84",
    pvp: "€29,00",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Glucosa Alta y Resistencia Insulina",
    titulo: "BERBERINA",
    subtitulo: "Controlador Metabólico",
    subtituloComplemento: "CONTROLADOR METABÓLICO DE AMPLIO ESPECTRO: Efecto dual en glucosa y lípidos.",
    textoDePresentacionCta: "Controlador Metabólico. Equilibra azúcar y lípidos. ¡Compra ahora!",
    productosAsociadosSugeridos: "K.O GRASS, COLESNAT, HEPANAT",
    imagenes: [berberina1, berberina2, berberina3, berberina4, berberina5, berberina6, berberina7],
    destacado: false
  },
  {
    id: 8,
    producto: "BRONQUINAT 500ML",
    precioCosto: "€8,90",
    pvp: "€19,80",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "RESPIRATORIO",
    subcategoriaPorPatologia: "Tos y Mucosidad",
    titulo: "BRONQUINAT",
    subtitulo: "Soporte Respiratorio",
    subtituloComplemento: "ACCIÓN MUCILAGINOSA Y EXPECTORANTE RÁPIDA (Jarabe): Efecto inmediato en mucosidad.",
    textoDePresentacionCta: "Alivia la tos y despeja vías. ¡Fórmula natural efectiva!",
    productosAsociadosSugeridos: "VITAMINA C, TREE NAT, RESTAURADOR PULMONAR",
    imagenes: [bronquinat1, bronquinat2, bronquinat3, bronquinat4, bronquinat5],
    destacado: false
  },
  {
    id: 9,
    producto: "CARBONAT",
    precioCosto: "€4,42",
    pvp: "€10,90",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "DIGESTIVO",
    subcategoriaPorPatologia: "Acidez y Digestión Pesada",
    titulo: "CARBONAT",
    subtitulo: "Alivio Digestivo",
    subtituloComplemento: "MAGNESIO CARBONATO DE ALTA ALCALINIDAD: Neutraliza la acidez estomacal rápidamente.",
    textoDePresentacionCta: "Calma la acidez y regula tu tránsito. ¡Soporte digestivo!",
    productosAsociadosSugeridos: "ALOE RAPID, PROBIONAT, CARDONAT",
    imagenes: [carbonat1, carbonat2, carbonat3, carbonat4, carbonat5, carbonat6, carbonat7, carbonat8],
    destacado: false
  },
  {
    id: 10,
    producto: "CARDONAT",
    precioCosto: "€6,74",
    pvp: "€15,90",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Salud Hepática y Detox",
    titulo: "CARDONAT",
    subtitulo: "Regenerador Hepático",
    subtituloComplemento: "EXTRACTO ESTANDARIZADO DE SILIMARINA (80%): Máxima concentración para regeneración hepática.",
    textoDePresentacionCta: "Regenerador Hepático. Limpia tu motor vital. ¡Protege tu hígado!",
    productosAsociadosSugeridos: "HEPANAT, COLESNAT, VITAMINA C",
    imagenes: [cardonat1, cardonat2, cardonat3, cardonat4, cardonat5],
    destacado: false
  },
  {
    id: 11,
    producto: "CIRCULNAT",
    precioCosto: "€7,16",
    pvp: "€16,95",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "CIRCULACIÓN",
    subcategoriaPorPatologia: "Insuficiencia Venosa y Pesadez",
    titulo: "CIRCULNAT",
    subtitulo: "Piernas Ligeras",
    subtituloComplemento: "ALTO CONTENIDO DE BIOFLAVONOIDES (DIOSMINA/HESPERIDINA): Mejora la resistencia capilar.",
    textoDePresentacionCta: "Mejora la circulación y alivia la pesadez. ¡Confort inmediato!",
    productosAsociadosSugeridos: "V-DRENAT, OMEGA 3, DIURNAT",
    imagenes: [circulnat1, circulnat2, circulnat3, circulnat4, circulnat5, circulnat6],
    destacado: false
  },
  {
    id: 12,
    producto: "COLAGENO UCII",
    precioCosto: "€9,01",
    pvp: "€25,60",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "ARTICULAR",
    subcategoriaPorPatologia: "Inflamación y Desgaste Articular",
    titulo: "COLÁGENO UC-II",
    subtitulo: "Reparador Inmune",
    subtituloComplemento: "COLÁGENO NO DESNATURALIZADO (Tipo II): Actúa por vía inmune para reducir la inflamación articular.",
    textoDePresentacionCta: "Reparador Inmune. Protege el cartílago. ¡Adiós inflamación!",
    productosAsociadosSugeridos: "ARTINAAT, CURCUMAT, OMEGA 3",
    imagenes: [colageno1, colageno2, colageno3, colageno4, colageno5, colageno6, colageno7],
    destacado: false
  },
  {
    id: 13,
    producto: "COLESNAT 90CAP",
    precioCosto: "€8,25",
    pvp: "€19,50",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Colesterol y Lípidos Elevados",
    titulo: "COLESNAT",
    subtitulo: "Estatina Natural",
    subtituloComplemento: "ESTATINA NATURAL A BASE DE LEVADURA DE ARROZ ROJO: Control efectivo sin efectos secundarios.",
    textoDePresentacionCta: "Estatina Natural. Controla tu colesterol y lípidos. ¡Salud cardiovascular!",
    productosAsociadosSugeridos: "BERBERINA, OMEGA 3, CARDONAT",
    imagenes: [colesnat1, colesnat2, colesnat3, colesnat4, colesnat5, colesnat6, colesnat7],
    destacado: false
  },
  {
    id: 14,
    producto: "CURCUNAT 60CAP",
    precioCosto: "€9,39",
    pvp: "€22,15",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "ARTICULAR",
    subcategoriaPorPatologia: "Dolor e Inflamación Crónica",
    titulo: "CURCUMAT",
    subtitulo: "Antiinflamatorio Potente",
    subtituloComplemento: "CURCUMINA CON PIMIENTA NEGRA (MÁXIMA ABSORCIÓN): Potencia antiinflamatoria sin igual.",
    textoDePresentacionCta: "Antiinflamatorio Natural. Alivia el dolor articular. ¡Compra ahora!",
    productosAsociadosSugeridos: "ARTINAAT, OMEGA 3, COLÁGENO UC-II",
    imagenes: [curcunat1, curcunat2, curcunat3, curcunat3_png, curcunat4, curcunat5, curcunat6, curcunat7],
    destacado: false
  },
  {
    id: 15,
    producto: "CYSTINAT",
    precioCosto: "€6,66",
    pvp: "€15,90",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "URINARIO",
    subcategoriaPorPatologia: "Infecciones Urinarias Recurrentes",
    titulo: "CYSTINAT",
    subtitulo: "Confort Urinario",
    subtituloComplemento: "CON D-MANOSA Y ARÁNDANO ROJO (DOBLE ACCIÓN PREVENTIVA): Evita la adherencia bacteriana.",
    textoDePresentacionCta: "Previene y alivia infecciones urinarias. ¡Protección efectiva!",
    productosAsociadosSugeridos: "PROBIONAT, ROMPEPIEDRAS, VITAMINA C",
    imagenes: [cystinat1, cystinat2, cystinat3, cystinat4, cystinat5],
    destacado: false
  },
  {
    id: 16,
    producto: "DIGESNAT",
    precioCosto: "",
    pvp: "",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "DIGESTIVO",
    subcategoriaPorPatologia: "Bienestar Digestivo / Inmunidad",
    titulo: "DIGESNAT",
    subtitulo: "PROBIÓTICO SIMBIÓTICO",
    subtituloComplemento: "BIENESTAR INTESTINAL / ESCUDO INMUNOLOGICO",
    textoDePresentacionCta: "Simbiótico (2x1 Probióticos + Prebióticos, ) que tu cuerpo necesita. No solo repoblamos tu flora, le damos el alimento para que restaure su equilibrio de forma potente.",
    productosAsociadosSugeridos: "PROBIONAT (Soporte inmediato de enzimas), VITAMINA C (Refuerzo Inmune), ALOE RAPID (Reparación de mucosa)",
    imagenes: [digesnat1, digesnat2, digesnat3, digesnat4, digesnat5, digesnat6, digesnat7],
    destacado: false
  },
  {
    id: 17,
    producto: "DIURCAP",
    precioCosto: "€4,44",
    pvp: "€10,80",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "URINARIO",
    subcategoriaPorPatologia: "Retención de Líquidos y Edema",
    titulo: "DIURCAP",
    subtitulo: "Diurético Natural",
    subtituloComplemento: "COMPLEJO BOTÁNICO DE MÁXIMO DRENAJE: Fórmula concentrada para la retención.",
    textoDePresentacionCta: "Diurético Natural. Elimina líquidos y reduce el edema. ¡Sensación ligera!",
    productosAsociadosSugeridos: "V-DRENAT, DIURNAT, ROMPEPIEDRAS",
    imagenes: [diurcap1, diurcap2, diurcap3, diurcap4],
    destacado: false
  },
  {
    id: 18,
    producto: "DIURNAT 500ml",
    precioCosto: "€9,39",
    pvp: "€21,50",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "URINARIO",
    subcategoriaPorPatologia: "Retención de Líquidos y Edema",
    titulo: "DIURNAT",
    subtitulo: "Drenante Depurativo",
    subtituloComplemento: "FÓRMULA LÍQUIDA DE ALTA CONCENTRACIÓN: Absorción más rápida y efecto detox.",
    textoDePresentacionCta: "Drenante Depurativo. Ayuda a eliminar toxinas y líquidos. ¡Ligeresa ya!",
    productosAsociadosSugeridos: "DIURCAP, V-DRENAT, CIRCULNAT",
    imagenes: [diurnat1, diurnat2, diurnat3, diurnat4, diurnat5, diurnat6, diurnatLateralGotero, diurnatUnnamed13],
    destacado: true
  },
  {
    id: 19,
    producto: "GABA",
    precioCosto: "€6,25",
    pvp: "€15,90",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Insomnio y Ansiedad",
    titulo: "GABA",
    subtitulo: "Relajante Cerebral",
    subtituloComplemento: "ACCIÓN RELAJANTE INMEDIATA EN EL CEREBRO: Promueve la calma antes de dormir.",
    textoDePresentacionCta: "Relajante Cerebral. Calma la mente y mejora la calidad del sueño.",
    productosAsociadosSugeridos: "MELATONAT, MAGNAT, ANSIONAT",
    imagenes: [gaba1, gaba2, gaba3, gaba4],
    destacado: false
  },
  {
    id: 20,
    producto: "GLUCONAT",
    precioCosto: "€10,92",
    pvp: "€24,90",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Picos de Glucosa y Diabetes",
    titulo: "GLUCONAT",
    subtitulo: "Estabilizador de Glucosa",
    subtituloComplemento: "COMBINACIÓN SÚPER CONCENTRADA DE CROMO Y ÁCIDO ALFA LIPOICO: Estabilizador potente.",
    textoDePresentacionCta: "¡RIESGO HIPOGLUCEMIA! Estabiliza azúcar y energía. ¡Compra hoy!",
    productosAsociadosSugeridos: "BERBERINA, COLESNAT, K.O GRASS",
    imagenes: [gluconat1, gluconat2, gluconat3, gluconat4, gluconat5, gluconat6, gluconat7],
    destacado: true
  },
  {
    id: 21,
    producto: "HEPANAT 500ML",
    precioCosto: "€9,04",
    pvp: "€21,40",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Hígado Graso y Detox",
    titulo: "HEPANAT",
    subtitulo: "Detox Hepático",
    subtituloComplemento: "DETOX LÍQUIDO ACTIVO: Rápida depuración hepática con sabor agradable.",
    textoDePresentacionCta: "Detox Hepático. Limpia y renueva tu hígado. ¡Fórmula líquida!",
    productosAsociadosSugeridos: "CARDONAT, BERBERINA, COLESNAT",
    imagenes: [hepanat1, hepanat2, hepanat3, hepanat4, hepanat5, hepanat6, hepanat7, hepanatHepant1],
    destacado: false
  },
  {
    id: 22,
    producto: "K.O GRASS 90CAP",
    precioCosto: "€9,42",
    pvp: "€26,35",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "METABOLISMO",
    subcategoriaPorPatologia: "Control de Peso y Grasa Corporal",
    titulo: "K.O GRASS",
    subtitulo: "Quema Grasa Potente",
    subtituloComplemento: "ACCIÓN TERMO GÉNESIS ACTIVA: Quema grasa aumentando la temperatura corporal.",
    textoDePresentacionCta: "Quema Grasa Potente. Controla el peso y acelera el metabolismo.",
    productosAsociadosSugeridos: "BERBERINA, L-CARNITINA (si existe), COLESNAT",
    imagenes: [kOgrass1, kOgrass2, kOgrass3],
    destacado: false
  },
  {
    id: 23,
    producto: "MAGNAT 120 CAP",
    precioCosto: "€5,78",
    pvp: "€15,80",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Estrés, Calambres y Sueño",
    titulo: "MAGNAT (Magnesio)",
    subtitulo: "Calma Total",
    subtituloComplemento: "ALTA BIODISPONIBILIDAD (CITRATO/BISGLICINATO): Mejor absorción, mínimo efecto laxante.",
    textoDePresentacionCta: "Calma Total. Adiós estrés y calambres. ¡Mejora tu sueño!",
    productosAsociadosSugeridos: "GABA, MELATONAT, ASHWAGANDHA",
    imagenes: [magnat1, magnat2, magnat3],
    destacado: true
  },
  {
    id: 24,
    producto: "MEGAVITAMIN",
    precioCosto: "€6,93",
    pvp: "€16,35",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "BIENESTAR",
    subcategoriaPorPatologia: "Cansancio y Déficit Nutricional",
    titulo: "MEGAVITAMIN",
    subtitulo: "Multivitamínico Diario",
    subtituloComplemento: "30 INGREDIENTES ESENCIALES DE AMPLIO ESPECTRO: Soporte nutricional completo.",
    textoDePresentacionCta: "Vitalidad Diaria. Refuerza tus defensas y energía. ¡Salud integral!",
    productosAsociadosSugeridos: "OMEGA 3, VITAMINA C, VITAMINA B REFORZADA",
    imagenes: [megavitamin1, megavitamin2, megavitamin3, megavitaminMega],
    destacado: false
  },
  {
    id: 25,
    producto: "MELATONAT",
    precioCosto: "€6,03",
    pvp: "€15,95",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Insomnio y Jet Lag",
    titulo: "MELATONAT",
    subtitulo: "Regulador de Sueño",
    subtituloComplemento: "DOSIS PRECISA PARA CONCILIAR EL SUEÑO Y REGULAR EL CICLO CIRCADIANO.",
    textoDePresentacionCta: "Regulador de Sueño. Concilia rápido y descansa profundamente.",
    productosAsociadosSugeridos: "GABA, MAGNAT, ASHWAGANDHA",
    imagenes: [melatonat1, melatonat2, melatonat3, melatonat4, melatonat5, melatonat6, melatonat7, melatonat8],
    destacado: false
  },
  {
    id: 26,
    producto: "MEMORINAT",
    precioCosto: "€9,69",
    pvp: "€23,45",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Bajo Rendimiento Cognitivo",
    titulo: "MEMORINAT",
    subtitulo: "Potenciador Cognitivo",
    subtituloComplemento: "NEURO-ESTIMULANTE (GINKGO Y FOSFATIDILSERINA): Potencia la memoria a corto plazo.",
    textoDePresentacionCta: "Enfoque Láser. Agudiza memoria y eleva concentración. ¡Mente clara!",
    productosAsociadosSugeridos: "OMEGA 3, VITAMINA B REFORZADA, RHODIOLA",
    imagenes: [memorinat1, memorinat2, memorinat3, memorinat4, memorinat5, memorinat6, memorinat7, memorinat8],
    destacado: false
  },
  {
    id: 27,
    producto: "MENONAT",
    precioCosto: "€8,02",
    pvp: "€19,45",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "HORMONAL",
    subcategoriaPorPatologia: "Menopausia y Sofocos",
    titulo: "MENONAT",
    subtitulo: "Equilibrio Femenino",
    subtituloComplemento: "COMPLEJO DE FITOESTRÓGENOS Y CALMANTES: Alivia sofocos y la irritabilidad hormonal.",
    textoDePresentacionCta: "Equilibrio Femenino. Alivia sofocos y recupera el bienestar.",
    productosAsociadosSugeridos: "MAGNAT, VITAMINA D3 K2, OMEGA 3",
    imagenes: [menonat1, menonat2, menonat3, menonat4, menonat5, menonat6, menonat7, menonat8],
    destacado: false
  },
  {
    id: 28,
    producto: "OMEGA 3 200 PERLAS",
    precioCosto: "€12,07",
    pvp: "€34,50",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "CARDIOVASCULAR",
    subcategoriaPorPatologia: "Corazón, Mente y Colesterol",
    titulo: "OMEGA 3 (Alto DHA)",
    subtitulo: "Neuro-Cardiovascular",
    subtituloComplemento: "700 MG DE DHA POR PERLA (ULTRA-CONCENTRADO): Máximo soporte cerebral y cardíaco.",
    textoDePresentacionCta: "Corazón Fuerte, Mente Clara. Alto DHA. ¡Compra ahora!",
    productosAsociadosSugeridos: "COLESNAT, MEMORINAT, VITAMINA D3 K2",
    imagenes: [omega3_1, omega3_2, omega3_3],
    destacado: false
  },
  {
    id: 29,
    producto: "PROBIONAT",
    precioCosto: "€8,31",
    pvp: "€18,95",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "DIGESTIVO",
    subcategoriaPorPatologia: "Bienestar Digestivo / Asimilación",
    titulo: "PROBIONAT",
    subtitulo: "COMPLEJO ENZIMÁTICO DIGESTIVO PREMIUM",
    subtituloComplemento: "Complejo de Enzimas Digestivas de amplio espectro",
    textoDePresentacionCta: "La solución inmediata para digestiones pesadas. Descompone grasas, proteínas y carbohidratos, reduciendo la hinchazón. ¡Disfruta de tus comidas sin molestias!",
    productosAsociadosSugeridos: "DIGESNAT (Equilibrio de flora a largo plazo), ALOE RAPID (Reparador de Mucosa), CARBONAT (Alivio de gases/acidez).",
    imagenes: [probionat1, probionat2, probionat3, probionat4, probionat5, probionat6, probionat7, probionat8],
    destacado: false
  },
  {
    id: 30,
    producto: "RENALNAT",
    precioCosto: "",
    pvp: "",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "URINARIO",
    subcategoriaPorPatologia: "Vías Urinarias / Detox",
    titulo: "RENALNAT",
    subtitulo: "SOPORTE RENAL Y DRENANTE NATURAL",
    subtituloComplemento: "SOPORTE RENAL Y DRENANTE NATURAL",
    textoDePresentacionCta: "Ligereza y protección para tu bienestar. Favorece la eliminación de líquidos y proporciona limpieza al sistema renal. CTA: ¡Siente la ligereza del drenaje natural!",
    productosAsociadosSugeridos: "DIURCAP o DIURNAT (Drenaje reforzado), CYSTINAT (Protección urinaria), ROMPEPIEDRAS (Litiasis).",
    imagenes: [renalnat1, renalnat2, renalnat3, renalnat4, renalnat5, renalnat6],
    destacado: false
  },
  {
    id: 31,
    producto: "RHODIOLA",
    precioCosto: "€6,47",
    pvp: "€18,95",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Fatiga y Bajo Rendimiento",
    titulo: "RHODIOLA",
    subtitulo: "Adaptógeno Energizante",
    subtituloComplemento: "ADAPTÓGENO ENERGIZANTE Y ENFOCADO: Mejora la resistencia física y mental al estrés.",
    textoDePresentacionCta: "Adaptógeno Energizante. Combate la fatiga mental y rinde más.",
    productosAsociadosSugeridos: "ASHWAGANDHA, VITAMINA B REFORZADA, MEMORINAT",
    imagenes: [],
    destacado: false
  },
  {
    id: 32,
    producto: "ROMPEPIEDRAS",
    precioCosto: "€4,15",
    pvp: "€9,90",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "URINARIO",
    subcategoriaPorPatologia: "Cálculos Renales/Biliares",
    titulo: "ROMPEPIEDRAS",
    subtitulo: "Confort Urinario",
    subtituloComplemento: "FÓRMULA TRADICIONAL PARA LA LITIASIS: Ayuda a desintegrar y expulsar cálculos.",
    textoDePresentacionCta: "Cálculos y Arenilla. Desintegra y facilita la expulsión. ¡Alivio ya!S",
    productosAsociadosSugeridos: "DIURCAP, CYSTINAT, CARDONAT",
    imagenes: [rompepiedras1, rompepiedras2, rompepiedras3, rompepiedras4, rompepiedras5, rompepiedras6, rompepiedras7],
    destacado: false
  },
  {
    id: 33,
    producto: "SALVIANAT",
    precioCosto: "€6,12",
    pvp: "€14,80",
    clasificacionFuncionPrincipal: "COMPLEMENTO",
    categoriaPorPatologia: "BIENESTAR",
    subcategoriaPorPatologia: "Bienestar General",
    titulo: "SALVIANAT",
    subtitulo: "Soporte de Bienestar",
    subtituloComplemento: "EXTRACTO DE SALVIA CON PROPIEDADES ANTIOXIDANTES Y DIGESTIVAS.",
    textoDePresentacionCta: "Bienestar Diario. Fórmula natural para la salud integral. ¡Consíguelo!S",
    productosAsociadosSugeridos: "MEGAVITAMIN, VITAMINA C, OMEGA 3, CLORIFLA",
    imagenes: [salvianat1, salvianat2, salvianat3],
    destacado: false
  },
  {
    id: 34,
    producto: "SERONAT",
    precioCosto: "€7,24",
    pvp: "€17,45",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "ESTRÉS Y MENTE",
    subcategoriaPorPatologia: "Bajo Ánimo y Estrés",
    titulo: "SERONAT",
    subtitulo: "Regulador de Ánimo",
    subtituloComplemento: "PRECURSOR DE SEROTONINA (5-HTP): Mejora el ánimo y reduce la ansiedad suavemente.",
    textoDePresentacionCta: "Regulador de Ánimo. Eleva tu bienestar y combate el estrés.S",
    productosAsociadosSugeridos: "MAGNAT, ASHWAGANDHA, VITAMINA B REFORZADA",
    imagenes: [seronat1, seronat2, seronat3, seronat4, seronat5, seronat6],
    destacado: false
  },
  {
    id: 35,
    producto: "TENSIONAT",
    precioCosto: "€7,12",
    pvp: "€15,80",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "CARDIOVASCULAR",
    subcategoriaPorPatologia: "Hipertensión y Presión Alta",
    titulo: "TENSIONAT",
    subtitulo: "Soporte Tensional",
    subtituloComplemento: "SOPORTE TENSIONAL CON OLIVO Y ESPINO BLANCO: Ayuda a mantener la presión arterial en rango.",
    textoDePresentacionCta: "Presión Arterial. Mantiene los niveles saludables. ¡Corazón fuerte!S",
    productosAsociadosSugeridos: "OMEGA 3, MAGNAT, CIRCULNAT",
    imagenes: [tensionat1, tensionat2, tensionat3, tensionat4, tensionat5, tensionat6, tensionat7, tensionat8],
    destacado: false
  },
  {
    id: 36,
    producto: "TREE NAT 30ML",
    precioCosto: "€6,18",
    pvp: "€15,60",
    clasificacionFuncionPrincipal: "SOPORTE ESPECÍFICO",
    categoriaPorPatologia: "RESPIRATORIO",
    subcategoriaPorPatologia: "Descongestión y Vías Altas",
    titulo: "TREE NAT",
    subtitulo: "Esencia Descongestiva",
    subtituloComplemento: "ESENCIA BOTÁNICA ALTAMENTE VOLÁTIL: Alivio nasal y pectoral instantáneo.",
    textoDePresentacionCta: "Vías Altas. Despeja y facilita la respiración. ¡Alivio instantáneo!S",
    productosAsociadosSugeridos: "BRONQUINAT, VITAMINA C, ALERNAT",
    imagenes: [treenat1, treenat2, treenat3, treenat4, treenat5, treenat6],
    destacado: true
  },
  {
    id: 37,
    producto: "VITAMINA B METILADA",
    precioCosto: "€7,87",
    pvp: "€18,90",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "BIENESTAR",
    subcategoriaPorPatologia: "Energía y Sistema Nervioso",
    titulo: "VITAMINA B",
    subtitulo: "Complejo Energético",
    subtituloComplemento: "ALTA DOSIS DE VITAMINA B12 Y ÁCIDO FÓLICO: Soporte energético y nervioso reforzado.",
    textoDePresentacionCta: "Energía y Enfoque. Soporte total al sistema nervioso. ¡Carga tu día!S",
    productosAsociadosSugeridos: "RHODIOLA, MEGAVITAMIN, MAGNAT",
    imagenes: [vitaminaB1, vitaminaB2, vitaminaB3],
    destacado: false
  },
  {
    id: 38,
    producto: "VITAMINA C",
    precioCosto: "€5,98",
    pvp: "€18,00",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "INMUNIDAD",
    subcategoriaPorPatologia: "Defensas Bajas y Antioxidante",
    titulo: "VITAMINA C",
    subtitulo: "Escudo Inmune",
    subtituloComplemento: "FÓRMULA BUFFERED/LIPOSOMAL (si aplica): Máxima absorción sin acidez estomacal.",
    textoDePresentacionCta: "Escudo Inmune. Potencia defensas y energía. ¡Antioxidante esencial!S",
    productosAsociadosSugeridos: "VITAMINA D3 K2, MEGAVITAMIN, OMEGA 3",
    imagenes: [vitaminaC1, vitaminaC2, vitaminaC3],
    destacado: false
  },
  {
    id: 39,
    producto: "VITAMINA D3 K2",
    precioCosto: "",
    pvp: "€25,00",
    clasificacionFuncionPrincipal: "SUPLEMENTO",
    categoriaPorPatologia: "BIENESTAR",
    subcategoriaPorPatologia: "Salud Ósea e Inmunidad",
    titulo: "VITAMINA D3 K2",
    subtitulo: "Soporte Óseo Avanzado",
    subtituloComplemento: "COMBINACIÓN D3 Y K2 PARA ÓPTIMA ABSORCIÓN DE CALCIO: Fija el calcio correctamente en los huesos.",
    textoDePresentacionCta: "Huesos Fuertes. Optimiza absorción de calcio. ¡Inmunidad clave!S",
    productosAsociadosSugeridos: "MAGNAT, VITAMINA C, OMEGA 3",
    imagenes: [],
    destacado: false
  }
];