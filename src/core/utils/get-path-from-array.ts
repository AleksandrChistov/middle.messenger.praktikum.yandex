export function getPathFromArray(paths: string[]): string {
  return paths.reduce((acc, path) => `${acc}.${path}`);
}
