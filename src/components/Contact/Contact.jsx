import { Mail, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LINKS = [
  {
    label: "GitHub",
    value: "NicoTecno",
    href: "https://github.com/NicoTecno",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "nicolás-domínguez",
    href: "https://www.linkedin.com/in/nicol%C3%A1s-dom%C3%ADnguez-918089271/",
    Icon: LinkedinIcon,
  },
  {
    label: "Email",
    value: "Enviame un mensaje",
    href: "mailto:nicotecno@proton.me",
    Icon: Mail,
  },
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section className="section" id="contact" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-bg-num">06</div>
      <div className="container">
        <div className="contact-inner">
          {/* Left */}
          <div className="fade-in-up" ref={ref}>
            <span className="section-num">05 — contacto</span>
            <h2 className="contact-tagline">
              ¿Trabajamos <span>juntos</span>?
            </h2>
            <p className="contact-sub">
              Estoy abierto a oportunidades laborales, freelance y
              colaboraciones. Si tenés un proyecto interesante o simplemente
              querés charlar de tecnología, no dudes en escribirme.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--accent-green)",
              letterSpacing: "0.08em",
            }}>
              <span style={{
                width: 7,
                height: 7,
                background: "var(--accent-green)",
                borderRadius: "50%",
                animation: "blink 1.2s step-end infinite",
                display: "inline-block",
              }} />
              Disponible para oportunidades
            </div>
          </div>

          {/* Right: Links */}
          <div>
            <div className="contact-links">
              {LINKS.map((link, i) => (
                <ContactLink key={link.label} link={link} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ link, index }) {
  const ref = useScrollReveal(0.1);
  const { Icon } = link;

  return (
    <a
      className="contact-link fade-in-up"
      href={link.href}
      target={link.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s`, textDecoration: "none" }}
    >
      <span className="contact-link-icon">
        <Icon size={20} />
      </span>
      <div className="contact-link-info">
        <div className="contact-link-label">{link.label}</div>
        <div className="contact-link-value">{link.value}</div>
      </div>
      <ArrowRight size={16} className="contact-link-arrow" />
    </a>
  );
}
