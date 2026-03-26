import { IME_APLIKACIJE } from "../constants";
import Lottie from "lottie-react";
import animationData from "../assets/AISpark_InteractiveAssistant.lottie";

export default function Home() {
    return (
        <div className="hero">
            <div className="overlay" />

            <div className="hero-content">

                <h1 className="hero-title">
                    Welcome to {IME_APLIKACIJE}
                </h1>

                <div className="lottie-wrapper">
                    <Lottie animationData={animationData} />
                </div>

            </div>
        </div>
    );
}