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
    <section className="w-full py-20 px-4 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Contáctanos
          </h2>
          <p className="text-lg text-gray-600 mt-3">
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
            p-10
            grid grid-cols-1 md:grid-cols-2 gap-6
          "
        >
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Tu nombre completo"
              className="
                px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="ejemplo@correo.com"
              className="
                px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900
              "
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Teléfono</label>
            <input
              type="tel"
              required
              placeholder="+58 000-0000000"
              className="
                px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900
              "
            />
          </div>

          {/* Select */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Motivo de la consulta</label>
            <select
              required
              className="
                px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900
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
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Mensaje</label>
            <textarea
              rows="4"
              placeholder="Escribe tu mensaje..."
              required
              className="
                px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
                focus:ring-4 focus:ring-primary/30 focus:border-primary
                transition-all duration-300 text-gray-900
              "
            ></textarea>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="
              md:col-span-2 w-full mt-4 py-4 text-lg font-bold text-white rounded-xl
              bg-gradient-to-r from-primary to-green-600
              shadow-lg hover:shadow-xl
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
            "
          >
            Enviar Solicitud
          </button>

          {/* Mensaje de éxito */}
          {sent && (
            <p className="md:col-span-2 text-center mt-4 py-3 bg-green-100 text-green-700 font-semibold rounded-xl animate-fadeIn">
              ¡Tu mensaje ha sido enviado con éxito!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
