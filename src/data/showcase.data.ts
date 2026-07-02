import { IShowcaseItem } from "@/types/showcase.type";

export const showcaseItems: IShowcaseItem[] = [
  {
    id: "1",
    name: "Nur UI Documentation",
    slug: "nurui-docs",
    description: "The official interactive documentation site for Nur UI.",
    longDescription: "The official documentation platform built to showcase the full capabilities of Nur UI. It features real-time syntax highlighted code blocks, TS-to-JS tab transitions, responsive sandbox environments, and an interactive CLI visualizer. Designed with clean layouts and accessible navigation menus.",
    image: "/showcase/nurui-docs.png",
    websiteUrl: "https://nurui.vercel.app",
    tags: ["Documentation", "Official", "Next.js"],
  },
  {
    id: "2",
    name: "Aura Analytics Dashboard",
    slug: "aura-analytics",
    description: "A premium real-time data monitoring and dashboard interface.",
    longDescription: "A premium data analytics application engineered for SaaS teams. It integrates responsive dashboard layouts, dark mode variables, rich D3-based dynamic charts, collapsible side navigation bars, and glassmorphic micro-interaction states. Built entirely using Nur UI components.",
    image: "/showcase/aura-analytics.png",
    websiteUrl: "https://example.com/aura-analytics",
    tags: ["Dashboard", "SaaS", "Data"],
  },
  {
    id: "3",
    name: "Zenith Creative Portfolio",
    slug: "zenith-portfolio",
    description: "An animated, media-rich portfolio for creative designers.",
    longDescription: "A high-performance visual-first portfolio website constructed for modern developers and creative designers. Implements smooth scroll transitions, Framer Motion cards, custom cursor animations, responsive gallery grids, and theme switching utilities powered by Nur UI.",
    image: "/showcase/zenith-portfolio.png",
    websiteUrl: "https://example.com/zenith-portfolio",
    tags: ["Portfolio", "Creative", "Animation"],
  },
];
