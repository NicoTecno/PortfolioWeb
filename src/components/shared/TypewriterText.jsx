import { useEffect, useState } from "react";

const ROLES = [
  "Desarrollador Full Stack",
  "Estudiante de FIUBA",
  "Backend Developer",
  "Mobile Developer",
  "Apasionado por la tecnología",
];

export default function TypewriterText() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        } else {
          // Pause at end before deleting
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, deleting ? 45 : 75);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <div className="hero-roles">
      <span className="typed-text">{displayed}</span>
      <span className="cursor-blink" />
    </div>
  );
}
