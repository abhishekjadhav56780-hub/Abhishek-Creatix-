import { useRef } from "react";
import gsap from "gsap";
import "./styles/Landing.css";

const Landing = () => {
  const starRef = useRef<HTMLImageElement>(null);
  const currentRotation = useRef(0);
  const isSpinning = useRef(false);

  const handleStarClick = () => {
    if (!starRef.current) return;
    
    currentRotation.current += 3600;
    isSpinning.current = true;

    gsap.to(starRef.current, {
      rotation: currentRotation.current,
      duration: 10,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        isSpinning.current = false;
      },
    });
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        {/* Left Intro (Desktop & Mobile) */}
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            ABHISHEK
            <br />
            <span>JADHAV</span>
          </h1>
        </div>

        {/* Center Contact Avatar Image (Mobile-Only Locked) */}
        <div className="landing-avatar-center">
          <div className="contact-avatar-container">
            <div className="avatar-purple-halo"></div>
            <div className="contact-avatar-wrap">
              <img
                src="/images/user_photo.jpg"
                alt="Abhishek Jadhav"
                className="contact-avatar-img"
                loading="eager"
              />
            </div>

            {/* Interactive Corner Star Badge */}
            <div
              className="avatar-star-badge"
              onClick={handleStarClick}
              role="button"
              tabIndex={0}
              title="Click to spin 10 times!"
            >
              <img
                ref={starRef}
                src="/images/purple_star.png"
                alt="Purple Star"
                className="avatar-star-img"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Profession Text Block (Mobile-Only Locked) */}
        <div className="landing-profession-block">
          <div className="profession-label">A Creative</div>
          <div className="profession-title-wrap">
            <h2 className="profession-title-bg">STORYTELLER</h2>
            <h2 className="profession-title-main">VIDEO EDITOR</h2>
          </div>
        </div>

        {/* Desktop 3D Character Original Landing Info & Text Rotation */}
        <div className="landing-info">
          <h3>A Creative</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">STORYTELLER</div>
            <div className="landing-h2-2">VIDEO EDITOR</div>
          </h2>
          <h2>
            <div className="landing-h2-info">VIDEO EDITOR</div>
            <div className="landing-h2-info-1">STORYTELLER</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
