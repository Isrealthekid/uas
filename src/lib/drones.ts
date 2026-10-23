export type DroneSpec = { label: string; value: string };
export type Drone = {
  slug: string;
  name: string;
  category: string;
  missions: string[];
  description: string;
  overview: string;
  icon: "vtol" | "compact" | "fixed-wing";
  image: string;
  poster: string;
  video?: string;
  gallery: string[];
  model?: string;
  specs: DroneSpec[];
  additionalSpecs: DroneSpec[];
  source: string;
};

// Product descriptions and published specifications from briechuas.com/drones/{slug}.
// Studio footage is served from the supplied Briech media bucket.
export const drones: Drone[] = [
  {
    slug: "argini",
    gallery: [1, 2, 3].map((frame) => `/assets/drones/gallery/argini${frame}.jpg`),
    model: "/assets/drones/models/argini.glb",
    missions: ["Reconnaissance", "Surveillance", "VTOL"],
    name: "Argini",
    category: "Hybrid VTOL reconnaissance drone",
    icon: "vtol",
    description:
      "A hybrid VTOL platform built for long-endurance intelligence, surveillance, and reconnaissance. Argini combines vertical take-off and landing with extended aerial coverage.",
    overview:
      "Named after the Hausa word for cheetah, Argini brings together a hybrid airframe, autonomous navigation, and a configurable sensor suite for reconnaissance missions.",
    image: "/assets/drones/argini.jpg",
    poster: "/assets/drones/argini-poster.jpg",
    video: "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/drones/Argini-Studio.mp4",
    specs: [
      { label: "Propulsion", value: "Hybrid electric–fuel cell system" },
      { label: "Endurance", value: "16 hours" },
      { label: "Range", value: "2,000 km" },
      { label: "Max. speed", value: "260 km/h" },
      { label: "Loaded weight", value: "320 kg" },
    ],
    additionalSpecs: [
      { label: "Dimensions", value: "3.7 m × 2.9 m × 0.9 m" },
      { label: "Cruise speed", value: "180 km/h" },
      { label: "Ceiling", value: "7,000 m" },
      { label: "Payload capacity", value: "Up to 120 kg" },
      { label: "Launch", value: "Vertical take-off" },
      { label: "Recovery", value: "Vertical landing" },
    ],
    source: "https://www.briechuas.com/drones/argini",
  },
  {
    slug: "arsenio",
    gallery: [1, 2, 3].map((frame) => `/assets/drones/gallery/arsenio${frame}.jpg`),
    model: "/assets/drones/models/arsenio.glb",
    missions: ["Intelligence", "Surveillance", "Long endurance"],
    name: "Arsenio",
    category: "Long-endurance surveillance drone",
    icon: "vtol",
    description:
      "A VTOL aircraft designed for sustained intelligence and surveillance. Arsenio pairs an eight-hour flight endurance with adaptable payloads for varied reconnaissance needs.",
    overview:
      "Arsenio combines vertical-flight capability with an advanced sensor package. Its configurable payload supports extended observation across different operating environments.",
    image: "/assets/drones/arsenio.jpg",
    poster: "/assets/drones/arsenio-poster.jpg",
    video: "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/drones/Arsenio-Studio.mp4",
    specs: [
      { label: "Propulsion", value: "Advanced electric propulsion" },
      { label: "Endurance", value: "8 hours" },
      { label: "Range", value: "1,800 km" },
      { label: "Max. speed", value: "240 km/h" },
      { label: "Loaded weight", value: "290 kg" },
    ],
    additionalSpecs: [
      { label: "Dimensions", value: "3.4 m × 2.7 m × 0.8 m" },
      { label: "Cruise speed", value: "160 km/h" },
      { label: "Ceiling", value: "6,200 m" },
      { label: "Payload capacity", value: "Up to 100 kg" },
      { label: "Launch", value: "Vertical take-off" },
      { label: "Recovery", value: "Vertical landing" },
    ],
    source: "https://www.briechuas.com/drones/arsenio",
  },
  {
    slug: "xander",
    gallery: [1, 2, 3].map((frame) => `/assets/drones/gallery/xander${frame}.jpg`),
    model: "/assets/drones/models/xander.glb",
    missions: ["Reconnaissance", "Surveillance", "Modular payload"],
    name: "Xander",
    category: "Extended reconnaissance platform",
    icon: "vtol",
    description:
      "An unmanned platform for extended intelligence, surveillance, and reconnaissance. Xander combines hybrid VTOL capability with modular sensors and six-hour endurance.",
    overview:
      "Xander is designed around sustained aerial observation, with configurable sensor and communication payloads and a hybrid electric propulsion system.",
    image: "/assets/drones/xander.jpg",
    poster: "/assets/drones/xander-poster.jpg",
    video: "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/drones/Xander-Studio.mp4",
    specs: [
      { label: "Propulsion", value: "Hybrid electric system" },
      { label: "Endurance", value: "6 hours" },
      { label: "Range", value: "2,400 km" },
      { label: "Max. speed", value: "250 km/h" },
      { label: "Loaded weight", value: "350 kg" },
    ],
    additionalSpecs: [
      { label: "Dimensions", value: "4.0 m × 3.1 m × 1.0 m" },
      { label: "Cruise speed", value: "170 km/h" },
      { label: "Ceiling", value: "7,500 m" },
      { label: "Payload capacity", value: "Up to 110 kg" },
      { label: "Launch", value: "Vertical take-off" },
      { label: "Recovery", value: "Vertical landing" },
    ],
    source: "https://www.briechuas.com/drones/xander",
  },
  {
    slug: "bfly",
    gallery: [1, 2, 3].map((frame) => `/assets/drones/gallery/bfly${frame}.jpg`),
    model: "/assets/drones/models/bfly.glb",
    missions: ["Tactical", "Reconnaissance", "Rapid deployment"],
    name: "Bfly",
    category: "Compact reconnaissance drone",
    icon: "compact",
    description:
      "A compact reconnaissance aircraft designed for rapid deployment. Bfly brings aerial intelligence into a smaller platform, with three-hour flight endurance and a configurable sensor array.",
    overview:
      "Built for mobility and real-time observation, Bfly combines a compact airframe with electric propulsion and a lightweight sensor package.",
    image: "/assets/drones/bfly.jpg",
    poster: "/assets/drones/bfly-poster.jpg",
    video: "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/drones/B-Fly-Studio.mp4",
    specs: [
      { label: "Propulsion", value: "Advanced electric motor" },
      { label: "Endurance", value: "3 hours" },
      { label: "Range", value: "950 km" },
      { label: "Max. speed", value: "220 km/h" },
      { label: "Loaded weight", value: "120 kg" },
    ],
    additionalSpecs: [
      { label: "Dimensions", value: "1.8 m × 1.5 m × 0.5 m" },
      { label: "Cruise speed", value: "150 km/h" },
      { label: "Ceiling", value: "5,000 m" },
      { label: "Payload capacity", value: "Up to 40 kg" },
      { label: "Launch", value: "Vertical take-off" },
      { label: "Recovery", value: "Vertical landing" },
    ],
    source: "https://www.briechuas.com/drones/bfly",
  },
  {
    slug: "damisa",
    model: "/assets/drones/models/damisa.glb",
    gallery: [1, 2, 3].map((frame) => `/assets/drones/gallery/damisa${frame}.jpg`),
    missions: ["Tactical", "Combat", "Long endurance"],
    name: "Damisa",
    category: "Combat unmanned aerial system",
    icon: "fixed-wing",
    description:
      "A purpose-built combat unmanned aerial system with extended endurance. Damisa combines an aerodynamic airframe with adaptable payload capacity for demanding operational requirements.",
    overview:
      "Named after the Hausa word for tiger, Damisa is part of Briech’s unmanned aircraft family, with a published sixteen-hour endurance and configurable onboard payload.",
    image: "/assets/drones/damisa.jpg",
    poster: "/assets/drones/damisa.jpg",
    video: "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/drones/Damisa-Studio.mp4",
    specs: [
      { label: "Propulsion", value: "Advanced turbofan engine" },
      { label: "Endurance", value: "16 hours" },
      { label: "Range", value: "1,200 km" },
      { label: "Max. speed", value: "380 km/h" },
      { label: "Loaded weight", value: "520 kg" },
    ],
    additionalSpecs: [
      { label: "Dimensions", value: "4.2 m × 3.8 m × 1.2 m" },
      { label: "Cruise speed", value: "280 km/h" },
      { label: "Ceiling", value: "6,500 m" },
      { label: "Payload capacity", value: "Up to 180 kg" },
      { label: "Launch", value: "Vertical take-off" },
      { label: "Recovery", value: "Vertical landing" },
    ],
    source: "https://www.briechuas.com/drones/damisa",
  },
];

export function getDrone(slug: string) {
  return drones.find((drone) => drone.slug === slug);
}
