import type { DroneSpec } from "@/lib/drones";

export function DroneSpecs({
  specs,
  label,
}: {
  specs: DroneSpec[];
  label: string;
}) {
  return (
    <dl className="drone-specs" aria-label={label}>
      {specs.map((spec, index) => (
        <div
          className={`drone-spec${index === 0 ? " drone-spec-wide" : ""}`}
          key={spec.label}
        >
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
