import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { MdArrowForward } from "react-icons/md";
import SoftwareIconBalls from "./SoftwareIconBalls";
import "./styles/TechStack.css";

interface SoftwareTool {
  name: string;
  badge: string;
  description: string;
  features: string[];
}

const softwareTools: SoftwareTool[] = [
  {
    name: "Adobe Premiere Pro",
    badge: "Core Video Editing",
    description:
      "Video editing, precision cutting, pacing, color correction, and audio synchronization.",
    features: [
      "Timeline Cutting & Pacing",
      "Multi-Camera Sync",
      "Color Grading & Lumetri",
      "Audio Cleaning & Mix",
      "Dynamic Split Screen",
    ],
  },
  {
    name: "Adobe After Effects",
    badge: "Motion Graphics & VFX",
    description:
      "Motion graphics, visual effects (VFX), kinetic typography, animations, and transitions.",
    features: [
      "Kinetic Typography",
      "Visual Effects (VFX)",
      "Motion Tracking",
      "Custom Transitions",
      "3D Camera & Compositing",
    ],
  },
  {
    name: "Adobe Photoshop",
    badge: "Thumbnails & Design",
    description:
      "High-CTR thumbnails, frame retouching, image compositing, and visual design assets.",
    features: [
      "High-CTR Thumbnails",
      "Subject Cutouts & Retouching",
      "Color Balancing",
      "Key Art Compositing",
      "Graphic Branding Assets",
    ],
  },
];

const workflowSteps = [
  {
    num: "01",
    name: "Storyboard",
    desc: "Concept & Narrative Structure",
  },
  {
    num: "02",
    name: "Premiere Pro",
    desc: "Rough Cut, Pacing & Audio Sync",
  },
  {
    num: "03",
    name: "After Effects",
    desc: "Motion Graphics, Titles & VFX",
  },
  {
    num: "04",
    name: "Photoshop",
    desc: "Thumbnails, Art & Retouching",
  },
  {
    num: "05",
    name: "Export",
    desc: "Master Quality Delivery",
  },
];

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("techstack");
      if (!el) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold =
        el.getBoundingClientRect().top + scrollY - window.innerHeight / 2;
      setIsActive(scrollY > threshold);
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="techstack-section section-container" id="techstack">
      <div className="techstack-container">
        <h2 className="mobile-reveal">
          My <span>Tech</span> Stack
        </h2>

        {/* Software & Tools Cards */}
        <div className="techstack-grid mobile-reveal mobile-reveal-stagger-1">
          {softwareTools.map((tool) => (
            <div className="tech-card" key={tool.name}>
              <div className="tech-card-header">
                <h3>{tool.name}</h3>
                <span className="tech-badge">{tool.badge}</span>
              </div>
              <p>{tool.description}</p>
              <div className="tech-tags">
                {tool.features.map((feat) => (
                  <span className="tech-tag-item" key={feat}>
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Editing Workflow Pipeline */}
        <div className="workflow-box mobile-reveal mobile-reveal-stagger-2">
          <div className="workflow-header">
            <h4>Editing Workflow</h4>
            <p>From initial concept to finalized high-impact delivery</p>
          </div>
          <div className="workflow-pipeline">
            {workflowSteps.map((step, idx) => (
              <div key={step.num} style={{ display: "contents" }}>
                <div className="workflow-step">
                  <span className="workflow-step-num">{step.num}</span>
                  <span className="workflow-step-name">{step.name}</span>
                  <span className="workflow-step-desc">{step.desc}</span>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <div className="workflow-arrow">
                    <MdArrowForward />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 3D Software Icon Balls Canvas */}
        <div className="techstack-canvas-wrap mobile-reveal mobile-reveal-stagger-3">
          <div className="canvas-text-overlay">
            <h3>I Edit All Types of Videos</h3>
          </div>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
              alpha: true,
              stencil: false,
              depth: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.4)}
            className="tech-canvas"
          >
            <ambientLight intensity={1.1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.3}
              color="#c2a4ff"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <spotLight
              position={[-20, -10, 15]}
              penumbra={1}
              angle={0.4}
              color="#8250df"
              intensity={0.6}
            />
            <directionalLight
              position={[0, 6, 8]}
              intensity={1.8}
              color="#ffffff"
            />
            <SoftwareIconBalls isActive={isActive} />
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.6}
              environmentRotation={[0, 4, 2]}
            />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default TechStack;

