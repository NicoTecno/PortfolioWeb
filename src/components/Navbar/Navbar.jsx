import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
          nico<span>.dev</span>
        </a>

        <ul className="navbar-links">
          {[
            { label: "sobre mí", id: "about" },
            { label: "proyectos", id: "projects" },
            { label: "tecnologías", id: "tech" },
            { label: "educación", id: "education" },
            { label: "contacto", id: "contact" },
          ].map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
