import React from "react";
import CopyButton from "./copy-button";

const CopyButtonDemo = () => {
  return (
    <div className="flex items-center justify-center min-h-[20rem]">
      <CopyButton 
  text="example@gmail.com" 
  defaultLabel="Copy email address" 
  successLabel="Copied!" 
/>

    </div>
  );
};

export default CopyButtonDemo;
