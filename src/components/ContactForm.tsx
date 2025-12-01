import { useState } from "react";

const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contáctanos
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2 md:mt-3">
            Completa el formulario y un miembro de nuestro equipo se pondrá en contacto contigo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            shadow-xl shadow-gray-300/40
            border border-gray-200
            rounded-2xl
            p-6 md:p-10
            grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6
          "
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-semibold text-gray-800 text-sm md:text-base">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Tu nombre completo"
              className="
                px-3 py-2 md:px-4 md:py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900 text-sm md:text-base
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-semibold text-gray-800 text-sm md:text-base">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="ejemplo@correo.com"
              className="
                px-3 py-2 md:px-4 md:py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900 text-sm md:text-base
              "
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-semibold text-gray-800 text-sm md:text-base">Teléfono</label>
            <input
              type="tel"
              required
              placeholder="+58 000-0000000"
              className="
                px-3 py-2 md:px-4 md:py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900 text-sm md:text-base
              "
            />
          </div>

          {/* Select */}
          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-semibold text-gray-800 text-sm md:text-base">Motivo de la consulta</label>
            <select
              required
              className="
                px-3 py-2 md:px-4 md:py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900 text-sm md:text-base
              "
            >
              <option value="">Seleccione una opción</option>
              <option>Consultoría Financiera</option>
              <option>Optimización de Procesos</option>
              <option>Estrategias de Negocio</option>
              <option>Asesoría General</option>
            </select>
          </div>

          {/* Mensaje */}
          <div className="md:col-span-2 flex flex-col gap-1 md:gap-2">
            <label className="font-semibold text-gray-800 text-sm md:text-base">Mensaje</label>
            <textarea
              rows="4"
              placeholder="Escribe tu mensaje..."
              required
              className="
                px-3 py-2 md:px-4 md:py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900 text-sm md:text-base
              "
            ></textarea>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="
              md:col-span-2 w-full mt-3 md:mt-4 py-3 md:py-4 text-base md:text-lg font-bold text-white rounded-xl
              bg-gradient-to-r from-primary to-green-600
              shadow-lg hover:shadow-xl
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
            "
          >
            Enviar Solicitud
          </button>

          {/* Mensaje de éxito */}
          {sent && (
            <p className="md:col-span-2 text-center mt-3 md:mt-4 py-2 md:py-3 bg-green-100 text-green-700 font-semibold rounded-xl animate-fadeIn text-sm md:text-base">
              ¡Tu mensaje ha sido enviado con éxito!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
