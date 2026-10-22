"use client";

import { useEffect, useRef, useState } from "react";

const videoSource =
  "https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/%28U%20A%20S%29.mp4";

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m7 4 8 6-8 6V4Z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Hero() {
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  const fullVideo = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const resumeOnClose = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = backgroundVideo.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (!video) return;
      video.muted = true;
      video.autoplay = !reducedMotion.matches;
      if (reducedMotion.matches || dialog.current?.open) video.pause();
      else void video.play().catch(() => {});
    };
    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () =>
      reducedMotion.removeEventListener("change", syncMotionPreference);
  }, []);

  async function togglePlayback() {
    const video = backgroundVideo.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setVideoError(true);
      }
    } else video.pause();
  }

  function openVideo() {
    resumeOnClose.current = !backgroundVideo.current?.paused;
    backgroundVideo.current?.pause();
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    if (fullVideo.current) {
      fullVideo.current.currentTime = 0;
      void fullVideo.current.play().catch(() => {});
    }
  }

  function onDialogClose() {
    fullVideo.current?.pause();
    document.body.style.overflow = "";
    if (
      resumeOnClose.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      void backgroundVideo.current?.play().catch(() => {});
  }

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <video
          ref={backgroundVideo}
          className="hero-video"
          src={videoSource}
          poster="/assets/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setVideoError(true)}
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1 id="hero-heading">
            <span>Engineering</span>
            <span>Africa’s next</span>
            <span>frontier in flight.</span>
          </h1>
          <div className="hero-controls">
            <button
              className="video-button playback-button"
              type="button"
              aria-label={
                playing ? "Pause background video" : "Play background video"
              }
              aria-pressed={playing}
              onClick={togglePlayback}
              disabled={videoError}
            >
              <PlayIcon paused={!playing} />
            </button>
            <button
              className="video-button watch-button"
              type="button"
              onClick={openVideo}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="m6 3 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Watch full video
            </button>
          </div>
          {videoError && (
            <p className="video-error" role="status">
              Background video unavailable. You can still open the full video.
            </p>
          )}
        </div>
      </section>
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-label="Briech UAS full video"
        onClose={onDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="video-dialog-inner">
          <div className="video-dialog-heading">
            <p>Briech UAS — Our story</p>
            <button
              className="dialog-close"
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close full video"
              autoFocus
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <video
            ref={fullVideo}
            className="full-video"
            src={videoSource}
            controls
            playsInline
            preload="none"
            aria-label="Briech UAS company video"
          >
            Your browser does not support embedded video.{" "}
            <a href={videoSource}>Open the video.</a>
          </video>
        </div>
      </dialog>
    </>
  );
}
