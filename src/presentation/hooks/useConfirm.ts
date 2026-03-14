import { useConfirmStore } from "@/store/confirmStore";

export function useConfirm() {
  const { open } = useConfirmStore();

  const confirm = (message: string, description?: string): Promise<boolean> =>
    new Promise((resolve) => {
      open(message, () => resolve(true), description);
    });

  return { confirm };
}
