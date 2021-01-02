export default function capitalize(string: string): string {
  const firstLetterUppercased = string[0].toUpperCase();
  const stringWithoutFirstLetter = string.slice(1);

  return `${firstLetterUppercased}${stringWithoutFirstLetter}`;
}
