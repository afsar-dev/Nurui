"use server";

import {
  convertTsxToJsxCore,
  MAX_CONVERT_SOURCE_LENGTH,
} from "@/server/convertTsxToJsxCore";

export async function convertTsxToJsx(code: string): Promise<string> {
  if (typeof code !== "string") {
    throw new Error("Source code must be a string.");
  }

  if (code.length > MAX_CONVERT_SOURCE_LENGTH) {
    throw new Error(
      `Source code exceeds the ${MAX_CONVERT_SOURCE_LENGTH} character limit.`,
    );
  }

  try {
    return await convertTsxToJsxCore(code);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to convert TSX to JSX.";
    throw new Error(message);
  }
}
