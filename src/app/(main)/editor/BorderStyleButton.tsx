import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStryle: string) => void;
}
const BorderStyleButton = ({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) => {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const newIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[newIndex]);
  }
  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      className="  border-gray-300 bg-white hover:bg-gray-50"
      onClick={handleClick}
    >
      <Icon className="size-5 text-gray-700" />
    </Button>
  );
};
export default BorderStyleButton;
