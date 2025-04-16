
import { toast as sonnerToast } from "sonner";

type ToastMessage = string | {
  title?: string;
  description?: string;
};

// Enhanced toast function that handles both string messages and object format
export const toast = (message: ToastMessage) => {
  if (typeof message === 'string') {
    return sonnerToast(message);
  } else {
    return sonnerToast(message);
  }
};

// Also export success, error and other variants from sonner
toast.success = sonnerToast.success;
toast.error = sonnerToast.error;
toast.warning = sonnerToast.warning;
toast.info = sonnerToast.info;
