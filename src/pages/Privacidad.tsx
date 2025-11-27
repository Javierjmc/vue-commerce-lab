import Layout from "@/layouts/Layout";

const Privacidad = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Política de Privacidad</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            En Vitasfera, nos comprometemos a proteger su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos su información personal cuando visita nuestro sitio web o utiliza nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Información que Recopilamos</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, dirección postal y número de teléfono, cuando realiza una compra, se suscribe a nuestro boletín o se pone en contacto con nosotros.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            También podemos recopilar automáticamente cierta información sobre su dispositivo y su interacción con nuestro sitio web, incluyendo su dirección IP, tipo de navegador, páginas visitadas y tiempos de acceso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cómo Utilizamos Su Información</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 ml-4">
            <li>Procesar sus pedidos y gestionar su cuenta.</li>
            <li>Comunicarnos con usted sobre sus pedidos y consultas.</li>
            <li>Enviarle boletines y ofertas promocionales (si ha dado su consentimiento).</li>
            <li>Mejorar nuestros productos y servicios.</li>
            <li>Personalizar su experiencia en nuestro sitio web.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Compartir Su Información</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio (por ejemplo, procesamiento de pagos, envío de productos), siempre bajo estrictos acuerdos de confidencialidad.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Sus Derechos</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Usted tiene derecho a acceder, corregir o eliminar su información personal. También puede oponerse al procesamiento de sus datos o solicitar la limitación de su uso. Para ejercer estos derechos, contáctenos a través de [correo electrónico de contacto].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cambios a Esta Política</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cualquier cambio publicando la nueva política en esta página.
          </p>
        </section>

        <section>
          <p className="text-lg text-gray-700 leading-relaxed">
            Última actualización: 27 de noviembre de 2025.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Privacidad;
