export function capitalizeFirst(text: string) {
  if (text.length < 2) {
    return text.toUpperCase();
  } else {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
  }
}

export function lowerize(text: string) {
  return text.toLowerCase();
}
