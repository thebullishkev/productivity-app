import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppView, MascotState, MascotMood, Notification, NotificationType } from '../types'

interface AppState {
  // Navigation
  currentView: AppView
  setView: (view: AppView) => void

  // Mascot
  mascot: MascotState
  setMascotMood: (mood: MascotMood, message?: string) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  getUnreadCount: () => number

  // User preferences
  userName: string
  setUserName: (name: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 15)

// Duolingo-style messages based on mood
const getMascotMessage = (mood: MascotMood): string => {
  const messages: Record<MascotMood, string[]> = {
    happy: [
      "You're doing amazing!",
      "Keep up the great work!",
      "I'm so proud of you!",
    ],
    sad: [
      "I've been waiting here all day...",
      "Your tasks miss you.",
      "Did you forget about me?",
    ],
    excited: [
      "Let's crush some tasks today!",
      "I can feel the productivity!",
      "Ready to be LEGENDARY?",
    ],
    disappointed: [
      "I'm not mad, just disappointed.",
      "Your future self just texted. They're concerned.",
      "Must be nice having zero responsibilities.",
    ],
    scheming: [
      "I have some tasks you might want to see...",
      "Your friends are being productive right now...",
      "There's a deadline approaching... just saying.",
    ],
    celebrating: [
      "YESSS! You're on FIRE!",
      "WHO IS THIS PRODUCTIVITY LEGEND?!",
      "Achievement unlocked: Actually Did The Thing!",
    ],
    neutral: [
      "Ready when you are!",
      "What should we work on?",
      "Let's make today count.",
    ],
  }

  const options = messages[mood]
  return options[Math.floor(Math.random() * options.length)]
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentView: 'tasks',
      setView: (view) => set({ currentView: view }),

      // Mascot
      mascot: {
        mood: 'neutral',
        message: "Ready when you are!",
        lastInteraction: new Date(),
      },
      setMascotMood: (mood, message) => {
        set({
          mascot: {
            mood,
            message: message || getMascotMessage(mood),
            lastInteraction: new Date(),
          },
        })
      },

      // Notifications
      notifications: [],
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: generateId(),
          createdAt: new Date(),
          read: false,
        }
        set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 50), // Keep last 50
        }))
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }))
      },

      clearNotifications: () => {
        set({ notifications: [] })
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length
      },

      // User preferences
      userName: '',
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: 'productivity-app',
    }
  )
)
