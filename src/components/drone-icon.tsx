import type { Drone } from "@/lib/drones";

export function DroneIcon({ variant }: { variant: Drone["icon"] }) {
  return (
    <svg
      className="drone-icon"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {variant === "fixed-wing" ? (
        <path
          d="m24 4 4 14 15 12v5l-15-5v9l5 4v2l-9-3-9 3v-2l5-4v-9-0L5 35v-5l15-12L24 4Z"
          fill="currentColor"
        />
      ) : (
        <>
          <path
            d="M24 7c2 0 3 6 3 13l14 5v4l-14-2v10l5 3v3l-8-2-8 2v-3l5-3V27L7 29v-4l14-5c0-7 1-13 3-13Z"
            fill="currentColor"
          />
          {variant === "vtol" ? (
            <path
              d="M14 16v20m20-20v20M9 16h10m10 0h10M9 35h10m10 0h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="m12 18 24 18m0-18L12 36"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </>
      )}
    </svg>
  );
}
