import { useState } from "react";


const PHOTO_FILE = "WhatsApp Image 2026-11-15 at 07.04.03.jpeg";
const PHOTO = `${import.meta.env.BASE_URL}${encodeURIComponent(PHOTO_FILE)}`;

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__photo">
          {photoFailed ? (
            <div className="hero__placeholder" aria-label="Photo placeholder">
              OTA
            </div>
          ) : (
            <img
              src={PHOTO}
              alt="Ombaso Trevor Ayunga"
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>

        <div className="hero__text">
          <p className="hero__greeting">Hey, I&apos;m</p>
          <h1>Ombaso Trevor Ayunga</h1>
          <p className="hero__role">Full Stack Developer</p>
          <p className="hero__bio">
            I design and build web applications from database to interface.
            Browse the projects I&apos;ve worked on below.
          </p>
          <a className="btn" href="#work">
            View my work
          </a>
        </div>
      </div>
    </section>
  );
}