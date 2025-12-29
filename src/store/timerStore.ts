import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TimerState, TimeEntry, TimerStatus, TaskCategory } from '../types'

interface TimerStoreState extends TimerState {
  entries: TimeEntry[]

  // Actions
  startTimer: (title: string, category: TaskCategory, taskId?: string) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  tick: () => void
  setTargetMinutes: (minutes: number) => void

  // Selectors
  getTodaysEntries: () => TimeEntry[]
  getTotalTimeToday: () => number
  getTimeByCategory: (category: TaskCategory) => number
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useTimerStore = create<TimerStoreState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      currentEntry: undefined,
      elapsedSeconds: 0,
      targetMinutes: 25, // Default Pomodoro
      entries: [],

      startTimer: (title, category, taskId) => {
        const entry: TimeEntry = {
          id: generateId(),
          title,
          category,
          taskId,
          startTime: new Date(),
          duration: 0,
        }
        set({
          status: 'running',
          currentEntry: entry,
          elapsedSeconds: 0,
        })
      },

      pauseTimer: () => {
        set({ status: 'paused' })
      },

      resumeTimer: () => {
        set({ status: 'running' })
      },

      stopTimer: () => {
        const { currentEntry, elapsedSeconds } = get()
        if (currentEntry) {
          const completedEntry: TimeEntry = {
            ...currentEntry,
            endTime: new Date(),
            duration: elapsedSeconds,
          }
          set((state) => ({
            status: 'idle',
            currentEntry: undefined,
            elapsedSeconds: 0,
            entries: [...state.entries, completedEntry],
          }))
        }
      },

      resetTimer: () => {
        set({
          status: 'idle',
          currentEntry: undefined,
          elapsedSeconds: 0,
        })
      },

      tick: () => {
        const { status } = get()
        if (status === 'running') {
          set((state) => ({
            elapsedSeconds: state.elapsedSeconds + 1,
          }))
        }
      },

      setTargetMinutes: (minutes) => {
        set({ targetMinutes: minutes })
      },

      getTodaysEntries: () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return get().entries.filter((entry) => {
          const entryDate = new Date(entry.startTime)
          return entryDate >= today
        })
      },

      getTotalTimeToday: () => {
        const todaysEntries = get().getTodaysEntries()
        return todaysEntries.reduce((total, entry) => total + entry.duration, 0)
      },

      getTimeByCategory: (category) => {
        const todaysEntries = get().getTodaysEntries()
        return todaysEntries
          .filter((entry) => entry.category === category)
          .reduce((total, entry) => total + entry.duration, 0)
      },
    }),
    {
      name: 'productivity-timer',
    }
  )
)
