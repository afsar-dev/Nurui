import { ComponentEntry } from "@/types/registry.type";
import { createEntry } from "@/utils/createEntry";

export const Index: Record<string, ComponentEntry> = {
  // sections
  neobrutalismFaq: createEntry("neobrutalism-faq", ["neobrutalism-faq"]),
  glassyFaq: createEntry("glassy-faq", ["glassy-faq", "question-answer"]),

  premiumTestimonial: createEntry("premium-testimonial", [
    "premium-testimonial",
  ]),
  animatedPricing: createEntry("animated-pricing", [
    "modern-pricing-page",
    "multi-type-ripple-buttons",
    "shader-canvas",
  ]),
  creativePricing: createEntry("creative-pricing", [
    "creative-pricing",
    "button",
  ]),
  marqueeTestimonial: createEntry("marquee-testimonial", [
    "marquee",
    "testimonial-card",
    "rating-star",
    "rating-icon",
  ]),
  // navbar
  futureNavbar: createEntry("futrue-navbar", ["future-button", "frame"]),
  // footer
  hoverFooter: createEntry("hover-footer", [
    "text-hover-effect",
    "footer-background-gradient",
  ]),

  // components
  projectShowCase: createEntry("project-showcase", [
    "project-showcase",
    "halomot-button",
  ]),
  followingEye: createEntry("following-eye", ["following-eye"]),
  animatedList: createEntry("animated-list", [
    "animated-lists",
    "notification",
  ]),
  progressBar: createEntry("progress-bar", ["progress-bar"]),
  banner: createEntry("banner", ["banner", "button"]),
  terminal: createEntry("terminal", ["terminal"]),
  bannerCloseExample: createEntry("banner-close", ["banner-close"]),
  story: createEntry("story", ["story", "story-button", "story-dialog"]),
  newsLetter: createEntry("news-letter", ["animated-input"]),

  // buttons
  gradientButton: createEntry("gradient-button", ["gradient-button"]),
  borderButton: createEntry("border-button", ["border-button"]),
  shadowButton: createEntry("shadow-button", ["shadow-button"]),
  textButton: createEntry("text-button", ["text-button"]),
  magnetButton: createEntry("magnet-button", ["magnet-button"]),
  futureButton: createEntry("future-button", ["future-button", "future-frame"]),
  playButton: createEntry("play-button", ["play-button"]),

  // Loaders
  rippleLoader: createEntry("ripple-loader", ["ripple-loader"]),
  counterLoading: createEntry("counter-loader", ["counter-loader"]),

  // cards
  playingCard: createEntry("playing-card", ["playing-card"]),
  glowingCard: createEntry("glowing-card", ["glowing-card"]),
  infoCard: createEntry("info-card", ["info-card"]),
  waveCard: createEntry("wave-card", ["wave-card"]),
  dynamicCard: createEntry("dynamic-card", ["dynamic-card"]),
  spotlightCard: createEntry("spotlight-card", ["spotlight-card"]),
  shinyCard: createEntry("shiny-card", ["shiny-card"]),

  // forms
  contactForm: createEntry("contact-form", [
    "contact-form",
    "background-shine-button",
    "shiny-input",
    "shiny-text-area",
  ]),
  gamingForm: createEntry("gaming-form", ["gaming-form"]),
  singinForm: createEntry("singin-form", ["singin-form"]),
  flowForm: createEntry("flow-form", ["flow-form"]),

  // modals
  videoModal: createEntry("video-modal", ["video-modal"]),
  // },
  gradientHero: createEntry("gradient-hero", ["gradient-grid-hero", "button"]),
  wavesHero: createEntry("waves-hero", ["waves-hero", "button"]),
  digitalHero: createEntry("digital-hero", ["digital-hero"]),
  researchHero: createEntry("research-hero", [
    "sparkles-core",
    "research-hero",
    "floating-paper",
    "robo-animation",
    "button",
  ]),
  spotlightHero: createEntry("spotlight-hero", ["spotlight-hero", "button"]),
  techHero: createEntry("tech-hero", [
    "tech-hero",
    "particle-background",
    "button",
  ]),
  // backgrounds
  barsBackground: createEntry("bars-background", ["gradient-bars"]),
  hackerBackground: createEntry("hacker-background", ["hacker-background"]),
  gradientBackground: createEntry("gradient-background", [
    "gradient-background",
  ]),
  jumpBackground: createEntry("jump-background", ["jump-background"]),
  virusBackground: createEntry("virus-background", ["virus-background"]),
  neuralBackground: createEntry("nural-background", ["neural-background"]),

  // text
  gradientText: createEntry("gradient-text", ["gradient-text"]),
  // cursors
  drawCursor: createEntry("draw-cursor", ["draw-cursor"]),
  canvasCursor: createEntry("canvas-cursor", ["canvas-cursor"]),
  matrixCursor: createEntry("matrix-cursor", ["matrix-cursor"]),
  hackerCursor: createEntry("hacker-cursor", ["hacker-cursor"]),
  splashCursor: createEntry("splash-cursor", ["splash-cursor"]),
  terminalCursor: createEntry("terminal-cursor", ["terminal-cursor"]),
  codeCursor: createEntry("code-cursor", ["code-cursor"]),
  retroCursor: createEntry("retro-cursor", ["retro-cursor"]),
  moneyCursor: createEntry("money-cursor", ["money-cursor"]),
  electricCursor: createEntry("electric-cursor", ["electric-cursor"]),
  techCursor: createEntry("tech-cursor", ["tech-cursor"]),
  ghostCursor: createEntry("ghost-cursor", ["ghost-cursor"]),
  fireCursor: createEntry("fire-cursor", ["fire-cursor"]),
} as const;

export type ComponentName = keyof typeof Index;
