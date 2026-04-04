import React from "react";
import GradientText from "@/components/nurui/gradient-text";

const GradientTextDemo = () => {
  return (
    <div className="p-10">
      <GradientText
        colors={["#3ca2fa", "#80eeb4", "#3ca2fa", "#80eeb4", "#3ca2fa"]}
        animationSpeed={3}
        showBorder={false}
        className="text-6xl font-black"
      >
        Welcome to Nur UI
      </GradientText>
    </div>
  );
};

export default GradientTextDemo;
