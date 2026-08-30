import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading, setLoading: setContextLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Auto-progress on mobile (where 3D model is disabled) or fallback timeout
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;
    if (isMobile) {
      let cur = 0;
      const interval = setInterval(() => {
        cur += Math.floor(Math.random() * 15) + 12;
        if (cur >= 100) {
          cur = 100;
          clearInterval(interval);
          setContextLoading(100);
        } else {
          setContextLoading(cur);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      const fallback = setTimeout(() => {
        setContextLoading(100);
      }, 3500);
      return () => clearTimeout(fallback);
    }
  }, []);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 700);
        return () => clearTimeout(t2);
      }, 400);
      return () => clearTimeout(t1);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      import("./utils/initialFX").then((module) => {
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 800);
      });
    }
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Abhishek Jadhav
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Storyteller</span> <span>A Creative Video Editor</span>
            <span> A Creative Storyteller</span> <span>A Creative Video Editor</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
