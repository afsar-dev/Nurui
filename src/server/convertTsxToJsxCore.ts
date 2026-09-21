import { stripTypesPreserveFormat } from "@/server/stripTypesPreserveFormat";

export const MAX_CONVERT_SOURCE_LENGTH = 512_000;

export async function convertTsxToJsxCore(code: string): Promise<string> {
  return stripTypesPreserveFormat(code);
}
