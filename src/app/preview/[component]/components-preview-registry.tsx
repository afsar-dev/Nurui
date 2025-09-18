import React from "react";
import dynamic from "next/dynamic";

export const componentsPreviewRegistry: Record<
  string,
  { component: React.ComponentType }
> = {
  // sections
  "neobrutalism-faq": {
    component: dynamic(
      () => import("@/components/nurui/neobrutalism-faq-demo"),
    ),
  },
  "glassy-faq": {
    component: dynamic(() => import("@/components/nurui/glassy-faq")),
  },
  "premium-testimonial": {
    component: dynamic(
      () => import("@/components/nurui/premium-testimonial-demo"),
    ),
  },
  "marquee-testimonial": {
    component: dynamic(
      () => import("@/components/nurui/marquee-testimonial-demo"),
    ),
  },
  "animated-pricing": {
    component: dynamic(() =>
      import("@/components/nurui/animated-pricing-demo").then(
        (mod) => mod.AnimatedPricingDemo,
      ),
    ),
  },
  "creative-pricing": {
    component: dynamic(() =>
      import("@/components/nurui/creative-pricing-demo").then(
        (mod) => mod.CreativePricingDemo,
      ),
    ),
  },
  "grid-feature": {
    component: dynamic(() => import("@/components/nurui/grid-feature-demo")),
  },
  // header
  "future-navbar": {
    component: dynamic(() => import("@/components/nurui/futrue-navbar")),
  },
  // footer
  "hover-footer": {
    component: dynamic(() => import("@/components/nurui/hover-footer")),
  },
  // components
  "project-showcase": {
    component: dynamic(
      () => import("@/components/nurui/project-showcase-demo"),
    ),
  },
  "following-eye": {
    component: dynamic(() =>
      import("@/components/nurui/following-eye-demo").then(
        (mod) => mod.FollowingEyeDemo,
      ),
    ),
  },
  "animated-list": {
    component: dynamic(() =>
      import("@/components/nurui/animated-list-demo").then(
        (mod) => mod.AnimatedListDemo,
      ),
    ),
  },
  banner: {
    component: dynamic(() => import("@/components/nurui/banner-demo")),
  },
  "banner-close": {
    component: dynamic(() => import("@/components/nurui/banner-close-demo")),
  },
  "progress-bar": {
    component: dynamic(() =>
      import("@/components/nurui/progress-bar-demo").then(
        (mod) => mod.ProgressBarDemo,
      ),
    ),
  },
  terminal: {
    component: dynamic(() =>
      import("@/components/nurui/terminal-demo").then(
        (mod) => mod.TerminalDemo,
      ),
    ),
  },
  "news-letter": {
    component: dynamic(() => import("@/components/nurui/news-letter")),
  },
  story: {
    component: dynamic(() =>
      import("@/components/nurui/story-demo").then((mod) => mod.StoryDemo),
    ),
  },
  // background
  "bars-background": {
    component: dynamic(() => import("@/components/nurui/bars-background-demo")),
  },
  "gradient-background": {
    component: dynamic(() =>
      import("@/components/nurui/gradient-background").then(
        (mod) => mod.GradientBackground,
      ),
    ),
  },
  "jump-background": {
    component: dynamic(() => import("@/components/nurui/jump-background-demo")),
  },
  "virus-background": {
    component: dynamic(() => import("@/components/nurui/virus-background")),
  },
  "hacker-background": {
    component: dynamic(() => import("@/components/nurui/hacker-background")),
  },
  "neural-background": {
    component: dynamic(() => import("@/components/nurui/neural-background")),
  },
  // texts
  "gradient-text": {
    component: dynamic(() => import("@/components/nurui/gradient-text-demo")),
  },
  // buttons
  "magnet-button": {
    component: dynamic(() => import("@/components/nurui/magnet-button-demo")),
  },
  "gradient-button": {
    component: dynamic(() => import("@/components/nurui/gradient-button-demo")),
  },
  "border-button": {
    component: dynamic(() => import("@/components/nurui/border-button-demo")),
  },
  "shadow-button": {
    component: dynamic(() => import("@/components/nurui/shadow-button-demo")),
  },
  "text-button": {
    component: dynamic(() =>
      import("@/components/nurui/text-button-demo").then(
        (mod) => mod.TextButtonDemo,
      ),
    ),
  },
  "play-button": {
    component: dynamic(() => import("@/components/nurui/play-button-demo")),
  },
  "copy-button": {
    component: dynamic(() => import("@/components/nurui/copy-button-demo")),
  },
  // cards
  "playing-card": {
    component: dynamic(() => import("@/components/nurui/playing-card-demo")),
  },
  "info-card": {
    component: dynamic(() =>
      import("@/components/nurui/info-card-demo").then(
        (mod) => mod.InfoCardDemo,
      ),
    ),
  },
  "wave-card": {
    component: dynamic(() => import("@/components/nurui/wave-card-demo")),
  },
  "shiny-card": {
    component: dynamic(() => import("@/components/nurui/shiny-card-demo")),
  },
  "dynamic-card": {
    component: dynamic(() =>
      import("@/components/nurui/dynamic-card-demo").then(
        (mod) => mod.DynamicCardDemo,
      ),
    ),
  },
  "spotlight-card": {
    component: dynamic(() =>
      import("@/components/nurui/spotlight-card-demo").then(
        (mod) => mod.SpotLightCardDemo,
      ),
    ),
  },
  "glowing-card": {
    component: dynamic(() => import("@/components/nurui/glowing-card-demo")),
  },
  // forms
  "contact-form": {
    component: dynamic(() => import("@/components/nurui/contact-form-demo")),
  },
  "gaming-form": {
    component: dynamic(() => import("@/components/nurui/gaming-form-demo")),
  },
  "singin-form": {
    component: dynamic(() =>
      import("@/components/nurui/singin-form-demo").then(
        (mod) => mod.SingInFormDemo,
      ),
    ),
  },
  "flow-form": {
    component: dynamic(() =>
      import("@/components/nurui/flow-form-demo").then(
        (mod) => mod.FlowFormDemo,
      ),
    ),
  },
  // modals
  "video-modal": {
    component: dynamic(() => import("@/components/nurui/video-modal-demo")),
  },
  // hero
  "tech-hero": {
    component: dynamic(() => import("@/components/nurui/tech-hero-demo")),
  },
  "gradient-hero": {
    component: dynamic(() => import("@/components/nurui/gradient-hero")),
  },
  "waves-hero": {
    component: dynamic(() => import("@/components/nurui/waves-hero-demo")),
  },
  "digital-hero": {
    component: dynamic(() => import("@/components/nurui/digital-hero-demo")),
  },
  "research-hero": {
    component: dynamic(() => import("@/components/nurui/research-hero-demo")),
  },
  // cursors
  "draw-cursor": {
    component: dynamic(() =>
      import("@/components/nurui/draw-cursor-demo").then(
        (mod) => mod.DrawCursorDemo,
      ),
    ),
  },
  "canvas-cursor": {
    component: dynamic(() => import("@/components/nurui/canvas-cursor-demo")),
  },
  "matrix-cursor": {
    component: dynamic(() => import("@/components/nurui/matrix-cursor-demo")),
  },
  "hacker-cursor": {
    component: dynamic(() => import("@/components/nurui/hacker-cursor-demo")),
  },
  "splash-cursor": {
    component: dynamic(() => import("@/components/nurui/splash-cursor-demo")),
  },
  "terminal-cursor": {
    component: dynamic(() => import("@/components/nurui/terminal-cursor-demo")),
  },
  "code-cursor": {
    component: dynamic(() => import("@/components/nurui/code-cursor-demo")),
  },
  "retro-cursor": {
    component: dynamic(() => import("@/components/nurui/retro-cursor-demo")),
  },
  "money-cursor": {
    component: dynamic(() => import("@/components/nurui/money-cursor-demo")),
  },
  "electric-cursor": {
    component: dynamic(() => import("@/components/nurui/electric-cursor-demo")),
  },
  "tech-cursor": {
    component: dynamic(() => import("@/components/nurui/tech-cursor-demo")),
  },
  "ghost-cursor": {
    component: dynamic(() => import("@/components/nurui/ghost-cursor-demo")),
  },
  "fire-cursor": {
    component: dynamic(() => import("@/components/nurui/fire-cursor-demo")),
  },
};
