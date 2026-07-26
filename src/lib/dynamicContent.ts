export function resolveDynamicContent(content?: string | null): string {
  if (!content) return '';
  const currentYear = new Date().getFullYear().toString();
  return content.replace(/\{ano\}/gi, currentYear).replace(/\{year\}/gi, currentYear);
}

export function applyDynamicContentToResult(obj: any): any {
  if (typeof obj === 'string') {
    return resolveDynamicContent(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(applyDynamicContentToResult);
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (['slug', 'url', 'href', 'current', 'link', '_id', '_ref', '_key', 'seoCustomCode', 'bookmakerKey', 'key', 'id'].includes(key)) {
        newObj[key] = value;
      } else {
        newObj[key] = applyDynamicContentToResult(value);
      }
    }
    return newObj;
  }
  return obj;
}
