import { memo } from "react";
import { useGetCharacter } from "../model/useGetCharacter";

interface Props {
  ptyType?: string;
  currentTemperature?: string;
  width?: number;
  height?: number;
}
export default memo(function CharacterCanvas({
  ptyType = "0",
  currentTemperature = "0",
  width = 160,
  height = 160,
}: Props) {
  const { mountRef, ready } = useGetCharacter({
    ptyType,
    currentTemperature,
    width,
    height,
  });
  return (
    <div className="relative" style={{ width, height }}>
      <div ref={mountRef} className="relative w-full h-full" />
      {!ready && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#83B3FF]" />
      )}
    </div>
  );
});
