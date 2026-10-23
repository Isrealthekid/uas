"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Drone } from "@/lib/drones";

const Scene = dynamic(() => import("./drone-scene"), {
  ssr: false,
  loading: () => <p className="viewer-message" role="status">Preparing 3D viewer…</p>,
});

export function DroneViewer({ drone }: { drone: Drone }) {
  const [opened, setOpened] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (opened) closeButton.current?.focus({ preventScroll: true }); }, [opened]);
  function close() {
    setOpened(false);
    requestAnimationFrame(() => openButton.current?.focus());
  }
  return (
    <section className="drone-viewer" aria-labelledby="drone-viewer-heading"
      onKeyDown={(event) => { if (opened && event.key === "Escape") { event.preventDefault(); close(); } }}>
      <div className="drone-viewer-heading">
        <div><span>Explore the aircraft</span><h2 id="drone-viewer-heading">{drone.name} in 360°</h2></div>
        <p>Drag to rotate. Scroll or pinch to zoom.</p>
      </div>
      <div className={`drone-viewer-stage${opened ? " is-open" : ""}`}>
        {opened && <button ref={closeButton} type="button" className="viewer-close" onClick={close} aria-label="Close 3D viewer">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" /></svg>
          Close
        </button>}
        {drone.model ? opened ? <Scene src={drone.model} name={drone.name} /> : (
          <div className="viewer-message">
            <p>See every angle of {drone.name}.</p>
            <button ref={openButton} type="button" className="drone-learn-more" onClick={() => setOpened(true)}>Explore in 3D</button>
          </div>
        ) : <p className="viewer-message">The {drone.name} 3D model is coming soon.</p>}
      </div>
    </section>
  );
}
