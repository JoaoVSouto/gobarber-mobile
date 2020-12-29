export default function getUserInitials(username: string): string {
  const [firstName, secondName] = username.split(' ');

  const firstNameFirstLetterUppercased = firstName[0].toUpperCase();

  if (!secondName) {
    return firstNameFirstLetterUppercased;
  }

  const secondNameFirstLetterUppercased = secondName[0].toUpperCase();

  return `${firstNameFirstLetterUppercased}${secondNameFirstLetterUppercased}`;
}
