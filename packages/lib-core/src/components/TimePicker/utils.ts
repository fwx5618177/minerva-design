export const formatTime = (date: Date, format: string): string => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours24 >= 12 ? "PM" : "AM";

  return format
    .replace("HH", hours24.toString().padStart(2, "0"))
    .replace("H", hours24.toString())
    .replace("hh", hours12.toString().padStart(2, "0"))
    .replace("h", hours12.toString())
    .replace("mm", minutes.toString().padStart(2, "0"))
    .replace("m", minutes.toString())
    .replace("ss", seconds.toString().padStart(2, "0"))
    .replace("s", seconds.toString())
    .replace("a", ampm);
};

export const parseTime = (timeString: string, format: string): Date => {
  const date = new Date();
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let ampm = "";

  const formatParts = format.match(/(HH|H|hh|h|mm|m|ss|s|a)/g) || [];
  const timeParts = timeString.match(/(\d+|\s*[AaPp][Mm])/g) || [];

  formatParts.forEach((part, index) => {
    const value = timeParts[index];

    switch (part) {
      case "HH":
      case "H":
        hours = parseInt(value);
        break;
      case "hh":
      case "h":
        hours = parseInt(value);
        break;
      case "mm":
      case "m":
        minutes = parseInt(value);
        break;
      case "ss":
      case "s":
        seconds = parseInt(value);
        break;
      case "a":
        ampm = value.toUpperCase();
        break;
    }
  });

  if (ampm === "PM" && hours < 12) {
    hours += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours = 0;
  }

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date;
};

export const isValidTime = (date: Date, format: string): boolean => {
  const timeRegexMap: Record<string, RegExp | undefined> = {
    "HH:mm:ss": /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    "HH:mm": /^([01]\d|2[0-3]):([0-5]\d)$/,
    "hh:mm:ss a": /^(0\d|1[0-2]):([0-5]\d):([0-5]\d)\s*(AM|PM)$/i,
    "hh:mm a": /^(0\d|1[0-2]):([0-5]\d)\s*(AM|PM)$/i,
  };

  const timeString = formatTime(date, format);
  return timeRegexMap[format]?.test(timeString) ?? false;
};
