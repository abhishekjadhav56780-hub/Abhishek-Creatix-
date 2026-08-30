import { useEffect, useState } from "react";
import { MdCopyright } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";
import ContactHandOrbit from "./ContactHandOrbit";
import "./styles/Contact.css";

const Contact = () => {
  const [starRotation, setStarRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [cleanStarSrc, setCleanStarSrc] = useState<string>("/images/purple_star.png");

  // Automatically key out any black background from the 3D star to make it a 100% transparent PNG
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

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = Math.max(r, g, b);

        // Key out black background cleanly
        if (brightness < 16) {
          data[i + 3] = 0;
        } else if (brightness < 45) {
          data[i + 3] = Math.min(255, Math.floor(((brightness - 16) / 29) * 255));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setCleanStarSrc(canvas.toDataURL("image/png"));
    };
    img.src = "/images/purple_star.png";
  }, []);

  const handleStarMouseEnter = () => {
    setIsHovered(true);
    setStarRotation((prev) => prev + 90);
  };

  const handleStarMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="contact-section section-container" id="contact">
      {/* Outer Card with subtle purple glow border */}
      <div className="contact-card-frame mobile-reveal">
        {/* Background Ambient Purple Glow Spots */}
        <div className="contact-glow-top-left"></div>
        <div className="contact-glow-right"></div>

        <div className="contact-container">
          <div className="contact-main-grid">
            {/* 1. LEFT SIDE: User's Real Photo & Direct Contact Info */}
            <div className="contact-left-col mobile-reveal mobile-reveal-stagger-1">
              {/* Circular Real Photo with floating animation & purple halo */}
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
              </div>

              {/* Simple Contact Information */}
              <div className="contact-info-list">
                <div className="contact-name-badge">
                  <span className="contact-name-text">Abhishek Jadhav</span>
                </div>

                <div className="contact-info-row">
                  <span className="info-label">Email:</span>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.creatix@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-pill-btn"
                    data-cursor="disable"
                    title="Send an email to Abhishek"
                  >
                    <span className="info-pill-text">abhishek.creatix@gmail.com</span>
                    <span className="info-pill-icon-wrap">
                      <FiArrowDownRight className="info-pill-icon" />
                    </span>
                  </a>
                </div>

                <div className="contact-info-row">
                  <span className="info-label">Phone:</span>
                  <a
                    href="tel:+919183834197"
                    className="info-pill-btn"
                    data-cursor="disable"
                    title="Call +91 9183834197"
                  >
                    <span className="info-pill-text">+91 9183834197</span>
                    <span className="info-pill-icon-wrap">
                      <FiArrowDownRight className="info-pill-icon" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Minimal Left Footer */}
              <div className="contact-left-footer">
                <p className="contact-copyright">
                  <MdCopyright /> {new Date().getFullYear()} Abhishek Jadhav. All rights reserved.
                </p>
              </div>
            </div>

            {/* 2. CENTER: Call-To-Action + Transparent 3D Star + 3D Bubble Thank You */}
            <div className="contact-center-col mobile-reveal mobile-reveal-stagger-2">
              <div className="contact-cta-wrap">
                <h2 className="contact-cta-title">
                  <span className="cta-lets-work">Lets Work</span>
                  <span className="cta-together">Together</span>
                </h2>

                {/* 100% Transparent PNG 3D Star with smooth hover rotation */}
                <div
                  className="contact-shape-interactive"
                  onMouseEnter={handleStarMouseEnter}
                  onMouseLeave={handleStarMouseLeave}
                  title="Interactive 3D Star"
                >
                  <img
                    src={cleanStarSrc}
                    alt="Purple 3D Star"
                    className="contact-3d-star-img"
                    style={{
                      transform: isHovered
                        ? `scale(1.18) rotate(${starRotation}deg)`
                        : `scale(1) rotate(${starRotation}deg)`,
                    }}
                    loading="eager"
                  />
                </div>

                {/* 3D Bubble Effect "Thank You" Badge */}
                <div className="contact-thank-you-bubble">
                  <span className="bubble-gloss-shine"></span>
                  <span className="bubble-text">Thank You ✨</span>
                </div>

                {/* Subtext under Thank You */}
                <p className="contact-tagline-subtext">
                  I also design & build modern, high-performance websites.
                </p>
              </div>
            </div>

            {/* 3. RIGHT SIDE: Noticeably Large Hand with Orbiting Software Icons */}
            <div className="contact-right-col mobile-reveal mobile-reveal-stagger-3">
              <ContactHandOrbit />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
