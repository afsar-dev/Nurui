"use client";
import React from "react";

const RippleLoader = () => {
  const colors = [
  "#cce4fc", // very light
  "#99c9fa",
  "#66afe0",
  "#3ca2fa", // base color
  "#1f8de6",
  "#1073d1",
  "#095abf",
  "#0347aa",
  "#012f82", // darkest
];

  // Mapping the same animation delays as the original
  const delays = [
    0,   // d-0
    100, // d-1
    200, // d-2
    100, // d-1
    200, // d-2
    200, // d-2
    300, // d-3
    300, // d-3
    400, // d-4
  ];

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            background-color: transparent;
          }
          30% {
            background-color: var(--cell-color);
          }
          60% {
            background-color: transparent;
          }
          100% {
            background-color: transparent;
          }
        }
      `}</style>

      <div className="flex flex-wrap w-[162px] h-[162px]">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              "--cell-color": color,
              animationDelay: `${delays[index]}ms`,
              animation: "ripple 1.5s ease infinite",
            } as React.CSSProperties}
            className="flex-none w-[52px] h-[52px] m-[1px] rounded-md"
          />
        ))}
      </div>
    </>
  );
};

export default RippleLoader;
