"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export default function DroneScene({ src, name }: { src: string; name: string }) {
  const host = useRef<HTMLDivElement>(null);
  const actions = useRef<{ reset: () => void; rotate: (amount: number) => void; zoom: (factor: number) => void } | null>(null);
  const [status, setStatus] = useState("Loading aircraft…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      queueMicrotask(() => {
        if (!disposed) setStatus("3D is unavailable on this device. You can still explore the photographs above.");
      });
      return () => { disposed = true; };
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0xf0f0ee);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", `Interactive 3D model of ${name}`);
    renderer.domElement.setAttribute("role", "img");
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    camera.position.set(3.8, 2.2, 4.2);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1.8;
    controls.maxDistance = 18;
    controls.enableDamping = false;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 1));
    const light = new THREE.SpotLight(0xfff5e6, 150, 0, Math.PI / 5, 0.8, 2);
    light.position.set(2.5, 6, 3);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.bias = -0.0002;
    light.shadow.normalBias = 0.025;
    scene.add(light, light.target);
    const fill = new THREE.DirectionalLight(0xffffff, 0.8);
    fill.position.set(-4, 2, -3);
    scene.add(fill);

    const render = () => { if (!disposed) renderer.render(scene, camera); };
    controls.addEventListener("change", render);
    const resize = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.position.set(3.8, 2.2, 4.2).setLength(Math.max(6, 7.15 / camera.aspect));
      controls.update();
      controls.saveState();
      render();
    });
    resize.observe(container);

    function release(object: THREE.Object3D) {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        }
      });
    }
    const abort = new AbortController();
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    fetch(src, { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Model unavailable");
        return response.arrayBuffer();
      })
      .then((buffer) => loader.parseAsync(buffer, ""))
      .then((gltf) => {
        if (disposed) { release(gltf.scene); return; }
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const scale = 4.5 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        const center = box.getCenter(new THREE.Vector3());
        model.position.copy(center.multiplyScalar(-scale));
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) { child.castShadow = true; child.receiveShadow = true; }
        });
        scene.add(model);
        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(40, 40),
          new THREE.MeshStandardMaterial({ color: 0xe4e4e1, roughness: 1 }),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -size.y * scale / 2 - 0.2;
        floor.receiveShadow = true;
        scene.add(floor);
        camera.position.set(3.8, 2.2, 4.2).setLength(Math.max(6, 7.15 / camera.aspect));
        controls.update();
        controls.saveState();
        actions.current = {
          reset: () => controls.reset(),
          rotate: (amount) => {
            const offset = camera.position.clone().sub(controls.target);
            offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), amount);
            camera.position.copy(controls.target).add(offset);
            controls.update();
          },
          zoom: (factor) => {
            const offset = camera.position.clone().sub(controls.target);
            offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
            camera.position.copy(controls.target).add(offset);
            controls.update();
          },
        };
        setReady(true);
        setStatus("");
        render();
      })
      .catch(() => {
        if (!disposed) setStatus("The 3D model could not load. Please refresh to try again.");
      });

    return () => {
      disposed = true;
      abort.abort();
      actions.current = null;
      resize.disconnect();
      controls.dispose();
      release(scene);
      light.shadow.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [src, name]);

  return (
    <>
      <div className="drone-scene-canvas" ref={host} />
      {status && <p className="viewer-message" role="status">{status}</p>}
      {ready && <div className="viewer-controls" aria-label="3D view controls">
        <button type="button" onClick={() => actions.current?.rotate(-Math.PI / 6)}>Rotate left</button>
        <button type="button" onClick={() => actions.current?.rotate(Math.PI / 6)}>Rotate right</button>
        <button type="button" aria-label="Zoom in" onClick={() => actions.current?.zoom(0.8)}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => actions.current?.zoom(1.25)}>−</button>
        <button type="button" onClick={() => actions.current?.reset()}>Reset view</button>
      </div>}
    </>
  );
}
