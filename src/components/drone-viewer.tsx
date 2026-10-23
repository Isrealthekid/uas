"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Drone } from "@/lib/drones";

const Scene = dynamic(() => import("./drone-scene"), {
  ssr: false,
  loading: () => <p className="viewer-message" role="status">Preparing 3D viewer…</p>,
});

export function DroneViewer({ drone }: { drone: Drone }) {
  const [opened, setOpened] = useState(false);
  return (
    <section className="drone-viewer" aria-labelledby="drone-viewer-heading">
      <div className="drone-viewer-heading">
        <div><span>Explore the aircraft</span><h2 id="drone-viewer-heading">{drone.name} in 360°</h2></div>
        <p>Drag to rotate. Scroll or pinch to zoom.</p>
      </div>
      <div className="drone-viewer-stage">
        {drone.model ? opened ? <Scene src={drone.model} name={drone.name} /> : (
          <div className="viewer-message">
            <p>See every angle of {drone.name}.</p>
            <button type="button" className="drone-learn-more" onClick={() => setOpened(true)}>Explore in 3D</button>
          </div>
        ) : <p className="viewer-message">The {drone.name} 3D model is coming soon.</p>}
      </div>
    </section>
  );
}
