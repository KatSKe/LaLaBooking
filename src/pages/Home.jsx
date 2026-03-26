import { IME_APLIKACIJE } from "../constants";
import Lottie from "lottie-react";
import animationData from "../assets/AISpark_InteractiveAssistant.lottie";

export default function Home() {
    return (
        <div className="hero">
            <div className="overlay" />

            <div >

                <h1 className="hero-title">
Welcome to {IME_APLIKACIJE}  
                </h1> 
           
<Lottie className="lottie-wrapper"
                    
                    animationData={animationData} />
           
           

            </div>
        </div>
    );
}