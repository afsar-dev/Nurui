"use client";
import { ShoppingCart } from "lucide-react";
import FutureButton from "./future-button";

export default function FutureButtonDemo() {
  return (
    <div className="flex justify-center py-20">
      <FutureButton>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Purchase Item
      </FutureButton>
    </div>
  );
}
