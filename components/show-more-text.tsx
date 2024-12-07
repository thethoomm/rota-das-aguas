import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ShowMoreTextProps {
  text: string;
  numberOfLines?: number;
  className?: string;
}

export function ShowMoreText({
  text,
  numberOfLines = 6,
  className,
}: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <View>
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        className={`${className} text-base`}
      >
        {text}
      </Text>
      <TouchableOpacity onPress={toggleText}>
        <Text className="text-base font-semibold text-black mt-1">
          {isExpanded ? "Ver menos" : "Ver mais"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
