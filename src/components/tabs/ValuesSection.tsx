import { Card } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";

export default function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "Pasión por la Salud",
      description:
        "Creemos en el poder transformador de la nutrición natural para mejorar vidas",
    },
    {
      icon: Target,
      title: "Compromiso con la Calidad",
      description:
        "Solo trabajamos con los mejores ingredientes naturales y procesos certificados",
    },
    {
      icon: Users,
      title: "Enfoque en las Personas",
      description:
        "Cada cliente es único y merece atención personalizada para alcanzar sus metas",
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-gradient-to-r from-[#053f29]/10 via-[#3e9504]/10 to-[#1f6f12]/10">
      {" "}
      {/* Ajustar padding */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-primary mb-10 md:mb-16 animate-fade-in">
          {" "}
          {/* Ajustar tamaño del título */}
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {" "}
          {/* Ajustar grid y gap */}
          {values.map((value, idx) => (
            <Card
              key={idx}
              className="p-6 md:p-10 text-center bg-white shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="mx-auto mb-3 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#053f29] via-[#3e9504] to-[#1f6f12] flex items-center justify-center text-white text-2xl md:text-3xl">
                {" "}
                {/* Ajustar tamaño del icono y texto */}
                <value.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                {value.title}
              </h3>{" "}
              {/* Ajustar tamaño del título */}
              <p className="text-sm md:text-base text-muted-foreground">
                {value.description}
              </p>{" "}
              {/* Ajustar tamaño del párrafo */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
