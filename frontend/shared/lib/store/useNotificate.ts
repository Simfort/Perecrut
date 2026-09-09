import { create } from "zustand";

interface Notificate {
  title: string;
  status: "success" | "warn" | "error";
  description: string;
}

interface UseNotificate {
  data: null | Notificate;
  setData(newData: null | Notificate): void;
}

export const useNotificate = create<UseNotificate>((set) => ({
  data: null,
  setData(newData) {
    set({ data: newData });
  },
}));
