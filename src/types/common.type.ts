import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export default interface IClassName {
  className: string;
}

export type PathCommand = ["M" | "L", string, string];

export interface PathProps {
  show: boolean;
  style: {
    strokeWidth: string;
    stroke: string;
    fill: string;
  };
  path: PathCommand[];
}

export type Paths = PathProps[];
