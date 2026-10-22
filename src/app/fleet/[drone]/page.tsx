import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { drones, getDrone } from "@/lib/drones";
import { DroneIcon } from "@/components/drone-icon";
import { DroneMedia } from "@/components/drone-media";
import { DroneSpecs } from "@/components/drone-specs";

type Props = { params: Promise<{ drone: string }> };

export function generateStaticParams() {
  return drones.map((drone) => ({ drone: drone.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const drone = getDrone((await params).drone);
  if (!drone) return { title: "Aircraft not found | Briech UAS" };
  return {
    title: `${drone.name} | Briech UAS`,
    description: drone.description,
  };
}

export default function DronePage({ params }: Props) {
  return (
    <main className="drone-page">
      <Suspense fallback={<p role="status" className="drone-page-heading">Loading aircraft details…</p>}>
        <DroneDetails params={params} />
      </Suspense>
    </main>
  );
}

async function DroneDetails({ params }: Props) {
  const drone = getDrone((await params).drone);
  if (!drone) notFound();
  return (
    <>
      <div className="drone-page-heading">
        <span>{drone.category}</span>
        <h1>{drone.name}</h1>
      </div>
      <div className="drone-split drone-page-split">
        <div className="drone-summary">
          <DroneIcon variant={drone.icon} />
          <h2>Built for the mission.</h2>
          <p className="drone-description">{drone.description}</p>
          <p className="drone-overview">{drone.overview}</p>
          <a
            className="drone-learn-more"
            href={`mailto:info@briechuas.com?subject=${encodeURIComponent(`${drone.name} enquiry`)}`}
          >
            Enquire about {drone.name}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <DroneMedia drone={drone} />
      </div>
      <section
        className="drone-full-specs"
        aria-labelledby="specifications-heading"
      >
        <h2 id="specifications-heading">Specifications</h2>
        <DroneSpecs
          specs={[...drone.specs, ...drone.additionalSpecs]}
          label={`${drone.name} specifications`}
        />
      </section>
      <div className="drone-page-footer">
        <Link href="/#fleet">
          Explore the full fleet <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}
