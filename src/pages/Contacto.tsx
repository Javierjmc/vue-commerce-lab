import React from "react";
import Layout from "@/layouts/Layout";
import ContactForm from "@/components/ContactForm";

const Contacto = () => {
  return (
    <Layout>
      <section className="bg-background">
        <div className="container mx-auto">
          <div className="">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
