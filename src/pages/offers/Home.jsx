import { IME_APLIKACIJE } from "../../constants";
import LottieAnimacija from "../../components/LottieAnimacija";

export default function Home() {
    return (
        <div className="hero">
            <div className="overlay" />

            <div>
                <h1 className="hero-title">
                    Welcome to {IME_APLIKACIJE}
                </h1>

                <LottieAnimacija />
            </div>
        </div>
    );
}