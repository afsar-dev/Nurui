import {
  ModernPricingPage,
  PricingCardProps,
} from "@/components/nurui/modern-pricing-page";

const myPricingPlans: PricingCardProps[] = [
  {
    planName: "Basic",
    description: "Perfect for personal projects and hobbyists.",
    price: "0",
    features: ["1 User", "1GB Storage", "Community Forum"],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
  {
    planName: "Team",
    description: "Collaborate with your team on multiple projects.",
    price: "49",
    features: [
      "10 Users",
      "100GB Storage",
      "Email Support",
      "Shared Workspaces",
    ],
    buttonText: "Choose Team Plan",
    isPopular: true,
    buttonVariant: "primary",
  },
  {
    planName: "Agency",
    description: "Manage all your clients under one roof.",
    price: "149",
    features: [
      "Unlimited Users",
      "1TB Storage",
      "Dedicated Support",
      "Client Invoicing",
    ],
    buttonText: "Contact Us",
    buttonVariant: "primary",
  },
];

const AnimatedPricingDemo = () => {
  return (
    <ModernPricingPage
      title={
        <>
          Find the <span className="text-cyan-400">Perfect Plan</span>
        </>
      }
      subtitle="Start for free, then grow with us. Flexible plans for projects of all sizes."
      plans={myPricingPlans}
      showAnimatedBackground={true}
    />
  );
};

export default AnimatedPricingDemo;