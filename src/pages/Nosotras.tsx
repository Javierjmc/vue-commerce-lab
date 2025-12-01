import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, ChevronDown, Eye } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import Layout from "@/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/lib/faqs";
import LocationMap from "@/components/LocationMap";
// Eliminada la importación de '@react-google-maps/api'

const Nosotras = () => {
  const values = [
    {
      icon: Heart,
      title: "Pasión por la Salud",
      description: "Creemos en el poder transformador de la nutrición natural para mejorar vidas",
    },
    {
      icon: Target,
      title: "Compromiso con la Calidad",
      description: "Solo trabajamos con los mejores ingredientes naturales y procesos certificados",
    },
    {
      icon: Users,
      title: "Enfoque en las Personas",
      description: "Cada cliente es único y merece atención personalizada para alcanzar sus metas",
    },
  ];

  const team = [
    {
      name: "Sandra",
      role: "Nutricionista Principal",
      image: team1,
      bio: "Hola, soy Sandra, naturópata, y mi misión es acompañarte en tu viaje personal hacia la salud y el bienestar.",
      fullDescription: "Hola, soy Sandra, naturópata, y mi misión es acompañarte en tu viaje personal hacia la salud y el bienestar. Utilizo la kinesiología y las Flores de Bach para ayudarte a conectar con tu cuerpo y a manejar el estrés y la ansiedad. Con un enfoque en la nutrición naturista, te enseño a usar los alimentos como medicina, fortaleciendo tu cuerpo de forma inteligente. Mi objetivo es que te sientas mejor, más fuerte y en control de tu bienestar. Si estás listo para empezar, estoy aquí para guiarte en cada paso.",
      certificaciones: ["Máster en Nutrición Holística", "Certificación en Fitoterapia", "Especialista en Microbiota Intestinal"],
      redesSociales: { instagram: "#", linkedin: "#" },
    },
    {
      name: "Laura",
      role: "Coach de Bienestar",
      image: team2,
      bio: "Hola, soy Laura. Mi misión es guiarte hacia una vida de equilibrio y felicidad, cuidando tu cuerpo y mente desde la raíz.",
      fullDescription: "Hola, soy Laura. Mi misión es guiarte hacia una vida de equilibrio y felicidad, cuidando tu cuerpo y mente desde la raíz. Logramos esta transformación con un enfoque integral, combinando el poder de la herbodietética y la nutricosmética. Utilizo los mejores ingredientes naturales para crear un plan 100% personalizado que se adapte a tus necesidades. Veo la evolución de mis clientes, cómo recuperan su bienestar, aumentan su confianza y logran sus objetivos, es mi mayor recompensa. Es un privilegio ser parte de su proceso. Te invito a iniciar tu camino hacia una vida más sana y auténtica.",
      certificaciones: ["Coach de Salud Certificada", "Técnico Superior en Dietética", "Especialista en Mindfulness y Reducción del Estrés"],
      redesSociales: { twitter: "#", facebook: "#" },
    },
  ];

  // Eliminada la constante `faqs` local

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#053f29] via-[#3e9504] to-[#1f6f12] py-24 md:py-32 text-white overflow-hidden"> {/* Ajustar padding */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 320">
            <path fill="white" fillOpacity="0.1" d="M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,133.3C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative container mx-auto px-4 max-w-3xl text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6"> {/* Ajustar tamaño del título */}
            Nuestra Historia
          </h1>
          <p className="text-lg md:text-2xl leading-relaxed mb-6 md:mb-8"> {/* Ajustar tamaño y margen del párrafo */}
            Herbolario Vitasfera nació en 2010, impulsada por la visión de dos hermanas apasionadas por la nutrición natural y el bienestar integral.
          </p>
          <button className="px-10 py-3 text-lg md:px-12 md:py-4 md:text-xl font-bold bg-white text-[#053f29] rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"> {/* Ajustar padding y tamaño del texto del botón */}
            Descubre Nuestra Tienda
          </button>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-[#053f29]/10 via-[#3e9504]/10 to-[#1f6f12]/10"> {/* Ajustar padding */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-primary mb-10 md:mb-16 animate-fade-in"> {/* Ajustar tamaño del título */}
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto"> {/* Ajustar grid y gap */}
            {values.map((value, idx) => (
              <Card
                key={idx}
                className="p-6 md:p-10 text-center bg-white shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="mx-auto mb-3 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#053f29] via-[#3e9504] to-[#1f6f12] flex items-center justify-center text-white text-2xl md:text-3xl"> {/* Ajustar tamaño del icono y texto */}
                  <value.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{value.title}</h3> {/* Ajustar tamaño del título */}
                <p className="text-sm md:text-base text-muted-foreground">{value.description}</p> {/* Ajustar tamaño del párrafo */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-background"> {/* Ajustar padding */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 bg-primary text-white p-6 md:p-8 rounded-3xl shadow-lg animate-fade-in"> {/* Ajustar padding y margen */}
            <h2 className="text-3xl text-white md:text-5xl font-extrabold text-primary mb-2 md:mb-3">Nuestro Equipo</h2> {/* Ajustar tamaño del título */}
            <p className="text-base md:text-lg text-muted-foreground">Dos hermanas, dos semblanzas para tu bienestar</p> {/* Ajustar tamaño del párrafo */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto"> {/* Ajustar gap */}
            {team.map((member, idx) => (
              <Card
                key={idx}
                className="overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-105 group"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 md:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 md:p-10 bg-white relative"> {/* Ajustar padding */}
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{member.name}</h3> {/* Ajustar tamaño del título */}
                  <p className="text-[#3e9504] font-semibold mb-3 md:mb-4 text-base md:text-lg">{member.role}</p> {/* Ajustar tamaño del párrafo */}
                  <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base">{member.bio}</p> {/* Ajustar tamaño del párrafo */}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-base py-2">
                        <Eye className="h-4 w-4 mr-2" /> Ver más
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm sm:max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8"> {/* Ajustar max-width y padding */}
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{member.name} - {member.role}</DialogTitle> {/* Ajustar tamaño del título */}
                        <DialogDescription>
                          <img src={member.image} alt={member.name} className="w-full h-auto rounded-lg mb-4 object-cover" />
                          <p className="text-muted-foreground mb-4 text-base">{member.fullDescription}</p> {/* Ajustar tamaño del párrafo */}
                          {member.certificaciones && member.certificaciones.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-primary mb-2 text-lg">Certificaciones:</h4> {/* Ajustar tamaño del título */}
                              <ul className="list-disc list-inside text-muted-foreground text-base">
                                {member.certificaciones.map((cert, certIdx) => (
                                  <li key={certIdx}>{cert}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {member.redesSociales && Object.keys(member.redesSociales).length > 0 && (
                            <div>
                              <h4 className="font-semibold text-primary mb-2 text-lg">Redes Sociales:</h4> {/* Ajustar tamaño del título */}
                              <div className="flex gap-3 md:gap-4">
                                {Object.entries(member.redesSociales).map(([platform, url]) => (
                                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline capitalize text-base">
                                    {platform}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas-frecuentes" className="py-24 md:py-32 bg-gradient-to-r from-[#053f29]/10 via-[#3e9504]/10 to-[#1f6f12]/10 scroll-mt-20"> {/* Ajustar padding */}
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-primary mb-12 md:mb-16 animate-fade-in"> {/* Ajustar tamaño del título */}
            Preguntas Frecuentes
          </h2>
          <Accordion type="multiple" className="w-full space-y-4 md:space-y-6"> {/* Ajustar espaciado */}
            {FAQ_DATA.map((category, catIdx) => (
              <AccordionItem key={catIdx} value={`item-${catIdx}`} className="rounded-2xl md:rounded-3xl bg-white shadow-lg overflow-hidden border-none"> {/* Ajustar rounded */}
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-lg md:text-xl font-semibold text-primary"> {/* Ajustar padding y tamaño del texto */}
                  {category.title}
                </AccordionTrigger>
                <AccordionContent className="pb-3 px-4 md:pb-4 md:px-6"> {/* Ajustar padding */}
                  <div className="space-y-3 md:space-y-4">
                    {category.faqs.map((faq, faqIdx) => (
                      <Card
                        key={faqIdx}
                        className="p-3 md:p-4 bg-gray-50 shadow-sm rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer"> {/* Ajustar padding y rounded */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-semibold">{faq.question}</h3> {/* Ajustar tamaño del título */}
                          <ChevronDown
                            className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${openIndex === `${catIdx}-${faqIdx}` ? "rotate-180" : ""}`}
                          />
                        </div>
                        <div
                          className={`mt-2 md:mt-3 text-muted-foreground transition-all duration-500 overflow-hidden ${openIndex === `${catIdx}-${faqIdx}` ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <p className="text-sm md:text-base">{faq.answer}</p> {/* Ajustar tamaño del párrafo */}
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Google Maps Static Section */}
      <section className="py-12 md:py-16 bg-background"> {/* Ajustar padding */}
        <div className="container mx-auto px-4 max-w-4xl">
          <LocationMap />
        </div>
      </section>
      

    </Layout>
  );
};

export default Nosotras;
