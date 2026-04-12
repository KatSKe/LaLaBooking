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
        <div className="home-overlay">
          <div className="home-container">

            <div className={`home-card ${loaded ? "fade-in" : ""}`}>

              <div className="home-text">
                <h1 className="home-title">
                  Welcome to {IME_APLIKACIJE}
                </h1>

                <p className="home-subtitle">
                  Find, manage and organize the best offers in one place.
                </p>
              </div>

              <div className="home-animation">
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
    </div>
  );
}