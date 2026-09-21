export interface CliDependency {
  label: string;
  command: string;
}

export const cliDependenciesMap: Record<string, CliDependency[]> = {
  "neobrutalism-faq": [
    { label: "npm", command: "npm i lucide-react" },
    { label: "pnpm", command: "pnpm add lucide-react" },
    { label: "bun", command: "bun add lucide-react" },
    { label: "yarn", command: "yarn add lucide-react" },
  ],
  "glassy-faq": [
    { label: "npm", command: "npm i react-icons" },
    { label: "pnpm", command: "pnpm add react-icons" },
    { label: "bun", command: "bun add react-icons" },
    { label: "yarn", command: "yarn add react-icons" },
  ],
  "premium-testimonial": [
    { label: "npm", command: "npm i framer-motion lucide-react" },
    { label: "pnpm", command: "pnpm add framer-motion lucide-react" },
    { label: "bun", command: "bun add framer-motion lucide-react" },
    { label: "yarn", command: "yarn add framer-motion lucide-react" },
  ],
  "marquee-testimonial": [
    { label: "npm", command: "npm i react-icons clsx tailwind-merge" },
    { label: "pnpm", command: "pnpm add react-icons clsx tailwind-merge" },
    { label: "bun", command: "bun add react-icons clsx tailwind-merge" },
    { label: "yarn", command: "yarn add react-icons clsx tailwind-merge" },
  ],
  "creative-pricing": [
    {
      label: "npm",
      command:
        "npm i clsx tailwind-merge lucide-react @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "pnpm",
      command:
        "pnpm add clsx tailwind-merge lucide-react @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "bun",
      command:
        "bun add clsx tailwind-merge lucide-react @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "yarn",
      command:
        "yarn add clsx tailwind-merge lucide-react @radix-ui/react-slot class-variance-authority",
    },
  ],

  "future-navbar": [
    {
      label: "npm",
      command:
        "npm i class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "pnpm",
      command:
        "pnpm add class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "bun",
      command:
        "bun add class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "yarn",
      command:
        "yarn add class-variance-authority clsx tailwind-merge lucide-react",
    },
  ],

  "hover-footer": [
    {
      label: "npm",
      command: "npm i motion clsx tailwind-merge lucide-react",
    },
    {
      label: "pnpm",
      command: "pnpm add motion clsx tailwind-merge lucide-react",
    },
    {
      label: "bun",
      command: "bun add motion clsx tailwind-merge lucide-react",
    },
    {
      label: "yarn",
      command: "yarn add motion clsx tailwind-merge lucide-react",
    },
  ],
  "rocket-footer": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge react-icons",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge react-icons",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge react-icons",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge react-icons",
    },
  ],

  "project-showcase": [
    { label: "npm", command: "npm i framer-motion" },
    {
      label: "pnpm",
      command: "pnpm add framer-motion",
    },
    {
      label: "bun",
      command: "bun add framer-motion",
    },
    {
      label: "yarn",
      command: "yarn add framer-motion",
    },
  ],
  "animated-list": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge motion/react",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge motion/react",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge motion/react",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge motion/react",
    },
  ],
  "progress-bar": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge ",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge ",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge ",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge ",
    },
  ],
  terminal: [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge motion/react",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge motion/react",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge motion/react",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge motion/react",
    },
  ],
  banner: [
    {
      label: "npm",
      command:
        "npm i lucide-react clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "pnpm",
      command:
        "pnpm add lucide-react clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "bun",
      command:
        "bun add lucide-react clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
    },
    {
      label: "yarn",
      command:
        "yarn add lucide-react clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
    },
  ],
  "news-letter": [
    { label: "npm", command: "npm i react-hot-toast" },
    { label: "pnpm", command: "pnpm add react-hot-toast" },
    { label: "bun", command: "bun add react-hot-toast" },
    { label: "yarn", command: "yarn add react-hot-toast" },
  ],
  story: [
    {
      label: "npm",
      command:
        "npm i clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-dialog lucide-react",
    },
    {
      label: "pnpm",
      command:
        "pnpm add clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-dialog lucide-react",
    },
    {
      label: "bun",
      command:
        "bun add clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-dialog lucide-react",
    },
    {
      label: "yarn",
      command:
        "yarn add clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-dialog lucide-react",
    },
  ],

  "glob-map": [
    {
      label: "npm",
      command:
        "npm i d3 @radix-ui/react-slot class-variance-authority topojson-client clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add d3 @radix-ui/react-slot class-variance-authority topojson-client clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add d3 @radix-ui/react-slot class-variance-authority topojson-client clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add d3 @radix-ui/react-slot class-variance-authority topojson-client clsx tailwind-merge",
    },
  ],
  "rotating-earth": [
    {
      label: "npm",
      command: "npm i d3",
    },
    {
      label: "pnpm",
      command: "pnpm add d3",
    },
    {
      label: "bun",
      command: "bun add d3",
    },
    {
      label: "yarn",
      command: "yarn add d3",
    },
  ],

  "bars-background": [
    {
      label: "npm",
      command: "npm i  motion/react",
    },
    {
      label: "pnpm",
      command: "pnpm add  motion/react",
    },
    {
      label: "bun",
      command: "bun add  motion/react",
    },
    {
      label: "yarn",
      command: "yarn add  motion/react",
    },
  ],
  "jump-background": [
    {
      label: "npm",
      command: "npm i  clsx tailwind-merge motion/react",
    },
    {
      label: "pnpm",
      command: "pnpm add  clsx tailwind-merge motion/react",
    },
    {
      label: "bun",
      command: "bun add  clsx tailwind-merge motion/react",
    },
    {
      label: "yarn",
      command: "yarn add  clsx tailwind-merge motion/react",
    },
  ],
  "virus-background": [
    {
      label: "npm",
      command: "npm i gsap",
    },
    {
      label: "pnpm",
      command: "pnpm add gsap",
    },
    {
      label: "bun",
      command: "bun add gsap",
    },
    {
      label: "yarn",
      command: "yarn add gsap",
    },
  ],
  "gradient-background": [
    {
      label: "npm",
      command: "npm i  clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command: "pnpm add  clsx tailwind-merge",
    },
    {
      label: "bun",
      command: "bun add  clsx tailwind-merge",
    },
    {
      label: "yarn",
      command: "yarn add  clsx tailwind-merge",
    },
  ],

  "gradient-button": [
    { label: "npm", command: "npm i clsx tailwind-merge" },
    { label: "pnpm", command: "pnpm add clsx tailwind-merge" },
    { label: "bun", command: "bun add clsx tailwind-merge" },
    { label: "yarn", command: "yarn add clsx tailwind-merge" },
  ],
  "border-button": [
    { label: "npm", command: "npm i clsx tailwind-merge react-icons" },
    { label: "pnpm", command: "pnpm add clsx tailwind-merge react-icons" },
    { label: "bun", command: "bun add clsx tailwind-merge react-icons" },
    { label: "yarn", command: "yarn add clsx tailwind-merge react-icons" },
  ],
  "shadow-button": [
    { label: "npm", command: "npm i react-icons" },
    { label: "pnpm", command: "pnpm add react-icons" },
    { label: "bun", command: "bun add react-icons" },
    { label: "yarn", command: "yarn add react-icons" },
  ],
  "magnet-button": [
    { label: "npm", command: "npm i clsx tailwind-merge motion lucide-react" },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge motion lucide-react",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge motion lucide-react",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge motion lucide-react",
    },
  ],
  "text-button": [
    { label: "npm", command: "npm i gsap @gsap/react clsx tailwind-merge" },
    { label: "pnpm", command: "pnpm add gsap @gsap/react clsx tailwind-merge" },
    { label: "bun", command: "bun add gsap @gsap/react clsx tailwind-merge" },
    { label: "yarn", command: "yarn add gsap @gsap/react clsx tailwind-merge" },
  ],
  "future-button": [
    {
      label: "npm",
      command:
        "npm i class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "pnpm",
      command:
        "pnpm add class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "bun",
      command:
        "bun add class-variance-authority clsx tailwind-merge lucide-react",
    },
    {
      label: "yarn",
      command:
        "yarn add class-variance-authority clsx tailwind-merge lucide-react",
    },
  ],
  "play-button": [
    { label: "npm", command: "npm i react-icons" },
    { label: "yarn", command: "yarn add react-icons" },
    { label: "pnpm", command: "pnpm add react-icons" },
    { label: "bun", command: "bun add react-icons" },
  ],

  "counter-loader": [
    { label: "npm", command: "npm i styled-components" },
    { label: "pnpm", command: "pnpm add styled-components" },
    { label: "bun", command: "bun add styled-components" },
    { label: "yarn", command: "yarn add styled-components" },
  ],

  "playing-card": [
    {
      label: "npm",
      command:
        "npm i clsx tailwind-merge three @react-three/fiber tw-animate-css",
    },
    {
      label: "pnpm",
      command:
        "pnpm add clsx tailwind-merge three @react-three/fiber tw-animate-css",
    },
    {
      label: "bun",
      command:
        "bun add clsx tailwind-merge three @react-three/fiber tw-animate-css",
    },
    {
      label: "yarn",
      command:
        "yarn add clsx tailwind-merge three @react-three/fiber tw-animate-css",
    },
  ],
  "glowing-card": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge ",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge ",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge ",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge ",
    },
  ],
  "info-card": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge tw-animate-css",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge tw-animate-css",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge tw-animate-css",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge tw-animate-css",
    },
  ],
  "wave-card": [
    {
      label: "npm",
      command: "npm i tw-animate-css",
    },
    {
      label: "pnpm",
      command: "pnpm add tw-animate-css",
    },
    {
      label: "bun",
      command: "bun add tw-animate-css",
    },
    {
      label: "yarn",
      command: "yarn add tw-animate-css",
    },
  ],
  "dynamic-card": [
    {
      label: "npm",
      command: "npm i tw-animate-css",
    },
    {
      label: "pnpm",
      command: "pnpm add tw-animate-css",
    },
    {
      label: "bun",
      command: "bun add tw-animate-css",
    },
    {
      label: "yarn",
      command: "yarn add tw-animate-css",
    },
  ],
  "shiny-card": [
    {
      label: "npm",
      command: "npm i react-icons",
    },
    {
      label: "pnpm",
      command: "pnpm add react-icons",
    },
    {
      label: "bun",
      command: "bun add react-icons",
    },
    {
      label: "yarn",
      command: "yarn add react-icons",
    },
  ],

  "contact-form": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge framer-motion",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge framer-motion",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge framer-motion",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge framer-motion",
    },
  ],
  "gaming-form": [
    {
      label: "npm",
      command: "npm i lucide-react",
    },
    {
      label: "pnpm",
      command: "pnpm add lucide-react",
    },
    {
      label: "bun",
      command: "bun add lucide-react",
    },
    {
      label: "yarn",
      command: "yarn add lucide-react",
    },
  ],
  "singin-form": [
    {
      label: "npm",
      command: "npm i clsx tailwind-merge framer-motion lucide-react",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx tailwind-merge framer-motion lucide-react",
    },
    {
      label: "bun",
      command: "bun add clsx tailwind-merge framer-motion lucide-react",
    },
    {
      label: "yarn",
      command: "yarn add clsx tailwind-merge framer-motion lucide-react",
    },
  ],
  "flow-form": [
    {
      label: "npm",
      command: "npm i @react-three/fiber framer-motion clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command: "pnpm add @react-three/fiber framer-motion clsx tailwind-merge",
    },
    {
      label: "bun",
      command: "bun add @react-three/fiber framer-motion clsx tailwind-merge",
    },
    {
      label: "yarn",
      command: "yarn add @react-three/fiber framer-motion clsx tailwind-merge",
    },
  ],

  "video-modal": [
    {
      label: "npm",
      command: "npm i lucide-react clsx tailwind-merge motion",
    },
    {
      label: "pnpm",
      command: "pnpm add lucide-react clsx tailwind-merge motion",
    },
    {
      label: "bun",
      command: "bun add lucide-react clsx tailwind-merge motion",
    },
    {
      label: "yarn",
      command: "yarn add lucide-react clsx tailwind-merge motion",
    },
  ],

  "tech-hero": [
    {
      label: "npm",
      command:
        "npm i framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],
  "gradient-hero": [
    {
      label: "npm",
      command:
        "npm i framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],
  "waves-hero": [
    {
      label: "npm",
      command:
        "npm i framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],
  "research-hero": [
    {
      label: "npm",
      command:
        "npm i framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],
  "spotlight-hero": [
    {
      label: "npm",
      command:
        "npm i lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "pnpm",
      command:
        "pnpm add lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "bun",
      command:
        "bun add lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
    {
      label: "yarn",
      command:
        "yarn add lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge",
    },
  ],

  "draw-cursor": [
    {
      label: "npm",
      command: "npm i gsap",
    },
    {
      label: "pnpm",
      command: "pnpm add gsap",
    },
    {
      label: "bun",
      command: "bun add gsap",
    },
    {
      label: "yarn",
      command: "yarn add gsap",
    },
  ],
  "retro-cursor": [
    {
      label: "npm",
      command: "npm i clsx framer-motion",
    },
    {
      label: "pnpm",
      command: "pnpm add clsx framer-motion",
    },
    {
      label: "bun",
      command: "bun add clsx framer-motion",
    },
    {
      label: "yarn",
      command: "yarn add clsx framer-motion",
    },
  ],
  // add other components as needed...
};
