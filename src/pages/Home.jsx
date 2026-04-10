import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IME_APLIKACIJE } from "../constants";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="home-page">

      <div className="home-background">

        <div className="home-content">

          <div className={`hero-card ${loaded ? "fade-in" : ""}`}>

            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to {IME_APLIKACIJE}
              </h1>

              <p className="hero-subtitle">
                Find, manage and organize the best offers in one place.
              </p>
            </div>

            <div className="hero-animation">
              <DotLottieReact
                src="/animations/location.lottie"
                loop
                autoplay
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}