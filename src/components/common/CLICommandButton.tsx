"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaTerminal } from "react-icons/fa";
import { cn } from "@/lib/utils";
import IClassName from "@/types/common.type";
import { FaCheck } from "react-icons/fa6";

interface ClipboardButtonProps extends IClassName {
  cli: string;
}

const ClipboardButton = ({
  cli = "npx nurui@latest list",
  className,
}: ClipboardButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (cli) {
      await navigator.clipboard.writeText(cli);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      aria-label="Copy to clipboard"
      onClick={copyToClipboard}
      className={cn(
        "bg-white/10 backdrop-blur-sm border border-[rgba(255,255,255,.1)] px-3 rounded-lg flex items-center gap-2",
        className,
      )}
    >
      {copied ? (
        <FaCheck />
      ) : (
        <>
          <FaTerminal />
          CLI
        </>
      )}
    </Button>
  );
};

export default ClipboardButton;
