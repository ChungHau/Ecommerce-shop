import { create } from "zustand";
type AuthStore = {
  isLogin: boolean;
  setIsLogin: () => void;
};
const useAuthStore = create<AuthStore>()((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export default useAuthStore;
