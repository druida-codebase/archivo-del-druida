import Link from "next/link";
import { SiYoutube, SiBandcamp, SiInstagram } from "react-icons/si"; 
import Logo from "./Logo"; 

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Logo className="h-8 w-auto fill-white mb-4" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
            El Archivo del Druida
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-8">
          <SocialIcon 
            href="https://www.youtube.com/@archivodeldruida" 
            icon={SiYoutube} 
            label="YouTube"
          />
          <SocialIcon 
            href="https://eltransparente.bandcamp.com" 
            icon={SiBandcamp} 
            label="Bandcamp"
          />
          <SocialIcon 
            href="#" 
            icon={SiInstagram} 
            label="Instagram"
          />
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            © {currentYear} Todos los derechos reservados.
          </p>
          
          <nav className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-500">
            <Link href="/sobre-esto" className="hover:text-white transition-colors">Sobre esto</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-all duration-300 transform hover:scale-110"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}