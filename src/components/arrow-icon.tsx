export function ArrowIcon({
  direction = "up-right",
}: {
  direction?: "up-right" | "right";
}) {
  return (
    <svg
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={
          direction === "right"
            ? "M3 10h14m-6-6 6 6-6 6"
            : "M5 15 15 5M5 5h10v10"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
