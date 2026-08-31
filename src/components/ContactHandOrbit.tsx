import React, { useEffect, useRef, useState } from "react";
import "./styles/ContactHandOrbit.css";

interface OrbitingIcon {
  id: string;
  name: string;
  renderIcon: () => React.ReactNode;
}

// 7 exact software icons from the reference image: Ps, Pr, Ai, Figma, Ae, Lr, CapCut
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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  const [iconTransforms, setIconTransforms] = useState<
    {
      x: number;
      y: number;
      scale: number;
      opacity: number;
      zIndex: number;
    }[]
  >([]);

  // Continuous 60fps 3D orbital motion around hand and fingers
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.00042; // Smooth, continuous cinematic rotation speed

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      angleRef.current = (angleRef.current + speed * delta) % (Math.PI * 2);

      const isMobile = window.innerWidth <= 768;
      // Orbit positioned around the palm & fingers like in the reference image
      const radiusX = isMobile ? 130 : 185;
      const radiusY = isMobile ? 46 : 64;
      const tilt = -0.18; // 3D Slanted plane
      const centerX = 0; // Centered on hand
      const centerY = isMobile ? -30 : -50; // Orbit encircling the fingers & palm

      const numIcons = ORBIT_ICONS.length;
      const newTransforms = ORBIT_ICONS.map((_, i) => {
        const baseAngle = (i / numIcons) * Math.PI * 2;
        const currentAngle = (baseAngle + angleRef.current) % (Math.PI * 2);

        const rawX = Math.cos(currentAngle) * radiusX;
        const rawY = Math.sin(currentAngle) * radiusY;
        const rawZ = Math.sin(currentAngle); // -1 (behind) to +1 (in front)

        // 2D Rotation by tilt
        const rotX = rawX * Math.cos(tilt) - rawY * Math.sin(tilt) + centerX;
        const rotY = rawX * Math.sin(tilt) + rawY * Math.cos(tilt) + centerY;

        // 3D Depth scale & opacity
        const depthFactor = (rawZ + 1) / 2; // 0 (back) to 1 (front)
        const scale = 0.82 + 0.38 * depthFactor;
        const opacity = 0.65 + 0.35 * depthFactor;
        const zIndex = rawZ >= -0.05 ? 12 : 2; // Hand sits at zIndex: 6

        return {
          x: rotX,
          y: rotY,
          scale,
          opacity,
          zIndex,
        };
      });

      setIconTransforms(newTransforms);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Interactive 3D Parallax with mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMouseOffset({ x: nx * 8, y: ny * 6 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
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

      {/* Orbit Stage with Parallax */}
      <div
        className="orbit-stage"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* Hand Asset sitting flush in the center */}
        <div className="hand-visual-wrap">
          <img
            src="/images/contact_hand.png"
            alt="Abhishek Creative Hand"
            className="contact-hand-img"
            loading="eager"
          />
        </div>

        {/* Orbiting Software Icons (revolving 360° in front and behind the hand) */}
        {ORBIT_ICONS.map((icon, idx) => {
          const t = iconTransforms[idx] || {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 1,
          };
          return (
            <div
              key={icon.id}
              className="orbiting-item"
              style={{
                transform: `translate3d(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px), 0) scale(${t.scale})`,
                opacity: t.opacity,
                zIndex: t.zIndex,
              }}
              title={icon.name}
            >
              {icon.renderIcon()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactHandOrbit;
