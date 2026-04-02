import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IME_APLIKACIJE } from "../constants";

export default function Home() {
  return (
    <div className="hero home-background">
      <div className="overlay" />

      <div className="glass-card">
        <h1 className="hero-title">
          Welcome to {IME_APLIKACIJE}
        </h1>

        <p className="hero-subtitle">
          Find and manage the best offers easily
        </p>

        <div className="lottie-center">
          <DotLottieReact
            src="/animations/location.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}