import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (typeof window === "undefined" || window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = "top 82%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    try {
      const split = new SplitText(para, {
        type: "lines,words",
        linesClass: "split-line",
      });
      para.split = split;

      if (split?.words && split.words.length > 0) {
        para.anim = gsap.fromTo(
          split.words,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: para.parentElement?.parentElement || para,
              toggleActions: ToggleAction,
              start: TriggerStart,
            },
            duration: 0.75,
            ease: "power2.out",
            y: 0,
            stagger: 0.015,
          }
        );
      }
    } catch (e) {
      console.warn("SplitText para error:", e);
    }
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }

    try {
      const split = new SplitText(title, {
        type: "chars,lines",
        linesClass: "split-line",
      });
      title.split = split;

      if (split?.chars && split.chars.length > 0) {
        title.anim = gsap.fromTo(
          split.chars,
          { autoAlpha: 0, y: 40, rotate: 6 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: title.parentElement?.parentElement || title,
              toggleActions: ToggleAction,
              start: TriggerStart,
            },
            duration: 0.7,
            ease: "power2.out",
            y: 0,
            rotate: 0,
            stagger: 0.02,
          }
        );
      }
    } catch (e) {
      console.warn("SplitText title error:", e);
    }
  });
}
