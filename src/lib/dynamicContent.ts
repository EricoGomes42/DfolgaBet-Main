export function resolveDynamicContent(content?: string | null): string {
  if (!content) return '';
  const currentYear = new Date().getFullYear().toString();
  return content.replace(/\{ano\}/gi, currentYear).replace(/\{year\}/gi, currentYear);
}
