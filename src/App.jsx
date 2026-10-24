import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Featured from "./components/Featured.jsx";
import RequestTrace from "./components/RequestTrace.jsx";
import OtherProjects from "./components/OtherProjects.jsx";
import Skills from "./components/Skills.jsx";
import Background from "./components/Background.jsx";
import Contact from "./components/Contact.jsx";
import { projects } from "./data/profile.js";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Featured project={projects[0]} id="work" />
        <Featured project={projects[1]} id="campusevents" />
        <RequestTrace />
        <OtherProjects />
        <Skills />
        <Background />
        <Contact />
      </main>
    </>
  );
}
