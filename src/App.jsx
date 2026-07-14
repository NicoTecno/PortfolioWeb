import "./index.css";
import CustomCursor from "./components/shared/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import TechStack from "./components/TechStack/TechStack";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <TechStack />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
