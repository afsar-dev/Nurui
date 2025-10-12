import { cn } from "@/lib/utils";
import { Notification } from "@/components/nurui/notification";
import { AnimatedList } from "@/components/nurui/animated-list-items";

let notifications = [
  {
    name: "New follower",
    description: "Alex started following you",
    time: "2m ago",
    icon: "👥",
    color: "#6C63FF",
  },
  {
    name: "Comment received",
    description: "John commented on your post",
    time: "5m ago",
    icon: "💬",
    color: "#FF6584",
  },
  {
    name: "File uploaded",
    description: "You uploaded 'design.png'",
    time: "8m ago",
    icon: "📁",
    color: "#4CAF50",
  },
  {
    name: "Payment processed",
    description: "$120 sent to your account",
    time: "12m ago",
    icon: "💳",
    color: "#00BFA6",
  },
  {
    name: "New like",
    description: "Sophia liked your photo",
    time: "18m ago",
    icon: "❤️",
    color: "#FF1744",
  },
  {
    name: "System alert",
    description: "Server downtime detected",
    time: "25m ago",
    icon: "⚠️",
    color: "#FFC107",
  },
  {
    name: "Message received",
    description: "Daniel sent you a message",
    time: "45m ago",
    icon: "📨",
    color: "#2196F3",
  },
  {
    name: "Password updated",
    description: "Your account password has been changed",
    time: "1h ago",
    icon: "🔑",
    color: "#9C27B0",
  },
];
notifications = Array.from({ length: 10 }, () => notifications).flat();

function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[30rem] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}

export default AnimatedListDemo;
