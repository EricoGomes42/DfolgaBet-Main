import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

const menuLinks = [
  { label: "Sobre o dfolga.com", href: "/sobre" },
  { label: "Promova sua Marca", href: "/anuncie" },
  { label: "Fale com a gente", href: "/contato" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Termos e Condições", href: "/termos" },
  { label: "Área do Colaborador", href: "https://dfolga.com/wp-admin/", external: true },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/dfolga", icon: <Facebook className="w-5 h-5" /> },
  { label: "X (Twitter)", href: "https://x.com/dfolga", icon: <XIcon /> },
  { label: "Instagram", href: "https://instagram.com/dfolga", icon: <Instagram className="w-5 h-5" /> },
  { label: "Pinterest", href: "https://pinterest.com/dfolga", icon: <PinterestIcon /> },
  { label: "YouTube", href: "https://youtube.com/@dfolga", icon: <Youtube className="w-5 h-5" /> },
  { label: "TikTok", href: "https://tiktok.com/@dfolga", icon: <TikTokIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com/company/dfolga", icon: <LinkedInIcon /> },
];

const UTIMEOFF_LOGO = "/assets/utimeoff-logo.png";

export default function FooterBlue() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#50c0cc" }}>
      <div className="container mx-auto px-4 py-5">
        {/* Linha 1: Copyright */}
        <div className="text-center mb-3">
          <p className="text-white text-xs">
            © Copyright {new Date().getFullYear()} &nbsp;|&nbsp; Todos os direitos reservados &nbsp;|&nbsp;{" "}
            <span className="font-bold text-white">dfolga.com</span> por{" "}
            <a
              href="https://eckoa-digital.ueniweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fdfd96")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              ecKOay
            </a>
            {" "}&nbsp;|&nbsp; CNPJ: 13.422.426/0001-85
          </p>
        </div>

        {/* Linha 2: Menu institucional */}
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 mb-3">
          {menuLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 6px" }}>•</span>
              )}
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fdfd96")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-white text-xs transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fdfd96")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </div>

        {/* Linha 3: Ícones sociais + uTimeOff */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center text-white transition-transform duration-200 hover:scale-125"
              style={{ width: "28px", height: "28px", opacity: 0.9 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
            >
              {s.icon}
            </a>
          ))}
          {/* uTimeOff logo */}
          <a
            href="https://utimeoff.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="uTimeOff"
            className="flex items-center justify-center transition-transform duration-200 hover:scale-125"
            style={{ width: "28px", height: "28px", opacity: 0.9 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
          >
            <img src={UTIMEOFF_LOGO} alt="uTimeOff" className="w-7 h-7 object-contain" />
          </a>
        </div>
      </div>
    </footer>
  );
}
