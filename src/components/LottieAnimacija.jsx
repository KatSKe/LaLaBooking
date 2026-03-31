import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LottieAnimacija() {
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    fetch("/animations/location.json")
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);

  if (!animation) return null;

  return (
    <div style={{ width: 200, margin: "0 auto" }}>
      <Lottie animationData={animation} loop />
    </div>
  );
}