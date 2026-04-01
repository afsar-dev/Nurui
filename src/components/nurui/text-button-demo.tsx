import { TextFallButton } from "@/components/nurui/text-button";

export const TextButtonDemo = () => {
  return (
    <div className="flex items-center justify-center min-h-[30rem]">
      <TextFallButton className="bg-blue-500 text-primary-foreground cursor-pointer rounded px-6 py-2.5 text-lg font-medium">
        Text Fall Button
      </TextFallButton>
    </div>
  );
};

