import { useState, useEffect, useCallback, memo } from "react";
import { ExternalLink, Folder, X } from "lucide-react";
import { projects, allTechFilters } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useScrollReveal();

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section className="section" id="projects">
      <div className="section-bg-num">03</div>
      <div className="container">
        <div className="section-header fade-in-up" ref={ref}>
          <span className="section-num">02 — proyectos</span>
          <h2 className="section-title">
            Lo que <span>construí</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="projects-filters">
          {allTechFilters.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              <span>{f}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

const ProjectCard = memo(function ProjectCard({ project, index, onSelect }) {
  const ref = useScrollReveal(0.1);
  const handleClick = useCallback(() => onSelect(project), [project, onSelect]);

  return (
    <div
      className="project-card fade-in-up"
      ref={ref}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="project-card-header">
        <Folder size={22} className="project-card-icon" />
        <div className="project-card-links" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <GithubIcon size={16} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" title="Live">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="project-card-year">{project.year}</div>
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">{project.description}</p>

      <div className="project-card-tech">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  );
});

function ProjectModal({ project, onClose }) {
  // Bloquea el scroll sin inyectar un <style> dinámico (evita layout reflow)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <>
      <div
        className="modal-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{project.title}</h2>
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-image-area">
              <div className="modal-image-placeholder">
                <Folder size={40} style={{ color: "var(--accent-green)", opacity: 0.4 }} />
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--accent-green)",
                  opacity: 0.5,
                  marginTop: "0.5rem",
                }}>
                  {"{ "}
                  {project.tech.slice(0, 3).join(" · ")}
                  {" }"}
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-dim)",
                  marginTop: "0.25rem",
                }}>
                  {project.year}
                </span>
              </div>
            </div>

            <p className="modal-desc">{project.description}</p>

            <div className="modal-tech">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            <div className="modal-actions">
              {project.github && (
                <a
                  className="btn-secondary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={14} />
                  Ver en GitHub
                </a>
              )}
              {project.live && (
                <a
                  className="btn-primary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  Ver en vivo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
