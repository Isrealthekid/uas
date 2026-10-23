import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";

export default function NotFound() {
  return (
    <main className="information-page not-found-page">
      <p className="projects-eyebrow">404 — Page not found</p>
      <h1>This page is out of reach.</h1>
      <p>The address may be incorrect, or the page may have moved. Use the links below to find your way back.</p>
      <div className="information-actions">
        <Link className="drone-learn-more" href="/">Back to home <ArrowIcon direction="right" /></Link>
        <Link className="information-text-link" href="/projects">Explore projects <ArrowIcon /></Link>
        <Link className="information-text-link" href="/contact">Contact us <ArrowIcon /></Link>
      </div>
    </main>
  );
}
