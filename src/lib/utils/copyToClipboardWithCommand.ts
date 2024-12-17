import copy from "copy-to-clipboard";
import { toast } from "sonner";

export const copyToClipboardWithCommand = (
  content: string,
  notToast?: boolean,
) => {
  copy(content, { format: "text/plain" });
  if (!notToast) {
    toast.success("Copied to clipboard");
  }
};
