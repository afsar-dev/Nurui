import ts from "typescript";

type TRemovalRange = {
  start: number;
  end: number;
};

function mergeRanges(ranges: TRemovalRange[]): TRemovalRange[] {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: TRemovalRange[] = [sorted[0]];

  for (let index = 1; index < sorted.length; index += 1) {
    const current = sorted[index];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
      continue;
    }

    merged.push(current);
  }

  return merged;
}

function applyRemovals(source: string, ranges: TRemovalRange[]): string {
  const merged = mergeRanges(ranges);
  let result = source;

  for (let index = merged.length - 1; index >= 0; index -= 1) {
    const { start, end } = merged[index];
    result = result.slice(0, start) + result.slice(end);
  }

  return cleanupImportArtifacts(result);
}

function cleanupImportArtifacts(source: string): string {
  return source
    .replace(/import\s*{\s*,/g, "import {")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*}/g, " }")
    .replace(/import\s*{\s*}\s*from\s*[^;]+;\s*\n?/g, "")
    .replace(/import\s+type\s+[^;]+;\s*\n?/g, "")
    .replace(/export\s+type\s+[^;]+;\s*\n?/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

function getScriptKind(fileName: string): ts.ScriptKind {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".tsx")) {
    return ts.ScriptKind.TSX;
  }

  if (lowerName.endsWith(".jsx")) {
    return ts.ScriptKind.JSX;
  }

  if (lowerName.endsWith(".js")) {
    return ts.ScriptKind.JS;
  }

  return ts.ScriptKind.TS;
}

function addRange(
  ranges: TRemovalRange[],
  _sourceFile: ts.SourceFile,
  start: number,
  end: number,
) {
  if (start >= end) {
    return;
  }

  ranges.push({ start, end });
}

function addNodeRange(
  ranges: TRemovalRange[],
  sourceFile: ts.SourceFile,
  node: ts.Node,
) {
  addRange(ranges, sourceFile, node.getFullStart(), node.getEnd());
}

function addTypeAnnotationRange(
  ranges: TRemovalRange[],
  sourceFile: ts.SourceFile,
  typeNode: ts.TypeNode | undefined,
) {
  if (!typeNode) {
    return;
  }

  addRange(ranges, sourceFile, typeNode.getFullStart(), typeNode.getEnd());
}

function addNodeArrayRange(
  ranges: TRemovalRange[],
  sourceFile: ts.SourceFile,
  nodes: ts.NodeArray<ts.Node> | undefined,
) {
  if (!nodes || nodes.length === 0) {
    return;
  }

  addRange(ranges, sourceFile, nodes.pos, nodes.end);
}

function collectRemovalRanges(
  sourceFile: ts.SourceFile,
  ranges: TRemovalRange[],
): void {
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) {
      addNodeRange(ranges, sourceFile, node);
      return;
    }

    if (ts.isExportDeclaration(node) && node.isTypeOnly) {
      addNodeRange(ranges, sourceFile, node);
      return;
    }

    if (
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node)
    ) {
      addNodeRange(ranges, sourceFile, node);
      return;
    }

    if (ts.isImportSpecifier(node) && node.isTypeOnly) {
      addRange(ranges, sourceFile, node.getStart(sourceFile), node.getEnd());
    }

    if (ts.isVariableDeclaration(node)) {
      addTypeAnnotationRange(ranges, sourceFile, node.type);
    }

    if (ts.isParameter(node)) {
      addTypeAnnotationRange(ranges, sourceFile, node.type);

      if (node.questionToken && node.type) {
        // Keep optional marker when type is removed.
      }
    }

    if (
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isMethodSignature(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isGetAccessor(node) ||
      ts.isSetAccessor(node)
    ) {
      addTypeAnnotationRange(ranges, sourceFile, node.type);
      addNodeArrayRange(ranges, sourceFile, node.typeParameters);
    }

    if (ts.isPropertyDeclaration(node) || ts.isPropertySignature(node)) {
      addTypeAnnotationRange(ranges, sourceFile, node.type);
    }

    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      addNodeArrayRange(ranges, sourceFile, node.typeParameters);
    }

    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      addNodeArrayRange(ranges, sourceFile, node.typeArguments);
    }

    if (ts.isExpressionWithTypeArguments(node)) {
      addNodeArrayRange(ranges, sourceFile, node.typeArguments);
    }

    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      addRange(
        ranges,
        sourceFile,
        node.type.getFullStart(),
        node.getEnd(),
      );
    }

    if (ts.isSatisfiesExpression(node)) {
      addRange(
        ranges,
        sourceFile,
        node.type.getFullStart(),
        node.getEnd(),
      );
    }

    if (ts.isHeritageClause(node) && node.token === ts.SyntaxKind.ImplementsKeyword) {
      addNodeRange(ranges, sourceFile, node);
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

export function stripTypesPreserveFormat(
  code: string,
  fileName = "component.tsx",
): string {
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.Latest,
    true,
    getScriptKind(fileName),
  );

  const ranges: TRemovalRange[] = [];
  collectRemovalRanges(sourceFile, ranges);

  return applyRemovals(code, ranges);
}
