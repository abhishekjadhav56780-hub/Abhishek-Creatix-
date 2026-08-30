import React, { useEffect, useRef, useState } from "react";
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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const [handSrc, setHandSrc] = useState<string>("/images/hand_asset.jpg");

  const [iconTransforms, setIconTransforms] = useState<
    {
      x: number;
      y: number;
      scale: number;
      opacity: number;
      zIndex: number;
    }[]
  >([]);

  // Automatically key out any checkerboard from the uploaded hand asset
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Key out neutral background checkerboard pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const maxDiff = Math.max(
          Math.abs(r - g),
          Math.abs(g - b),
          Math.abs(r - b)
        );
        const brightness = (r + g + b) / 3;

        if (maxDiff < 14 && brightness > 150) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setHandSrc(canvas.toDataURL("image/png"));
    };
    img.src = "/images/hand_asset.jpg";
  }, []);

  // Smooth 60fps orbital motion around and slightly below the thumb area
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.00035; // Slow, cinematic orbital speed

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      angleRef.current = (angleRef.current + speed * delta) % (Math.PI * 2);

      const isMobile = window.innerWidth <= 768;
      // Orbit positioned tight around and slightly below the thumb area
      const radiusX = isMobile ? 128 : 164;
      const radiusY = isMobile ? 46 : 58;
      const tilt = -0.22; // Slanted 3D plane
      const centerX = isMobile ? -6 : -12; // Aligned closely with the thumb on the left
      const centerY = isMobile ? 10 : 25; // Naturally positioned around & slightly below thumb

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
        const depthFactor = (rawZ + 1) / 2; // 0 to 1
        const scale = 0.85 + 0.35 * depthFactor;
        const opacity = 0.65 + 0.35 * depthFactor;
        const zIndex = rawZ >= -0.05 ? 12 : 2; // Hand is at zIndex: 6

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

  // Subtle interactive parallax
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

      {/* Orbit Container with 3D Parallax */}
      <div
        className="orbit-stage"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* Noticeably Larger 3D Hand sitting flush at the bottom edge */}
        <div className="hand-visual-wrap">
          <img
            src={handSrc}
            alt="Abhishek Creative Hand"
            className="contact-hand-img"
            loading="eager"
          />
        </div>

        {/* Orbiting Software Icons (Passing in front and behind around & below thumb) */}
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
