// import { useEffect, useRef, useState } from "react";

// export default function CustomCursor() {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);
//   const [hovering, setHovering] = useState(false);

//   useEffect(() => {
//     const dot = dotRef.current;
//     const ring = ringRef.current;
//     let mouseX = 0, mouseY = 0;
//     let ringX = 0, ringY = 0;
//     let animId;

//     const onMouseMove = (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//       if (dot) {
//         dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
//       }
//     };

//     const animate = () => {
//       ringX += (mouseX - ringX) * 0.12;
//       ringY += (mouseY - ringY) * 0.12;
//       if (ring) {
//         ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
//       }
//       animId = requestAnimationFrame(animate);
//     };

//     const onMouseOver = (e) => {
//       if (
//         e.target.tagName === "A" ||
//         e.target.tagName === "BUTTON" ||
//         e.target.closest("a") ||
//         e.target.closest("button") ||
//         e.target.classList.contains("filter-pill") ||
//         e.target.classList.contains("project-card")
//       ) {
//         setHovering(true);
//       } else {
//         setHovering(false);
//       }
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseover", onMouseOver);
//     animId = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseover", onMouseOver);
//       cancelAnimationFrame(animId);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={dotRef} className="cursor-dot" />
//       <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
//     </>
//   );
// }

// Diamond Cursor — CustomCursor.jsx
// Diamond Cursor — CustomCursor.jsx
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const curRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;

    const pulse = document.createElement("div");
    Object.assign(pulse.style, {
      position: "fixed",
      borderRadius: "50%",
      background: "#00ff8844",
      pointerEvents: "none",
      zIndex: "9998",
      width: "0",
      height: "0",
      transform: "translate(-50%, -50%)",
    });
    document.body.appendChild(pulse);

    const firePulse = (x, y) => {
      Object.assign(pulse.style, { left: x + "px", top: y + "px", animation: "none" });
      void pulse.offsetWidth;
      pulse.style.animation = "dpulse 0.4s ease-out forwards";
    };

    // Flag para saber si estamos arrastrando el scrollbar
    let draggingScrollbar = false;

    const onMove = e => {
      // Mientras arrastra el scrollbar, no mover ni mostrar el cursor
      if (draggingScrollbar || !cur) return;
      cur.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const onDown = e => {
      // Si el click ocurre más allá del ancho visible del documento, es el scrollbar.
      // document.documentElement.clientWidth excluye el scrollbar, e.clientX lo incluye.
      const onScrollbar = e.clientX >= document.documentElement.clientWidth;
      if (onScrollbar) {
        draggingScrollbar = true;
        if (cur) cur.style.opacity = "0";
        return;
      }
      firePulse(e.clientX, e.clientY);
    };

    const onUp = () => {
      if (draggingScrollbar) {
        draggingScrollbar = false;
        if (cur) cur.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.removeChild(pulse);
    };
  }, []);

  return (
    <>
      <div ref={curRef} style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 9999,
        width: 12, height: 12,
        transition: "opacity 0.15s ease",
      }}>
        <div style={{
          width: 12, height: 12,
          background: "#00ff88",
          clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
          boxShadow: "0 0 7px #00ff88",
        }} />
      </div>
      <style>{`
        * { cursor: none !important; }
        @keyframes dpulse {
          0%   { width: 0;    height: 0;    opacity: .85; }
          100% { width: 40px; height: 40px; opacity: 0;   }
        }
      `}</style>
    </>
  );
}