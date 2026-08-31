import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor overhead on touch / mobile devices
    if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 1024)) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animId: number;
    function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        setCursorX(cursorPos.x);
        setCursorY(cursorPos.y);
      }
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    const mouseOverHandlers: { el: HTMLElement; over: (e: MouseEvent) => void; out: () => void }[] = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const over = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          setCursorX(rect.left);
          setCursorY(rect.top);
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const out = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", over);
      element.addEventListener("mouseout", out);
      mouseOverHandlers.push({ el: element, over, out });
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      mouseOverHandlers.forEach(({ el, over, out }) => {
        el.removeEventListener("mouseover", over);
        el.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
