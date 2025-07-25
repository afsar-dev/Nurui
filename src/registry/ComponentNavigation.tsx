import { TfiHelpAlt } from "react-icons/tfi";
import { TbCards, TbHandClick } from "react-icons/tb";
import { GrInstallOption } from "react-icons/gr";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { RxComponent2, RxSection } from "react-icons/rx";
import { PiCursorClickDuotone } from "react-icons/pi";
import { SiApacherocketmq } from "react-icons/si";

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
  // {
  //   icon: <TbComponents />,
  //   title: "Components",
  //   href: `${baseUrl}/components`,
  // },
  // sections
  {
    icon: <RxSection />,
    title: "Sections",
    submenu: [
      { name: "Neobrutalism faq", href: `${baseUrl}/neobrutalism-faq` },
      { name: "Premium testimonial", href: `${baseUrl}/premium-testimonial` },
      { name: "marquee testimonial", href: `${baseUrl}/marquee-testimonial` },
      { name: "animated pricing", href: `${baseUrl}/animated-pricing` },
      { name: "creative pricing", href: `${baseUrl}/creative-pricing` },
      { name: "grid feature", href: `${baseUrl}/grid-feature` },
    ],
  },
  // components
  {
    icon: <RxComponent2 />,
    title: "Components",
    submenu: [
      { name: "Project showcase", href: `${baseUrl}/project-showcase` },
      { name: "Story", href: `${baseUrl}/story` },
      { name: "following eye", href: `${baseUrl}/following-eye` },
    ],
  },
  // {
  //   icon: <FaWpforms />,
  //   title: "Backgrounds",
  //   submenu: [{ name: "gradient", href: `${baseUrl}/gradient-hero` }],
  // },
  // buttons
  {
    icon: <TbHandClick />,
    title: "Buttons",
    submenu: [
      { name: "Magnet", href: `${baseUrl}/magnet-button` },
      { name: "Gradient", href: `${baseUrl}/gradient-button` },
      { name: "Border Animation", href: `${baseUrl}/border-animation-button` },
      { name: "Hover Shadow", href: `${baseUrl}/hover-shadow-button` },
      { name: "Text Fall", href: `${baseUrl}/text-fall-button` },
      { name: "future", href: `${baseUrl}/future-button` },
    ],
  },
  // cards
  {
    icon: <TbCards />,
    title: "Cards",
    submenu: [
      { name: "playing", href: `${baseUrl}/playing-card` },
      { name: "info", href: `${baseUrl}/info-card` },
      { name: "wave", href: `${baseUrl}/wave-card` },
      { name: "dynamic", href: `${baseUrl}/dynamic-card` },
      { name: "spotlight", href: `${baseUrl}/spotlight-card` },
      { name: "feature", href: `${baseUrl}/feature-card` },
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
  // hero sections
  {
    icon: <SiApacherocketmq />,
    title: "Hero",
    submenu: [
      { name: "tech", href: `${baseUrl}/tech-hero` },
      { name: "gradient", href: `${baseUrl}/gradient-hero` },
      { name: "waves", href: `${baseUrl}/waves-hero` },
      { name: "digital", href: `${baseUrl}/digital-hero` },
      { name: "research", href: `${baseUrl}/research-hero` },
      { name: "spotlight", href: `${baseUrl}/spotlight-hero` },
    ],
  },
  // {
  //   icon: <FaWpforms />,
  //   title: "Modals",
  //   submenu: [{ name: "gradient", href: `${baseUrl}/gradient-hero` }],
  // },

  // cursors
  {
    icon: <PiCursorClickDuotone />,
    title: "Cursors",
    submenu: [
      { name: "draw", href: `${baseUrl}/draw-cursor` },
      { name: "matrix", href: `${baseUrl}/matrix-cursor` },
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
