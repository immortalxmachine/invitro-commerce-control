
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
    // When it's an object, use the overload of sonnerToast that takes title and description as separate arguments
    return sonnerToast(message.title || '', { 
      description: message.description 
    });
  }
};

// Also export success, error and other variants from sonner
toast.success = sonnerToast.success;
toast.error = sonnerToast.error;
toast.warning = sonnerToast.warning;
toast.info = sonnerToast.info;
