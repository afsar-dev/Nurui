// components/nurui/badge-demo.tsx
import { Badge } from "@/components/nurui/badge";

export function BadgeDemo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 p-8 ${className || ""}`}>
      <Badge variant="default">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  );
}