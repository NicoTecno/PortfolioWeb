import AnimatedTerminal from "../shared/AnimatedTerminal";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function About() {
  const ref = useScrollReveal();

  return (
    <section className="section" id="about">
      <div className="section-bg-num">02</div>
      <div className="container">
        <div className="section-header fade-in-up" ref={ref}>
          <span className="section-num">01 — sobre mí</span>
          <h2 className="section-title">
            Quién <span>soy</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* LEFT: Text */}
          <div className="about-text">
            <RevealParagraph delay={0}>
              Soy <strong>Nicolás Domínguez</strong>, estudiante de{" "}
              <strong>Licenciatura en Análisis de Sistemas</strong> en la{" "}
              <strong>Facultad de Ingeniería de la UBA</strong>. Me apasiona la
              programación y estar al tanto de las tecnologías emergentes.
            </RevealParagraph>

            <RevealParagraph delay={0.1}>
              Complementé mi formación con cursos intensivos de{" "}
              <strong>Desarrollo Web Full Stack</strong>,{" "}
              <strong>Desarrollo Mobile</strong> y{" "}
              <strong>Backend con Java</strong>. Siempre ansioso por aplicar mis
              habilidades técnicas en proyectos reales.
            </RevealParagraph>

            <RevealParagraph delay={0.2}>
              Me especializo en construir{" "}
              <span className="accent">APIs robustas</span>, sistemas escalables
              y aplicaciones modernas. Aplico principios{" "}
              <strong>SOLID</strong>, <strong>patrones de diseño</strong> y{" "}
              <strong>buenas prácticas</strong> en cada proyecto.
            </RevealParagraph>

            <div className="about-stats">
              <StatCard num="15+" label="Repos en GitHub" delay={0.25} />
              <StatCard num="4+" label="Años programando" delay={0.3} />
              <StatCard num="20+" label="Tecnologías" delay={0.35} />
              <StatCard num="B1" label="Inglés" delay={0.4} />
            </div>
          </div>

          {/* RIGHT: Terminal */}
          <div style={{ animationDelay: "0.2s" }}>
            <AnimatedTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealParagraph({ children, delay = 0 }) {
  const ref = useScrollReveal(0.1);
  return (
    <p
      className="fade-in-up"
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </p>
  );
}

function StatCard({ num, label, delay = 0 }) {
  const ref = useScrollReveal(0.1);
  return (
    <div
      className="about-stat fade-in-up"
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="about-stat-num">{num}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}
