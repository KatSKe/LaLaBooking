export default function FormatDatuma({ date, defaultDisplay = "-" }) {
  if (!date) {
    return defaultDisplay;
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return defaultDisplay;
  }

  return (
    Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d) + (date.includes("T") ? "" : ".")
  );
}