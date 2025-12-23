import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";

export default function TeamSection() {

    const team = [
        {
          name: "Sandra",
          role: "Nutricionista Principal",
          image: team1,
          bio: "Hola, soy Sandra, naturópata, y mi misión es acompañarte en tu viaje personal hacia la salud y el bienestar.",
          fullDescription: "Hola, soy Sandra, naturópata, y mi misión es acompañarte en tu viaje personal hacia la salud y el bienestar. Utilizo la kinesiología y las Flores de Bach para ayudarte a conectar con tu cuerpo y a manejar el estrés y la ansiedad. Con un enfoque en la nutrición naturista, te enseño a usar los alimentos como medicina, fortaleciendo tu cuerpo de forma inteligente. Mi objetivo es que te sientas mejor, más fuerte y en control de tu bienestar. Si estás listo para empezar, estoy aquí para guiarte en cada paso.",
          certificaciones: ["Máster en Nutrición Holística", "Certificación en Fitoterapia", "Especialista en Microbiota Intestinal"],
          
        },
        {
          name: "Laura",
          role: "Coach de Bienestar",
          image: team2,
          bio: "Hola, soy Laura. Mi misión es guiarte hacia una vida de equilibrio y felicidad, cuidando tu cuerpo y mente desde la raíz.",
          fullDescription: "Hola, soy Laura. Mi misión es guiarte hacia una vida de equilibrio y felicidad, cuidando tu cuerpo y mente desde la raíz. Logramos esta transformación con un enfoque integral, combinando el poder de la herbodietética y la nutricosmética. Utilizo los mejores ingredientes naturales para crear un plan 100% personalizado que se adapte a tus necesidades. Veo la evolución de mis clientes, cómo recuperan su bienestar, aumentan su confianza y logran sus objetivos, es mi mayor recompensa. Es un privilegio ser parte de su proceso. Te invito a iniciar tu camino hacia una vida más sana y auténtica.",
          certificaciones: ["Coach de Salud Certificada", "Técnico Superior en Dietética", "Especialista en Mindfulness y Reducción del Estrés"],
          
        },
      ];

    return (
        <section className="py-24 md:py-2 bg-background"> {/* Ajustar padding */}
        <div className="container mx-auto px-4">
<div className="text-center mb-12 md:mb-16 relative p-6 md:p-10 animate-fade-in">
  {/* Título principal */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-5 tracking-tight">
    Nuestro Equipo
  </h2>

  {/* Línea decorativa */}
  <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-secondary mx-auto mb-4 rounded-full" />

  {/* Subtítulo */}
  <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto">
    Dos hermanas, dos semblanzas para tu bienestar
  </p>
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
    )
    
}