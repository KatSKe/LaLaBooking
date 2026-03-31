import { useRive } from "@rive-app/react-canvas";

export default function RiveLoader() {
  const { RiveComponent } = useRive({
    src: "/animations/search.riv",
    autoplay: true,
  });

  return (
    <div className="rive-wrapper">
      <RiveComponent />
    </div>
  );
}