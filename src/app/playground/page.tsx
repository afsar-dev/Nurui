import { Playground } from "@/features/playground/Playground";
export const metadata = {
  title: "Playground",
  description:
    "Try out Nurui components in real-time. Customize, preview, and export directly from the playground.",
  keywords: [
    "Nurui Playground",
    "Live UI Editor",
    "Component Preview",
    "React Component Sandbox",
    "UI Customization",
    "Nurui UI Components",
  ],
};

const PlaygroundPage = () => {
  return <Playground />;
};

export default PlaygroundPage;
