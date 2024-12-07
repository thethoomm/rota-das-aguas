import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface ShowMoreTextProps {
  text: string;
  numberOfLines?: number;
  className?: string;
}

export function ShowMoreText({
  text,
  numberOfLines = 6,
  className = "",
}: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false); // Controla exibição do botão

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <View>
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={(e) => {
          const { lines } = e.nativeEvent;
          setShowToggle(lines.length > numberOfLines);
        }}
        className={`${className} text-base`}
      >
        {text}
      </Text>

      {showToggle && (
        <TouchableOpacity onPress={toggleText}>
          <Text className="text-base font-semibold text-black mt-1">
            {isExpanded ? "Ver menos" : "Ver mais"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
