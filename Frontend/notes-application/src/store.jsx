// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isLogin: true, // Start with the Login page
  isAddNoteVisible: false, // State for showing the AddNote modal
  isSignedUp: false, // New state for successful signup
  isLoggedIn: false, // New state for successful login
  togglePage: () => set((state) => ({ isLogin: !state.isLogin })),
  toggleAddNote: () => set((state) => ({ isAddNoteVisible: !state.isAddNoteVisible })),
  setSignedUp: () => set({ isSignedUp: true, isLogin: true }), // Redirect to login page after signup
  setLoggedIn: () => set({ isLoggedIn: true }), // Redirect to main page after login
}));

export default useStore;
