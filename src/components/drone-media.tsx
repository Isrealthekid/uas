"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Drone } from "@/lib/drones";

export function DroneMedia({ drone }: { drone: Drone }) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      element.muted = true;
      element.autoplay = visible && !motion.matches;
      if (element.autoplay) void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      element.pause();
    };
  }, [drone.video, failed]);

  return (
    <div
      className={`drone-media${!drone.video || failed ? " drone-media-photo" : ""}`}
      role="group"
      aria-label={`${drone.name} aircraft view`}
    >
      {drone.video && !failed ? (
        <>
          <video
            ref={video}
            src={drone.video}
            poster={drone.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${drone.name} rotating studio view`}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <Image
          src={drone.image}
          alt={`${drone.name} unmanned aerial vehicle at Briech UAS`}
          fill
          sizes="(max-width: 899px) 100vw, 50vw"
          unoptimized
        />
      )}
    </div>
  );
}
