import { IME_APLIKACIJE } from "../constants";
import Lottie from "lottie-react";
import animationData from "../assets/AISpark_InteractiveAssistant.lottie";

export default function Home(){
    return(
    <>
    
    <div style={{
            minHeight: "85vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            backgroundImage: "url('/images/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>

                <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(4px)"
            }} />

                <h1 style={{
                position: "relative",
                zIndex: 1,
                fontSize: "3.5rem",
                fontWeight: "800",
                letterSpacing: "2px",
                color: "#ffffff",
                textShadow: "2px 2px 15px rgba(0,0,0,0.6)"
            }}>
                Welcome to {IME_APLIKACIJE}

                <Lottie animationData={animationData} style={{ height: 250 }} />
            </h1>

        </div>
    
    </>
    )
}