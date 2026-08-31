import React, { useEffect, useRef } from "react";
import "./styles/ContactHandOrbit.css";

interface OrbitingIcon {
  id: string;
  name: string;
  renderIcon: () => React.ReactNode;
}

// 7 exact software icons from the user reference ring: Ps, Pr, Ai, Figma, Ae, Lr, CapCut
const ORBIT_ICONS: OrbitingIcon[] = [
  {
    id: "ps",
    name: "Adobe Photoshop",
    renderIcon: () => (
      <div className="orbit-tile tile-ps">
        <span className="tile-gloss"></span>
        <span className="tile-text">Ps</span>
      </div>
    ),
  },
  {
    id: "pr",
    name: "Adobe Premiere Pro",
    renderIcon: () => (
      <div className="orbit-tile tile-pr">
        <span className="tile-gloss"></span>
        <span className="tile-text">Pr</span>
      </div>
    ),
  },
  {
    id: "ai",
    name: "Adobe Illustrator",
    renderIcon: () => (
      <div className="orbit-tile tile-ai">
        <span className="tile-gloss"></span>
        <span className="tile-text">Ai</span>
      </div>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    renderIcon: () => (
      <div className="orbit-tile tile-figma">
        <span className="tile-gloss"></span>
        <div className="figma-grid">
          <span className="figma-p1"></span>
          <span className="figma-p2"></span>
          <span className="figma-p3"></span>
          <span className="figma-p4"></span>
          <span className="figma-p5"></span>
        </div>
      </div>
    ),
  },
  {
    id: "ae",
    name: "Adobe After Effects",
    renderIcon: () => (
      <div className="orbit-tile tile-ae">
        <span className="tile-gloss"></span>
        <span className="tile-text">Ae</span>
      </div>
    ),
  },
  {
    id: "lr",
    name: "Adobe Lightroom",
    renderIcon: () => (
      <div className="orbit-tile tile-lr">
        <span className="tile-gloss"></span>
        <span className="tile-text">Lr</span>
      </div>
    ),
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    renderIcon: () => (
      <div className="orbit-tile tile-capcut">
        <span className="tile-gloss"></span>
        <svg viewBox="0 0 100 100" className="capcut-svg">
          <path
            d="M 15 20 L 65 20 L 85 45 L 85 52 L 68 52 L 35 28 L 22 28 L 50 48 L 15 20 Z"
            fill="#111"
          />
          <path
            d="M 15 80 L 65 80 L 85 55 L 85 48 L 68 48 L 35 72 L 22 72 L 50 52 L 15 80 Z"
            fill="#111"
          />
        </svg>
      </div>
    ),
  },
];

export const ContactHandOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);

  // IntersectionObserver to only animate orbit when the contact section is in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      {
        rootMargin: "200px 0px 200px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth 60fps orbital motion with high-performance direct DOM style updates
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.00035; // Slow, cinematic orbital speed
    const numIcons = ORBIT_ICONS.length;

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (isVisibleRef.current) {
        angleRef.current = (angleRef.current + speed * delta) % (Math.PI * 2);

        const isMobile = window.innerWidth <= 768;
        const radiusX = isMobile ? 128 : 164;
        const radiusY = isMobile ? 46 : 58;
        const tilt = -0.22;
        const centerX = isMobile ? -6 : -12;
        const centerY = isMobile ? 10 : 25;

        for (let i = 0; i < numIcons; i++) {
          const itemEl = itemRefs.current[i];
          if (!itemEl) continue;

          const baseAngle = (i / numIcons) * Math.PI * 2;
          const currentAngle = (baseAngle + angleRef.current) % (Math.PI * 2);

          const rawX = Math.cos(currentAngle) * radiusX;
          const rawY = Math.sin(currentAngle) * radiusY;
          const rawZ = Math.sin(currentAngle);

          const rotX = rawX * Math.cos(tilt) - rawY * Math.sin(tilt) + centerX;
          const rotY = rawX * Math.sin(tilt) + rawY * Math.cos(tilt) + centerY;

          const depthFactor = (rawZ + 1) / 2;
          const scale = 0.85 + 0.35 * depthFactor;
          const opacity = 0.65 + 0.35 * depthFactor;
          const zIndex = rawZ >= -0.05 ? 12 : 2;

          itemEl.style.transform = `translate3d(calc(-50% + ${rotX}px), calc(-50% + ${rotY}px), 0) scale(${scale})`;
          itemEl.style.opacity = `${opacity}`;
          itemEl.style.zIndex = `${zIndex}`;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Subtle interactive parallax using direct style transform
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !stageRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    stageRef.current.style.transform = `translate3d(${nx * 8}px, ${ny * 6}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (stageRef.current) {
      stageRef.current.style.transform = `translate3d(0px, 0px, 0)`;
    }
  };

  return (
    <div
      className="contact-hand-composition"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Purple Ambient Aura Background */}
      <div className="hand-aura-glow"></div>

      {/* Orbit Container with 3D Parallax */}
      <div className="orbit-stage" ref={stageRef}>
        {/* Noticeably Larger 3D Hand sitting flush at the bottom edge */}
        <div className="hand-visual-wrap">
          <img
            src="/images/contact_hand.png"
            alt="Abhishek Creative Hand"
            className="contact-hand-img"
            loading="lazy"
          />
        </div>

        {/* Orbiting Software Icons */}
        {ORBIT_ICONS.map((icon, idx) => (
          <div
            key={icon.id}
            ref={(el) => (itemRefs.current[idx] = el)}
            className="orbiting-item"
            title={icon.name}
          >
            {icon.renderIcon()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactHandOrbit;
