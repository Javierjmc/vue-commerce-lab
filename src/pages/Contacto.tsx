import React from "react";
import Layout from "@/layouts/Layout";
import ContactForm from "@/components/ContactForm";

const Contacto = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
