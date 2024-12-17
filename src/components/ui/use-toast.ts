import { useToast as useToastOriginal } from "~/hooks/use-toast";

export interface ToastProps {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
}

export const useToast = () => {
  const { toast } = useToastOriginal();
  return { toast };
};
