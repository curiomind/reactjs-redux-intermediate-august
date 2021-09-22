export function getInitials(firstName, lastName) {
  const initials = firstName[0] + lastName[0];
  return initials.toUpperCase();
}

export function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
