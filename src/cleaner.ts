export function cleanText(text: string): string {
  // Regex to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(urlRegex, (urlStr) => {
    try {
      const url = new URL(urlStr);

      // Remove specific tracking parameters
      const paramsToRemove = ['igsh', 'si', 'xmt', 'slof'];
      for (const param of paramsToRemove) {
        url.searchParams.delete(param);
      }

      // Remove the trailing '?' or '=' if empty params
      return url.toString();
    } catch (e) {
      // If parsing fails for some reason, return the original string
      return urlStr;
    }
  });
}
