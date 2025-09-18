import { TfiHelpAlt } from "react-icons/tfi";
import {
  TbBackground,
  TbCards,
  TbComponents,
  TbHandClick,
  TbLayoutNavbarCollapse,
} from "react-icons/tb";
import { GrDrawer, GrInstallOption } from "react-icons/gr";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { RxComponent2, RxSection } from "react-icons/rx";
import { PiCursorClickDuotone } from "react-icons/pi";
import { SiApacherocketmq } from "react-icons/si";
import { IoTextSharp } from "react-icons/io5";
import { MdLegendToggle } from "react-icons/md";

const baseUrl = "/docs";

export const navigation = [
  // introduction
  {
    icon: <AiOutlineFileSearch />,
    title: "Introduction",
    href: `${baseUrl}/introduction`,
  },
  // installation
  {
    icon: <GrInstallOption />,
    title: "Installation",
    href: `${baseUrl}/installation`,
  },
  {
    icon: <TbComponents />,
    title: "Components",
    href: `${baseUrl}/components`,
  },
  // sections
  {
    icon: <RxSection />,
    title: "Sections",
    submenu: [
      { name: "Neobrutalism faq", href: `${baseUrl}/neobrutalism-faq` },
      { name: "glassy faq", href: `${baseUrl}/glassy-faq` },
      { name: "Premium testimonial", href: `${baseUrl}/premium-testimonial` },
      { name: "marquee testimonial", href: `${baseUrl}/marquee-testimonial` },
      { name: "animated pricing", href: `${baseUrl}/animated-pricing` },
      { name: "creative pricing", href: `${baseUrl}/creative-pricing` },
    ],
  },
  // navbar
  {
    icon: <TbLayoutNavbarCollapse />,
    title: "Navbar",
    submenu: [{ name: "future", href: `${baseUrl}/future-navbar` }],
  },
  // footer
  {
    icon: <MdLegendToggle />,
    title: "Footer",
    submenu: [{ name: "hover", href: `${baseUrl}/hover-footer` }],
  },
  // components
  {
    icon: <RxComponent2 />,
    title: "Blocks",
    submenu: [
      { name: "Project showcase", href: `${baseUrl}/project-showcase` },
      { name: "Animated List", href: `${baseUrl}/animated-list` },
      { name: "following eye", href: `${baseUrl}/following-eye` },
      { name: "progress bar", href: `${baseUrl}/progress-bar` },
      { name: "terminal", href: `${baseUrl}/terminal` },
      { name: "banner", href: `${baseUrl}/banner` },
      { name: "news letter", href: `${baseUrl}/news-letter` },
      { name: "Story", href: `${baseUrl}/story` },
    ],
  },
  // backgrounds
  {
    icon: <TbBackground />,
    title: "Backgrounds",
    submenu: [
      { name: "bars", href: `${baseUrl}/bars-background` },
      { name: "jump", href: `${baseUrl}/jump-background` },
      { name: "virus", href: `${baseUrl}/virus-background` },
      { name: "gradient", href: `${baseUrl}/gradient-background` },
      { name: "hacker", href: `${baseUrl}/hacker-background` },
      { name: "neural", href: `${baseUrl}/neural-background` },
    ],
  },
  // buttons
  {
    icon: <TbHandClick />,
    title: "Buttons",
    submenu: [
      { name: "Magnet", href: `${baseUrl}/magnet-button` },
      { name: "Gradient", href: `${baseUrl}/gradient-button` },
      { name: "Border", href: `${baseUrl}/border-button` },
      { name: "Shadow", href: `${baseUrl}/shadow-button` },
      { name: "Text", href: `${baseUrl}/text-button` },
      { name: "future", href: `${baseUrl}/future-button` },
      { name: "Play", href: `${baseUrl}/play-button` },
      { name: "Copy", href: `${baseUrl}/copy-button` },
    ],
  },
  // cards
  {
    icon: <TbCards />,
    title: "Cards",
    submenu: [
      { name: "playing", href: `${baseUrl}/playing-card` },
      { name: "glowing", href: `${baseUrl}/glowing-card` },
      { name: "info", href: `${baseUrl}/info-card` },
      { name: "wave", href: `${baseUrl}/wave-card` },
      { name: "dynamic", href: `${baseUrl}/dynamic-card` },
      { name: "spotlight", href: `${baseUrl}/spotlight-card` },
      { name: "shiny", href: `${baseUrl}/shiny-card` },
    ],
  },
  // forms
  {
    icon: <FaWpforms />,
    title: "Forms",
    submenu: [
      { name: "contact", href: `${baseUrl}/contact-form` },
      { name: "gaming", href: `${baseUrl}/gaming-form` },
      { name: "singin", href: `${baseUrl}/singin-form` },
      { name: "flow", href: `${baseUrl}/flow-form` },
    ],
  },
  {
    icon: <GrDrawer />,
    title: "Modals",
    submenu: [{ name: "video", href: `${baseUrl}/video-modal` }],
  },
  // hero sections
  {
    icon: <SiApacherocketmq />,
    title: "Heros",
    submenu: [
      { name: "tech", href: `${baseUrl}/tech-hero` },
      { name: "gradient", href: `${baseUrl}/gradient-hero` },
      { name: "waves", href: `${baseUrl}/waves-hero` },
      { name: "digital", href: `${baseUrl}/digital-hero` },
      { name: "research", href: `${baseUrl}/research-hero` },
      { name: "spotlight", href: `${baseUrl}/spotlight-hero` },
    ],
  },

  {
    icon: <IoTextSharp />,
    title: "texts",
    submenu: [{ name: "gradient", href: `${baseUrl}/gradient-text` }],
  },

  // cursors
  {
    icon: <PiCursorClickDuotone />,
    title: "Cursors",
    submenu: [
      { name: "draw", href: `${baseUrl}/draw-cursor` },
      { name: "canvas", href: `${baseUrl}/canvas-cursor` },
      { name: "matrix", href: `${baseUrl}/matrix-cursor` },
      { name: "splash", href: `${baseUrl}/splash-cursor` },
      { name: "hacker", href: `${baseUrl}/hacker-cursor` },
      { name: "terminal", href: `${baseUrl}/terminal-cursor` },
      { name: "retro", href: `${baseUrl}/retro-cursor` },
      { name: "code", href: `${baseUrl}/code-cursor` },
      { name: "money", href: `${baseUrl}/money-cursor` },
      { name: "electric", href: `${baseUrl}/electric-cursor` },
      { name: "ghost", href: `${baseUrl}/ghost-cursor` },
      { name: "tech", href: `${baseUrl}/tech-cursor` },
      { name: "fire", href: `${baseUrl}/fire-cursor` },
    ],
  },
  // help
  {
    icon: <TfiHelpAlt />,
    title: "Help",
    href: `${baseUrl}/help`,
  },
];
