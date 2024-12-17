import { toast } from "sonner";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "~/lib/wagmi/client";

export async function waitForTransactionReceiptToast(
  tx: `0x${string}`,
  successMessage: string,
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) {
  return toast.promise(
    (async () => {
      await waitForTransactionReceipt(publicClient, {
        hash: tx,
      });
      return successMessage;
    })(),
    {
      loading: "Transaction is being confirmed...",
      success: (message) => {
        onSuccess?.();
        return message;
      },
      error: (error: Error) => {
        onError?.(error);
        return error.message || "Transaction failed";
      },
    },
  );
}
