import { create } from 'zustand'

const useStore = create(set => ({
    lastMessage: 'This is last message',
    updateLastMessage: (newMessage) => set({ lastMessage: newMessage }),
}));

export default useStore;