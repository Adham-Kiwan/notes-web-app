// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  isLogin: true, // Start with the Login page
  togglePage: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export default useStore;