import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo({ loaded, src = "/hero-bg.mp4" }) {
  const videoRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const frameShown = useRef(false);

  // Show first frame as soon as video data is available
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const showFrame = () => {
      if (frameShown.current) return;
      frameShown.current = true;
      v.pause();
      // Skip to 0.1s to avoid potential black intro frames
      v.currentTime = 0.1;
    };

    // readyState >= 2 means enough data to show current frame
    if (v.readyState >= 2) {
      showFrame();
    } else {
      v.addEventListener("loadeddata", showFrame, { once: true });
      // Fallback: also try canplay
      v.addEventListener("canplay", showFrame, { once: true });
    }

    return () => {
      v.removeEventListener("loadeddata", showFrame);
      v.removeEventListener("canplay", showFrame);
    };
  }, []);

  // Scroll-scrubbed playback
  useEffect(() => {
    if (!loaded) return;
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => {
      // Ensure a frame is visible at current scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      v.currentTime = v.duration ? progress * v.duration : 0.1;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (v.duration) {
            v.currentTime = self.progress * v.duration;
          }
        },
      });
    };

    if (v.readyState >= 1) {
      onReady();
    } else {
      v.addEventListener("loadedmetadata", onReady, { once: true });
    }

    return () => {
      v.removeEventListener("loadedmetadata", onReady);
      scrollTriggerRef.current?.kill();
    };
  }, [loaded]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      autoPlay
      playsInline
      preload="auto"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
