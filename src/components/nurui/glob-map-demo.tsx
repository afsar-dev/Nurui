import { GlobeToMapTransform } from "@/components/nurui/glob-map";

export default function GlobMapDemo() {
  return (
    <div className="m-20 relative flex flex-col h-[600px] w-[840px] rounded-2xl p-4 justify-stretch items-stretch gap-2 overflow-clip bg-[#3ca2fa0d] border border-[#3ca2fa66]">
      <div className="flex flex-col gap-1 my-1">
        <h3 className=" mx-2">Globe To Map Transform</h3>
        <p className="text-neutral-500 mx-2 text-sm">
          Interactive visualization that smoothly transforms a 3D globe into a
          2D equirectangular map.
        </p>
      </div>
      <div className="flex p-2 w-full flex-1 min-h-32 justify-center items-center">
        <GlobeToMapTransform />
      </div>
      <div className="flex flex-col gap-1 my-1">
        <p className="text-neutral-500 mx-2 text-sm">
          Controls: Unroll Globe to transition to map view, Roll to Globe to
          return, and Reset to clear rotation.
        </p>
      </div>
    </div>
  );
}
