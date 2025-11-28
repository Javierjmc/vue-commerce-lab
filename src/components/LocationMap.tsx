
import React from "react";

const LocationMap = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-12 animate-fade-in">📍 Nuestra ubicación</h2>
      <p className="text-center text-muted-foreground">
        C/ Ronda Ancha, 17<br />
        28805 Alcalá de Henares (Madrid)
      </p>
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.360184281487!2d-3.359779023463544!3d40.48197907142305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229d7c6a5b2e7%3A0x8b78529d5bb0a8e4!2sC.%20Ronda%20Ancha%2C%2017%2C%2028805%20Alcal%C3%A1%20de%20Henares%2C%20Madrid!5e0!3m2!1ses!2ses!4v1698765432100!5m2!1ses!2ses"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationMap;
