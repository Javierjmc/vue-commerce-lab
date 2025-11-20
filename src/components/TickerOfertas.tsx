import React, { useEffect, useRef } from "react";

const ofertas = [
  "🔥 50% de descuento en todos los productos",
  "🚚 Envío gratis en pedidos mayores a $50!",  
];

const TickerOfertas = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    // duplicamos contenido para scroll continuo
    ticker.innerHTML += ticker.innerHTML;
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-[#09573c] via-[#4fac05] to-[#2e901f] text-white font-bold py-6">
      <div
        ref={tickerRef}
        className="inline-block animate-scroll"
      >
        {ofertas.map((oferta, index) => (
          <span key={index} className="mr-10">
            {oferta}
          </span>
        ))}
      </div>

      <style >{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: inline-block;
          padding-left: 100%;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TickerOfertas;
