import React from "react";
import NeuralNoise from "@/components/nurui/neural-background";

const NeuralBackgroundDemo = () => {
  return (
    <div className="relative z-10 h-[650px] w-full overflow-hidden rounded-lg">
      <NeuralNoise />
    </div>
  );
};

export default NeuralBackgroundDemo;
