import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash en la URL (ej. /nosotras#preguntas-frecuentes),
    // no hacemos scroll al inicio, el navegador se encargará del ancla.
    if (hash === "") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Dependencias: pathname para cambios de ruta, hash para la excepción

  return null; // Este componente no renderiza nada visible
};

export default ScrollToTop;
