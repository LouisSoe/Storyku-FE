import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

// "01 January 2024"
export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "dd MMMM yyyy", { locale: id });
  } catch {
    return "-";
  }
}

// "01 Jan 2024, 12:00"
export function formatDatetime(dateString: string): string {
  try {
    return format(parseISO(dateString), "dd MMM yyyy, HH:mm", { locale: id });
  } catch {
    return "-";
  }
}
