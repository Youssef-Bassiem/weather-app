import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function weatherImage(icon) {
  switch (icon) {
    case "01d":
    case "01n":
      return "Assets/clear.png";

    case "02d":
    case "02n":
      return "Assets/cloud.png";

    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "Assets/drizzle.png";

    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "Assets/rain.png";

    case "13d":
    case "13n":
      return "Assets/snow.png";

    default:
      return "Assets/cloud.png";
  }
}