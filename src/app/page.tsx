import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { FleetSection } from "@/components/fleet-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <FleetSection />
    </main>
  );
}
