import { PlaygroundFile } from "../types";

export class ModuleBundler {
  async bundle(
    files: PlaygroundFile[],
    entryFileName: string,
  ): Promise<string> {
    const entryFile = files.find((f) => f.name === entryFileName);
    if (!entryFile) {
      throw new Error(`Entry file ${entryFileName} not found`);
    }

    return entryFile.content;
  }
}
