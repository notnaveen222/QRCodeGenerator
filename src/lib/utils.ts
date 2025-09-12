export function stringTrimmer({
  text,
  length,
}: {
  text: string;
  length: number;
}) {
  if (!text) return "";
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
}
