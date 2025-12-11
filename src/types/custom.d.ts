// declare module for raw imports
declare module "*.tsx?raw" {
  const content: string;
  export default content;
}

declare module "*.ts?raw" {
  const content: string;
  export default content;
}

declare module "*.css";
declare module "*.scss";
