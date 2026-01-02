import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

export const RedesSociales = () => {
    return (
        <div className="flex items-center gap-4 mb-6">
            <a href="https://www.facebook.com/p/Herbolario-Vitasfera-100063562510969/" target="_blank" aria-label="facebook" className="hover:text-secondary transition">
              <Facebook className="h-12 w-12" />
            </a>
            <a href="https://www.instagram.com/herbolariovitasfera/?hl=es" target="_blank" aria-label="instagram" className="hover:text-secondary transition">
              <Instagram className="h-12 w-12" />
            </a>
            <a href="https://www.youtube.com/@Naturaldoshermanas" target="_blank" aria-label="youtube" className="hover:text-secondary transition">
              <Youtube className="h-12 w-12" />
            </a>
          </div>
    )
}