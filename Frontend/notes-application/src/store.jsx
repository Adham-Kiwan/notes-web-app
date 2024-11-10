// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isLogin: true, // Start with the Login page
  isAddNoteVisible: false, // New state for showing the AddNote modal
  togglePage: () => set((state) => ({ isLogin: !state.isLogin })),
  toggleAddNote: () => set((state) => ({ isAddNoteVisible: !state.isAddNoteVisible })),
}));

export default useStore;
