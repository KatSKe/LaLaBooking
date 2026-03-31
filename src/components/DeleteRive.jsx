import { useRive } from "@rive-app/react-canvas";

export default function DeleteRive() {
  const { RiveComponent } = useRive({
    src: "/animations/delete.riv",
    autoplay: true,
  });

  return (
    <div style={{ width: 20 }}>
      <RiveComponent />
    </div>
  );
}