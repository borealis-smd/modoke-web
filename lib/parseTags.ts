export function parseTags(content: string): string[] {
  const parts: string[] = [];
  const tagRegex =
    /(<balloon>[\s\S]*?<\/balloon>)|(<Code ([\s\S]*?)<\/Code>)/g;

  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(content)) !== null) {
    parts.push(match[0].trim());
  }
  
  return parts;
}
