import { View } from "react-native";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <View
      id="separator"
      className={`h-0.5 bg-zinc-200 rounded-full mx-6 mb-4 ${className}`}
    />
  );
}
