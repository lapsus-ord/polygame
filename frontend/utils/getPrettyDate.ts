// Need a valid date (string), or a timestamp (number)
export const getPrettyDate = (timestamp: number | string): string => {
  const dateObj = new Date(timestamp);
  const localeDate = dateObj.toLocaleDateString();
  const hours = dateObj.getHours();
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);

  return `${localeDate} à ${hours}:${minutes}`;
};
