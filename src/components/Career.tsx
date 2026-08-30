import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  useEffect(() => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 75%",
        end: "bottom 70%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        id: "career-timeline-trigger",
      },
    });

    careerTimeline
      .fromTo(
        ".career-timeline",
        { maxHeight: "0%", opacity: 0 },
        { maxHeight: "100%", opacity: 1, ease: "none", duration: 1 },
        0
      )
      .fromTo(
        ".career-info-box",
        { opacity: 0.25, y: 15 },
        { opacity: 1, y: 0, stagger: 0.25, ease: "power1.out", duration: 0.8 },
        0
      );

    return () => {
      careerTimeline.kill();
      ScrollTrigger.getById("career-timeline-trigger")?.kill();
    };
  }, []);

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2 className="mobile-reveal">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box mobile-reveal">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Building the Foundation</h4>
                <h5>Video Editing Fundamentals</h5>
              </div>
              <h3 className="career-year-tag career-year-1">1 YEAR</h3>
            </div>
            <p>
              Developed strong fundamentals in video editing, including cuts,
              pacing, storytelling and basic post-production.
            </p>
          </div>
          <div className="career-info-box mobile-reveal">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Becoming More Skilled</h4>
                <h5>Current Experience (1.5+ Years)</h5>
              </div>
              <h3 className="career-year-tag career-year-2">1.5 YRS</h3>
            </div>
            <p>
              Improved my editing significantly and developed stronger skills in
              storytelling, Talking Head editing, sound design, motion and
              retention-focused editing.
            </p>
          </div>
          <div className="career-info-box mobile-reveal">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Expanding My Skillset</h4>
                <h5>Next Milestone / Progression</h5>
              </div>
              <h3 className="career-year-tag career-year-3">2 YEARS</h3>
            </div>
            <p>
              Progressing towards handling a wider range of content — from
              short-form videos to long-form content and different styles of
              video editing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
