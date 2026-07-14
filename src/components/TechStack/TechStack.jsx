import { techStack } from "../../data/techStack";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function TechStack() {
  const ref = useScrollReveal();

  return (
    <section className="section" id="tech" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-bg-num">04</div>
      <div className="container">
        <div className="section-header fade-in-up" ref={ref}>
          <span className="section-num">03 — tecnologías</span>
          <h2 className="section-title">
            Mi <span>stack</span>
          </h2>
        </div>

        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <TechItem key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechItem({ tech, index }) {
  const ref = useScrollReveal(0.05);

  return (
    <div
      className="tech-item fade-in-up"
      ref={ref}
      style={{ transitionDelay: `${index * 0.04}s` }}
    >
      <span className="tech-item-icon">{tech.icon}</span>
      <div className="tech-item-name">{tech.name}</div>
      <div className="tech-item-category">{tech.category}</div>
    </div>
  );
}
