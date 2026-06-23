import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "jon" },
  isLoading: false,
  isLoggedin: false,

  login: () => {
    console.log("loogged in");
  },
}));
