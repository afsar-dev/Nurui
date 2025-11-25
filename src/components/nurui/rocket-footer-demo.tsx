import RocketFooter from "@/components/nurui/rocket-footer";

const RocketFooterDemo = () => {
  return (
    <div className="flex flex-col min-h-[150vh] w-full">
      <p className="text-[#3ca2fa] text-6xl font-bold mx-auto pt-96 text-center">
        Scroll down and launch the rocket ↓
      </p>
      <RocketFooter />
    </div>
  );
};

export default RocketFooterDemo;
