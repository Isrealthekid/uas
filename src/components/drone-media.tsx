"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Drone } from "@/lib/drones";
import { ArrowIcon } from "./arrow-icon";

export function DroneMedia({ drone }: { drone: Drone }) {
  const container = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const moving = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [failed, setFailed] = useState(false);
  const [localVideo, setLocalVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const count = drone.gallery.length + 1;
  const active = (position - 1 + count) % count;

  // A copy at either end lets each move travel one slide, including wraps.
  const slides = [count - 1, ...Array.from({ length: count }, (_, i) => i), 0];

  const move = useCallback((direction: number) => {
    if (moving.current) return;
    if (reduced) {
      setPosition((index) => ((index - 1 + direction + count) % count) + 1);
    } else {
      moving.current = true;
      setPosition((index) => index + direction);
    }
  }, [count, reduced]);

  const finish = useCallback(() => {
    if (!moving.current) return;
    if (position === 0 || position === count + 1) {
      setAnimated(false);
      setPosition(position === 0 ? count : 1);
    } else {
      moving.current = false;
    }
  }, [position, count]);

  useEffect(() => {
    if (animated) return;
    // Commit the identical real slide without animating the track reset.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        setAnimated(true);
        moving.current = false;
      });
    });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, [animated]);

  useEffect(() => {
    if (!moving.current || !animated) return;
    const fallback = window.setTimeout(finish, 750);
    return () => window.clearTimeout(fallback);
  }, [position, animated, finish]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (!visible || reduced || (active === 0 && drone.video && !videoReady && !failed)) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !touch.current) move(1);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [active, count, visible, reduced, move, drone.video, videoReady, failed]);

  useEffect(() => {
    if (active !== 0 || !visible || reduced || videoReady || failed || !drone.video) return;
    const timeout = window.setTimeout(() => {
      if (!localVideo) setLocalVideo(true);
      else setFailed(true);
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [active, visible, reduced, videoReady, failed, drone.video, localVideo]);

  useEffect(() => {
    const elements = videos.current.filter((element): element is HTMLVideoElement => element !== null);
    for (const element of elements) {
      if (active === 0 && visible && !reduced && !failed) {
        // Keep the video and its wrap copy on the same frame.
        element.muted = true;
        element.defaultMuted = true;
        element.currentTime = 0;
        void element.play().catch(() => {});
      } else element.pause();
    }
    return () => elements.forEach((element) => element.pause());
  }, [active, visible, reduced, failed, localVideo]);

  return (
    <div ref={container} className="drone-media drone-gallery" role="region" aria-roledescription="carousel"
      aria-label={`${drone.name} gallery`} tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      onTouchStart={(event) => {
        touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
      }}
      onTouchCancel={() => { touch.current = null; }}
      onTouchEnd={(event) => {
        const start = touch.current;
        touch.current = null;
        if (!start || !event.changedTouches.length) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) move(dx < 0 ? 1 : -1);
      }}>
      <div className="drone-gallery-track"
        style={{ transform: `translateX(-${position * 100}%)`, transition: animated ? undefined : "none" }}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "transform") finish();
        }}>
        {slides.map((slide, index) => (
          <div className="drone-gallery-slide" key={index} aria-hidden={position !== index}>
            {slide === 0 && drone.video && !failed ? (
              <video ref={(element) => { videos.current[index] = element; }}
                src={localVideo ? `/assets/drones/${drone.slug}.mp4` : drone.video}
                poster={drone.poster} muted loop playsInline preload={visible ? "auto" : "none"}
                onPlaying={() => setVideoReady(true)}
                aria-label={`${drone.name} studio video`} onError={() => {
                  setVideoReady(false);
                  if (!localVideo) setLocalVideo(true);
                  else setFailed(true);
                }} />
            ) : (
              <Image src={slide === 0 ? drone.image : drone.gallery[slide - 1]}
                alt={slide === 0 ? `${drone.name} aircraft` : `${drone.name} — product photograph ${slide}`}
                fill sizes="(max-width: 899px) 100vw, 62vw" unoptimized draggable={false} />
            )}
          </div>
        ))}
      </div>
      <div className="drone-gallery-controls">
        <button type="button" className="gallery-previous" aria-label="Previous slide" onClick={() => move(-1)}><ArrowIcon direction="right" /></button>
        <button type="button" aria-label="Next slide" onClick={() => move(1)}><ArrowIcon direction="right" /></button>
      </div>
    </div>
  );
}
