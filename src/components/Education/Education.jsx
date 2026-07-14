import { education } from "../../data/techStack";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GraduationCap, BookOpen } from "lucide-react";

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section className="section" id="education">
      <div className="section-bg-num">05</div>
      <div className="container">
        <div className="section-header fade-in-up" ref={ref}>
          <span className="section-num">04 — educación</span>
          <h2 className="section-title">
            Mi <span>formación</span>
          </h2>
        </div>

        <div className="education-timeline">
          {education.map((item, i) => (
            <EduCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ item, index }) {
  const ref = useScrollReveal(0.1);

  return (
    <div
      className="edu-card fade-in-up"
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="edu-card-top">
        <span className="edu-badge">
          {item.type === "Universidad" ? (
            <GraduationCap size={10} style={{ marginRight: 4 }} />
          ) : (
            <BookOpen size={10} style={{ marginRight: 4 }} />
          )}
          {item.type}
        </span>
        <span className="edu-year">{item.year}</span>
      </div>
      <div className="edu-institution">{item.institution}</div>
      <div className="edu-title">{item.title}</div>

      {item.status === "cursando" && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent-green)",
            marginTop: "0.75rem",
            letterSpacing: "0.08em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "var(--accent-green)",
              borderRadius: "50%",
              animation: "blink 1.2s step-end infinite",
              display: "inline-block",
            }}
          />
          En curso
        </div>
      )}
    </div>
  );
}
