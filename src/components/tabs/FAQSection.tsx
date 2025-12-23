import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_DATA } from "@/lib/faqs";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="preguntas-frecuentes"
      className="py-2 md:py-4 bg-gradient-to-r from-white via-white to-white scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">


        <div className="text-center mb-12 md:mb-16 relative p-6 md:p-10 animate-fade-in">
  {/* Título principal */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-5 tracking-tight">
    Preguntas Frecuentes
  </h2>

  {/* Línea decorativa */}
  <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-secondary mx-auto rounded-full" />


</div>

        {/* Accordion */}
        <Accordion type="multiple" className="w-full space-y-2 md:space-y-4 pb-8">
          {FAQ_DATA.map((category, catIdx) => (
            <AccordionItem
              key={catIdx}
              value={`item-${catIdx}`}
              className="rounded-3xl bg-white shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <AccordionTrigger
                className="px-5 py-4 md:px-6 md:py-5 text-left text-lg md:text-xl font-semibold text-gray-900 flex items-center justify-between cursor-pointer hover:text-green-600 transition-colors duration-300"
              >
                {category.title}
              </AccordionTrigger>

              <AccordionContent className="pb-4 md:pb-6 px-5 md:px-6">
                <div className="space-y-3 md:space-y-4">
                  {category.faqs.map((faq, faqIdx) => {
                    const faqKey = `${catIdx}-${faqIdx}`;
                    const isOpen = openIndex === faqKey;

                    return (
                      <Card
                        key={faqIdx}
                        className="p-4 md:p-5 bg-gray-50 shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => toggleFAQ(faqKey)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-medium text-gray-800">{faq.question}</h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-green-600" : ""
                            }`}
                          />
                        </div>
                        <div
                          className={`mt-3 text-gray-700 overflow-hidden transition-all duration-500 ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-sm md:text-base">{faq.answer}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
