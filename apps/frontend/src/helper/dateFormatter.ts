import { format } from "date-fns";

export function dateFormatter(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}
