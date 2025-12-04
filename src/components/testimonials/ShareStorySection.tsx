import ShareStoryForm from "./ShareStoryForm";
import { Leaf, Star, Shield } from "lucide-react";

const ShareStorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              Tu voz importa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Tienes una historia de transformación?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              En Vitasfera creemos en el poder de las historias. Tu experiencia puede ser 
              la inspiración que alguien necesita para comenzar su camino hacia el bienestar.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Inspira a otros</h3>
                  <p className="text-sm text-muted-foreground">
                    Tu historia puede motivar a miles de personas a mejorar su salud de forma natural.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Recibe reconocimiento</h3>
                  <p className="text-sm text-muted-foreground">
                    Las historias destacadas recibirán un kit especial de productos Vitasfera.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Privacidad garantizada</h3>
                  <p className="text-sm text-muted-foreground">
                    Solo publicaremos tu historia con tu consentimiento explícito.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-testimonial animate-scale-in">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Comparte tu experiencia
              </h3>
              <p className="text-sm text-muted-foreground">
                Completa el formulario y únete a nuestra comunidad de bienestar.
              </p>
            </div>
            <ShareStoryForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareStorySection;
