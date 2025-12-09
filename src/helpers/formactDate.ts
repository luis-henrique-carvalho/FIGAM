export function formactDate(date: any) {
  const adjustedDate = new Date(date);

  const formattedDate = adjustedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return formattedDate;
}
