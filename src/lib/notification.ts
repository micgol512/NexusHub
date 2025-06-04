import { toast } from "sonner";

type NotificationVariant = "success" | "error" | "warning" | "info";

export function notification(
  message: string,
  variant: NotificationVariant = "info"
) {
  switch (variant) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast("Something wrong!!!");
      break;
  }
}
