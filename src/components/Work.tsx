import { useState, useEffect, useRef, TouchEvent } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdPlayArrow,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import "./styles/Work.css";

export interface ReelProject {
  id: string;
  clipTag: string;
  formatTag: string;
  title: string;
  category: string;
  description: string;
  image: string;
  video: string;
  link?: string;
}

export const reelProjects: ReelProject[] = [
  {
    id: "01",
    clipTag: "CLIP_01",
    formatTag: "REEL",
    title: "Cinematic Travel Reel",
    category: "Travel & Pacing · 9:16",
    description: "Fast-paced rhythm cuts, sound design & LUT color grading.",
    image: "/images/poster1.webp",
    video: "/videos/video1.mp4",
    link: "#",
  },
  {
    id: "02",
    clipTag: "CLIP_02",
    formatTag: "REEL",
    title: "Talking Head Retention Edit",
    category: "YouTube Shorts / Reels · 9:16",
    description: "Punch zooms, dynamic captions, sound FX & hook retention.",
    image: "/images/poster2.webp",
    video: "/videos/video2.mp4",
    link: "#",
  },
  {
    id: "03",
    clipTag: "CLIP_03",
    formatTag: "REEL",
    title: "High-Energy Music Montage",
    category: "Music & Promo · 9:16",
    description: "Beat-synced transitions, speed ramping & visual effects.",
    image: "/images/poster3.webp",
    video: "/videos/video3.mp4",
    link: "#",
  },
  {
    id: "04",
    clipTag: "CLIP_04",
    formatTag: "REEL",
    title: "Documentary Narrative Cut",
    category: "Storytelling & Color · 9:16",
    description: "Dialogue editing, A/B-roll balance & intimate flow.",
    image: "/images/poster4.webp",
    video: "/videos/video4.mp4",
    link: "#",
  },
  {
    id: "05",
    clipTag: "CLIP_05",
    formatTag: "REEL",
    title: "Commercial Product Launch",
    category: "Product & VFX · 9:16",
    description: "Clean transitions, kinetic text & product spotlight.",
    image: "/images/poster5.webp",
    video: "/videos/video5.mp4",
    link: "#",
  },
];

interface ReelCardProps {
  project: ReelProject;
  cardClass: string;
  isCenter: boolean;
  isAdjacent: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSelect: () => void;
}

const ReelCard = ({
  project,
  cardClass,
  isCenter,
  isAdjacent,
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onSelect,
}: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCenter) {
      video.muted = isMuted;
      if (isPlaying) {
        video.play().catch(() => {
          // If browser restricts unmuted autoplay, fallback to muted then allow user to unmute
          video.muted = true;
          video.play().catch(() => {});
        });
      } else {
        video.pause();
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  }, [isCenter, isPlaying, isMuted]);

  // Preload strategy:
  // - Center card: "auto" for immediate readiness on click
  // - Adjacent cards: "metadata"
  // - Far cards: "none"
  const preloadStrategy = isCenter ? "auto" : isAdjacent ? "metadata" : "none";

  return (
    <div
      className={`carousel-card ${cardClass} ${isCenter && isPlaying ? "video-playing" : "video-paused"}`}
      onClick={() => {
        if (!isCenter) {
          onSelect();
        } else {
          onTogglePlay();
        }
      }}
      data-cursor={isCenter ? "pointer" : "pointer"}
    >
      {/* Top Bar with Clip Tag & Format Badge */}
      <div className="card-top-bar">
        <span className="card-tag-clip">{project.clipTag}</span>
        <span className="card-tag-badge">{project.formatTag}</span>
      </div>

      {/* Audio Sound Button on Center Card */}
      {isCenter && (
        <button
          className={`card-audio-btn ${!isMuted ? "unmuted" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          aria-label={isMuted ? "Unmute Video Audio" : "Mute Video Audio"}
          title={isMuted ? "Click to Unmute Audio" : "Click to Mute Audio"}
          data-cursor="disable"
        >
          {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
        </button>
      )}

      {/* Thumbnail / Video Player */}
      <div className="card-media-wrap">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            loop
            playsInline
            muted={isCenter ? isMuted : true}
            preload={preloadStrategy}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          />
        ) : (
          <img src={project.image} alt={project.title} loading="lazy" />
        )}

        {/* Center Compact Play Button (Visible on Mobile when Paused) */}
        {isCenter && !isPlaying && (
          <button
            className="card-center-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            aria-label="Play video"
            title="Click to Play"
            data-cursor="disable"
          >
            <MdPlayArrow className="control-play-icon" />
          </button>
        )}

        {/* Center Play Indicator on Inactive Cards */}
        {!isCenter && (
          <div className="card-play-overlay">
            <MdPlayArrow />
          </div>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default music ON when user starts playback
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const totalProjects = reelProjects.length;

  const nextSlide = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m" || e.key === "M") toggleMute();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch handlers for mobile swipe (Swipe left -> next, Swipe right -> prev)
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Trigger only if horizontal swipe intent is stronger than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        nextSlide(); // Swiped left -> next
      } else {
        prevSlide(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Calculate circular relative offset for 5 positions
  const getCardClass = (index: number) => {
    let diff = (index - activeIndex) % totalProjects;
    if (diff > Math.floor(totalProjects / 2)) diff -= totalProjects;
    if (diff < -Math.floor((totalProjects - 1) / 2)) diff += totalProjects;

    if (diff === 0) return "card-center";
    if (diff === 1) return "card-right-1";
    if (diff === -1) return "card-left-1";
    if (diff === 2) return "card-right-2";
    if (diff === -2) return "card-left-2";
    return "card-hidden";
  };

  return (
    <div className="work-section section-container" id="work">
      <div className="work-container">
        <div className="work-header mobile-reveal">
          <h2>
            My <span>Work</span>
          </h2>
          <p>Selected Video Editing, Short-Form & Reel Projects</p>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="carousel-stage mobile-reveal mobile-reveal-stagger-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={prevSlide}
            aria-label="Previous Video"
            data-cursor="disable"
          >
            <MdChevronLeft />
          </button>

          <button
            className="carousel-btn carousel-btn-next"
            onClick={nextSlide}
            aria-label="Next Video"
            data-cursor="disable"
          >
            <MdChevronRight />
          </button>

          {/* Cards Container */}
          <div className="carousel-cards-container">
            {reelProjects.map((project, index) => {
              const cardClass = getCardClass(index);
              const isCenter = cardClass === "card-center";
              const isAdjacent =
                cardClass === "card-left-1" || cardClass === "card-right-1";

              return (
                <ReelCard
                  key={project.id}
                  project={project}
                  cardClass={cardClass}
                  isCenter={isCenter}
                  isAdjacent={isAdjacent}
                  isPlaying={isCenter ? isPlaying : false}
                  isMuted={isMuted}
                  onTogglePlay={togglePlay}
                  onToggleMute={toggleMute}
                  onSelect={() => {
                    if (!isCenter) {
                      setIsPlaying(false);
                      setActiveIndex(index);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Pagination Indicators (5 Positions: ● ○ ○ ○ ○) */}
        <div className="carousel-pagination">
          {reelProjects.map((project, index) => (
            <button
              key={project.id}
              className={`pagination-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(index);
              }}
              aria-label={`Go to video ${index + 1}`}
              data-cursor="disable"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
