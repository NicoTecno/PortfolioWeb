import { useEffect, useState } from "react";

const LINES = [
  { cmd: "whoami", output: [{ key: "name", value: "Nicolás Domínguez" }] },
  {
    cmd: "cat about.json",
    output: [
      { key: "carrera", value: "Lic. en Análisis de Sistemas" },
      { key: "facultad", value: "FIUBA — UBA" },
      { key: "estado", value: "Cursando activamente" },
    ],
  },
  {
    cmd: "echo $STATUS",
    output: [{ key: "disponibilidad", value: "Abierto a oportunidades ✓" }],
  },
  {
    cmd: "ls idiomas/",
    output: [
      { key: "español", value: "nativo" },
      { key: "inglés", value: "B1 (intermedio)" },
    ],
  },
  {
    cmd: "cat intereses.txt",
    output: [
      { key: "focus", value: "Backend · APIs · Sistemas distribuidos" },
      { key: "aprendiendo", value: "Arquitecturas cloud & microservicios" },
    ],
  },
];

export default function AnimatedTerminal() {
  const [step, setStep] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [phase, setPhase] = useState("typing"); // typing | output | done

  const current = LINES[step % LINES.length];

  useEffect(() => {
    if (phase === "typing") {
      if (typedCmd.length < current.cmd.length) {
        const t = setTimeout(() => {
          setTypedCmd(current.cmd.slice(0, typedCmd.length + 1));
        }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setShowOutput(true);
          setPhase("output");
        }, 350);
        return () => clearTimeout(t);
      }
    }

    if (phase === "output") {
      const t = setTimeout(() => {
        setPhase("done");
      }, 1800);
      return () => clearTimeout(t);
    }

    if (phase === "done") {
      const t = setTimeout(() => {
        setTypedCmd("");
        setShowOutput(false);
        setPhase("typing");
        setStep((s) => s + 1);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [phase, typedCmd, current]);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="terminal-title">nicolas@portfolio:~</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-cmd"> {typedCmd}</span>
          {phase === "typing" && <span className="terminal-cursor-inline" />}
        </div>

        {showOutput &&
          current.output.map((item, i) => (
            <div key={i} className="terminal-output" style={{
              opacity: 0,
              animation: `fadeIn 0.3s ease ${i * 0.12}s forwards`
            }}>
              <span className="key">{item.key}</span>
              <span style={{ color: "var(--text-secondary)" }}>: </span>
              <span className="value">{item.value}</span>
            </div>
          ))}

        {phase === "done" && (
          <div className="terminal-line" style={{ marginTop: "0.5rem" }}>
            <span className="terminal-prompt">$</span>
            <span className="terminal-cursor-inline" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
