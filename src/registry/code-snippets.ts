export interface CodeSnippet {
  code: string;
  language?: string;
  isLanguage?: boolean;
}

export const codeSnippetsMap: Record<string, CodeSnippet> = {
  // shared utils — used by every component
  "utils-ts": {
    language: "ts",
    code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  },

  "use-mouse-position-ts": {
    language: "ts",
    code: `import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
if (typeof window === "undefined") return;

    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };

}, []);

return mousePosition;
}`,
  },

  // per-component CSS snippets
  "gradient-button-css": {
    language: "css",
    isLanguage: false,
    code: ` @keyframes rotate-rainbow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

.rainbow-btn {
padding: var(--borderWidth);
border-radius: var(--borderRadius);
}

.rainbow-btn::before {
content: "";
background: conic-gradient(var(--allColors));
animation: rotate-rainbow var(--duration) linear infinite;
filter: blur(var(--blur));
padding: var(--borderWidth);
position: absolute;
inset: -200%;
z-index: 0;
}

.btn-content {
border-radius: var(--borderRadius);
background-color: var(--bgColor);
z-index: 10;
position: relative;
}`,
  },

  "digital-hero-css": {
    language: "css",
    isLanguage: false,
    code: `
.grow-underline {
  animation: growUnderline 1.5s ease-in-out forwards;
}

.scanline {
  animation: scanlineAnim 4s linear infinite;
}

@keyframes growUnderline {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes scanlineAnim {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}`,
  },

  "playing-card-css": {
    language: "css",
    isLanguage: false,
    code: `
@import "tw-animate-css";

:root {
--playingcard-bg: #18192b;
--playingcard-fg: #f8fafc;
--playingcard-outline-color: #3d3759;
--playingcard-hover-outline-color: #7c6ee6;
--playingcard-canvas-bg: #23244a;
--playingcard-canvas-colors: "143,108,255;99,102,241;80,115,184";
--playingcard-inscription-color: #00a9fe;
--playingcard-inscription-color-hover: #8F04A7;
}

.dark {
--playingcard-bg: #f8fafc;
--playingcard-fg: #0f172a;
--playingcard-outline-color: #ddd;
--playingcard-hover-outline-color: #aaa;
--playingcard-canvas-bg: #f8fafc;
--playingcard-canvas-colors: "236,72,153;232,121,249";
--playingcard-inscription-color: #3662f4;
--playingcard-inscription-color-hover: #f12b30;
}
`,
  },

  "info-card-css": {
    language: "css",
    isLanguage: false,
    code: `

@import "tw-animate-css";

:root {
--border-color-1: #ff5613;
--border-color-2: #9f4eff;
--border-color-3: #2196f3;
--border-bg-color: #f5f5f5;
--card-bg-color: #fff;
--shadow-color: #e0e0e0;
--text-color: #242424;
--hover-text-color-1: #000;
--hover-text-color-2: #fff;
--hover-text-color-3: #fff;
--font-family: "Roboto Mono", monospace;
--rtl-font-family: "Montserrat", sans-serif;
--pattern-color1: rgba(200, 200, 200, 0.1);
--pattern-color2: rgba(220, 220, 220, 0.1);
}

.dark {
--border-color-1: #daff3e;
--border-color-2: #9f4eff;
--border-color-3: #2196f3;
--border-bg-color: #242424;
--card-bg-color: #000;
--shadow-color: #242424;
--text-color: #f5f5f5;
--hover-text-color-1: #242424;
--hover-text-color-2: #000;
--hover-text-color-3: #242424;
--font-family: "Roboto Mono", monospace;
--rtl-font-family: "Montserrat", sans-serif;
--pattern-color1: rgba(230, 230, 230, 0.15);
--pattern-color2: rgba(240, 240, 240, 0.15);
}
`,
  },

  "wave-card-css": {
    language: "css",
    isLanguage: false,
    code: `

  @import "tw-animate-css";

@keyframes float {
0%, 100% {
transform: translateY(0);
}
50% {
transform: translateY(-10px);
}
}

@keyframes dataStream {
0% {
stroke-dashoffset: 20;
}
100% {
stroke-dashoffset: 0;
}
}

@keyframes schemaPulse {
0%, 100% {
transform: scale(1);
opacity: 0.8;
}
50% {
transform: scale(1.02);
opacity: 1;
}
}
`,
  },

  "dynamic-card-css": {
    language: "css",
    isLanguage: false,
    code: `
@import "tailwindcss";
@import "tw-animate-css";

@keyframes float {
0% {
transform: translateY(0px);
}
50% {
transform: translateY(-10px);
}
100% {
transform: translateY(0px);
}
}
    `,
  },

  "shiny-card-css": {
    language: "css",
    isLanguage: false,
    code: `
.shiny-card {
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --line: hsl(240, 9%, 17%);
  --primary: var(--primary-color);
  gap: 1rem;
  padding: 1rem;
  background-color: hsla(240, 15%, 9%, 1);
  background-image:
    radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
    radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
    radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);

border-radius: 1rem;
box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;

border: 2px solid var(--primary);
animation: border-color-change 3s linear infinite;
}

@keyframes border-color-change {
0% {
border-color: var(--primary);
}

50% {
border-color: var(--line);
}

100% {
border-color: var(--primary);
}
}
`,
  },

  "rocket-footer-css": {
    language: "css",
    isLanguage: false,
    code: `
#FooterScrollToTop {
  display: block;
  height: 6rem;
  margin: 0 auto;
  position: relative;
  width: 6rem;
}

#FooterScrollToTop #ToTopRocketSVG {
overflow: visible;
width: 26px;
}

#FooterScrollToTop #ToTopRocket,
#FooterScrollToTop #ToTopRocketWindow {
fill: var(--primary-color);
}

#FooterScrollToTop #ToTopRocketFlame {
fill: transparent;
transform-box: fill-box;
transform-origin: 50% 0;
}

#FooterScrollToTop .ToTopRocketBg {
fill: var(--background-color);
}

#FooterScrollToTop .FooterScrollToTopText {
bottom: 15px;
color: var(--primary-color);
font-size: 1rem;
font-weight: 400;
font-weight: 700;
left: 0;
line-height: 1.75rem;
line-height: 1;
position: absolute;
text-align: center;
width: calc(6rem - 2px);
}

#FooterScrollToTop .FooterScrollToTopButton {
border: 1px solid var(--border-color);
border-radius: 50%;
box-sizing: border-box;
color: #fff;
cursor: pointer;
display: block;
height: 6rem;
line-height: 0;
position: relative;
text-align: center;
width: 6rem;
}

@media (min-width: 769px) and (max-width: 1024px) {
#FooterScrollToTop .FooterScrollToTopButton {
box-shadow: 0 2px 2px rgba(63, 92, 110, 0.15);
}
}

@media (min-width: 1025px) {
#FooterScrollToTop .FooterScrollToTopButton {
box-shadow: 0 2px 2px rgba(63, 92, 110, 0.15);
}
}

#FooterScrollToTop .FooterScrollToTopButton .FooterScrollToTopRocket {
display: flex;
justify-content: center;
align-items: center;
height: 48px;
left: 0;
margin: 0 auto;
outline: none;
overflow: visible;
position: absolute;
top: 1.5rem;
width: calc(6rem - 2px);
}

#FooterScrollToTop .FooterScrollToTopButton.canHover:hover #ToTopRocket {
fill: var(--primary-color);
animation: rocketShake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite
alternate;
transform: translateZ(0);
}

#FooterScrollToTop .FooterScrollToTopButton.canHover:hover #ToTopRocketWindow {
fill: var(--secondary-color);
animation: rocketShake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite
alternate;
transform: translateZ(0);
}

#FooterScrollToTop .FooterScrollToTopButton #ToTopRocketWindow {
fill: var(--secondary-color);
}

#FooterScrollToTop .FooterScrollToTopButton.canHover:hover #ToTopRocketFlame {
fill: rgb(255, 170, 0);
animation: rocketFlame 0.8s ease-in-out infinite;
transform: scale(1);
}

#FooterScrollToTop .FooterRocketLaunch,
#FooterScrollToTop .FooterRocketLaunch:hover {
pointer-events: none;
}

#FooterScrollToTop .FooterRocketLaunch .FooterScrollToTopRocket,
#FooterScrollToTop .FooterRocketLaunch:hover .FooterScrollToTopRocket {
background-position: 50% -62px;
transition-property: transform;
transition-timing-function: ease-in;
z-index: 50;
position: fixed;
top: 50%;
left: 50%;
transform: translateX(-50%);
}

#FooterScrollToTop .FooterRocketLaunch #ToTopRocket,
#FooterScrollToTop .FooterRocketLaunch:hover #ToTopRocket {
fill: var(--secondary-color);
}

#FooterScrollToTop .FooterRocketLaunch #ToTopRocketWindow,
#FooterScrollToTop .FooterRocketLaunch:hover #ToTopRocketWindow {
fill: var(--primary-color);
}

#FooterScrollToTop .FooterRocketLaunch #ToTopRocketFlame,
#FooterScrollToTop .FooterRocketLaunch:hover #ToTopRocketFlame {
fill: #fa0;
animation: none;
transform: scale(1.5, 2);
}

@keyframes rocketShake {
10%,
90% {
transform: translate3d(-1px, 0, 0);
}

20%,
80% {
transform: translate3d(1px, 0, 0);
}

30%,
50%,
70% {
transform: translate3d(-2px, 0, 0);
}

40%,
60% {
transform: translate3d(2px, 0, 0);
}
}

@keyframes rocketFlame {
10%,
90% {
transform: scale(0.7, 0.6);
}

20%,
80% {
transform: scale(1);
}

30%,
50%,
70% {
transform: scale(0.6, 0.4);
}

40%,
60% {
transform: scale(1.1, 1.3);
}
}

.shakeRocket {
animation: shakeAnimation 0.1s ease-in-out infinite;
}

.flyRocket {
animation: flyAnimation 10s ease-in-out;
}

@keyframes shakeAnimation {
0% {
margin-left: 0px;
}

25% {
margin-left: 2px;
}

75% {
margin-left: 0px;
}

100% {
margin-left: -2px;
}
}

@keyframes flyAnimation {
0% {
margin-top: 0px;
}

2% {
margin-top: -2px;
}

3% {
margin-top: -4px;
}

4% {
margin-top: -5px;
}

100% {
margin-top: -5px;
}
}

.animate-shake:hover {
/_ Start the shake animation and make the animation last for 0.5 seconds _/
animation: shake 0.7s;
/_ When the animation is finished, start again _/
animation-iteration-count: infinite;
}

@keyframes shake {
0% {
transform: translate(1px, 1px) rotate(0deg);
}

10% {
transform: translate(-1px, -2px) rotate(-1deg);
}

20% {
transform: translate(-3px, 0px) rotate(1deg);
}

30% {
transform: translate(3px, 2px) rotate(0deg);
}

40% {
transform: translate(1px, -1px) rotate(1deg);
}

50% {
transform: translate(-1px, 2px) rotate(-1deg);
}

60% {
transform: translate(-3px, 1px) rotate(0deg);
}

70% {
transform: translate(3px, 1px) rotate(-1deg);
}

80% {
transform: translate(-1px, -1px) rotate(1deg);
}

90% {
transform: translate(1px, 2px) rotate(0deg);
}

100% {
transform: translate(1px, -2px) rotate(-1deg);
}
}
    `,
  },
  // add more as needed...
};
