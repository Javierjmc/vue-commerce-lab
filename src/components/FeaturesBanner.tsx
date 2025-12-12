import { Truck, Shield, Heart } from "lucide-react";

const FeaturesBanner = () => {
  return (
    <section className="bg-secondary py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center text-secondary-foreground">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <Truck className="w-7 h-7 md:w-8 md:h-8" />
            <span className="font-semibold text-base md:text-lg">ENVÍOS GRATIS</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <Shield className="w-7 h-7 md:w-8 md:h-8" />
            <span className="font-semibold text-base md:text-lg">CALIDAD GARANTIZADA</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <Heart className="w-7 h-7 md:w-8 md:h-8" />
            <span className="font-semibold text-base md:text-lg">100% NATURAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
