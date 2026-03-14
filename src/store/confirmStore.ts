import { create } from "zustand";

interface ConfirmState {
  isOpen: boolean;
  message: string;
  description?: string;
  onConfirm: () => void;
  open: (message: string, onConfirm: () => void, description?: string) => void;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: "",
  description: undefined,
  onConfirm: () => {},

  open: (message, onConfirm, description) =>
    set({ isOpen: true, message, description, onConfirm }),

  close: () =>
    set({
      isOpen: false,
      message: "",
      description: undefined,
      onConfirm: () => {},
    }),
}));
