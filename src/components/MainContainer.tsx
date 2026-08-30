import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import setSplitText from "./utils/splitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1024 : false
  );

  useEffect(() => {
    const resizeHandler = () => {
      setIsDesktopView(window.innerWidth > 1024);
      setSplitText();
      ScrollTrigger.refresh();
    };
    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    // Mobile-Only Scroll Reveal Observer
    let observer: IntersectionObserver | null = null;
    if (window.innerWidth <= 1024) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
            }
          });
        },
        {
          rootMargin: "0px 0px -40px 0px",
          threshold: 0.05,
        }
      );

      document.querySelectorAll(".mobile-reveal").forEach((el) => {
        observer?.observe(el);
      });
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />

      {/* 3D Character Model ONLY rendered on Desktop */}
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            {/* 01 — Home */}
            <Landing />

            {/* 02 — About Me */}
            <About />

            {/* 03 — What I Do */}
            <WhatIDo />

            {/* 04 — My Career & Experience */}
            <Career />

            {/* 05 — My Work */}
            <Work />

            {/* 06 — Tech Stack */}
            <TechStack />

            {/* 07 — Contact */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

