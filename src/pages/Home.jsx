import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IME_APLIKACIJE } from "../constants";

export default function Home() {
  return (
    <div className="hero">
      <div className="overlay" />

      <div>
        <h1 className="hero-title">
          Welcome to {IME_APLIKACIJE}
        </h1>

        <DotLottieReact 
            src="/animations/location.lottie"
            loop
            autoplay
        />

      </div>
    </div>
  );
}