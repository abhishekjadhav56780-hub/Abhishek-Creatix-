import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
      smoothTouch: 0.1,
    });

    smoother.scrollTop(0);
    smoother.paused(false);

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    if (target === "#landingDiv" || target === "top" || target === "#/") {
      if (smoother && window.innerWidth > 1024) {
        smoother.scrollTop(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (smoother && window.innerWidth > 1024) {
        smoother.scrollTo(target, true, "top top");
      } else {
        const el = document.querySelector(target);
        if (el) {
          const headerHeight = window.innerWidth <= 480 ? 60 : 70;
          const elementPosition =
            el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - headerHeight);
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <>
      <div className="header">
        <a
          href="#landingDiv"
          data-href="#landingDiv"
          className="navbar-title"
          data-cursor="disable"
          onClick={(e) => handleNavClick(e, "#landingDiv")}
        >
          Abhishek Jadhav
        </a>
        <a
          href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-connect"
          data-cursor="disable"
        >
          abhishek.creatix@gmail.com
        </a>
        <ul>
          <li>
            <a
              href="#about"
              data-href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              href="#work"
              data-href="#work"
              onClick={(e) => handleNavClick(e, "#work")}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li className="nav-techstack-link">
            <a
              href="#techstack"
              data-href="#techstack"
              onClick={(e) => handleNavClick(e, "#techstack")}
            >
              <HoverLinks text="TECH STACK" />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
