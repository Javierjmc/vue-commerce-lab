import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Upload, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ShareStoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    story: "",
    transformation: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Gracias por compartir tu historia!",
      description: "Revisaremos tu testimonio y te contactaremos pronto.",
    });
    setFormData({ name: "", email: "", story: "", transformation: "", acceptTerms: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Tu nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="María García"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Tu correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="maria@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="transformation" className="block text-sm font-medium text-foreground mb-2">
          ¿Cuál fue tu transformación principal?
        </label>
        <select
          id="transformation"
          name="transformation"
          value={formData.transformation}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        >
          <option value="">Selecciona una opción</option>
          <option value="energia">Más energía y vitalidad</option>
          <option value="digestion">Mejor digestión</option>
          <option value="peso">Control de peso</option>
          <option value="sueno">Mejor calidad de sueño</option>
          <option value="inmunidad">Sistema inmune fortalecido</option>
          <option value="piel">Piel más saludable</option>
          <option value="otro">Otra transformación</option>
        </select>
      </div>

      <div>
        <label htmlFor="story" className="block text-sm font-medium text-foreground mb-2">
          Cuéntanos tu historia *
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={5}
          value={formData.story}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
          placeholder="Comparte cómo los productos de Vitasfera han transformado tu vida y bienestar..."
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Mínimo 50 caracteres. Tu historia puede inspirar a otros.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
        <Upload className="w-5 h-5 text-secondary flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">¿Tienes fotos o video?</p>
          <p className="text-xs text-muted-foreground">
            Pronto podrás subir archivos. Por ahora puedes enviárnoslos por email.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 rounded border-border text-secondary focus:ring-secondary"
        />
        <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
          Acepto que mi historia pueda ser compartida en la web y redes sociales de Vitasfera para inspirar a otros en su camino hacia el bienestar.
        </label>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full">
        <Heart className="w-5 h-5" />
        Compartir mi historia
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ShareStoryForm;
