import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Video scrubs through the hero scroll zone (first viewport-height of scroll)
const HERO_SCROLL = () => window.innerHeight;

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
      v.currentTime = 0.1;
    };

    if (v.readyState >= 2) {
      showFrame();
    } else {
      v.addEventListener("loadeddata", showFrame, { once: true });
      v.addEventListener("canplay", showFrame, { once: true });
    }

    return () => {
      v.removeEventListener("loadeddata", showFrame);
      v.removeEventListener("canplay", showFrame);
    };
  }, []);

  // Scroll-scrubbed playback — fixed to hero zone, not full page
  useEffect(() => {
    if (!loaded) return;
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => {
      v.currentTime = 0.1;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: `+=${HERO_SCROLL()}`,
        scrub: true,
        onUpdate: (self) => {
          if (v.duration) {
            // Clamp minimum to 0.1s so we never show the black first frame
            v.currentTime = Math.max(self.progress * v.duration, 0.1);
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
