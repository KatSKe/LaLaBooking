import { IME_APLIKACIJE } from "../constants";
import Lottie from "lottie-react";
import animationData from "../assets/AISpark_InteractiveAssistant.lottie";

export default function Home() {
    return (
        <div
            style={{
                minHeight: "85vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                backgroundImage: "url('/images/bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px"
            }}
        >
            {/* overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(4px)"
                }}
            />

            {/* CONTENT */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <h1
                    style={{
                        fontSize: "3.5rem",
                        fontWeight: "800",
                        letterSpacing: "2px",
                        color: "#ffffff",
                        textShadow: "2px 2px 15px rgba(0,0,0,0.6)",
                        margin: 0
                    }}
                >
                    Welcome to {IME_APLIKACIJE}
                </h1>

                {/* LOTTIE ISPOD NASLOVA */}
                <div style={{ width: "180px" }}>
                    <Lottie animationData={animationData} />
                </div>
            </div>
        </div>
    );
}