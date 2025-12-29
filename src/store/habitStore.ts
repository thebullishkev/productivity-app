import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Habit, HabitFrequency } from '../types'

interface HabitState {
  habits: Habit[]

  // Actions
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>) => void
  updateHabit: (id: string, updates: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  toggleHabitCompletion: (id: string, date?: string) => void

  // Selectors
  getHabitStreak: (id: string) => number
  getTodaysHabits: () => Habit[]
  getCompletedTodayCount: () => number
}

const generateId = () => Math.random().toString(36).substring(2, 15)
const getTodayString = () => new Date().toISOString().split('T')[0]

const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0

  const sortedDates = [...completedDates].sort().reverse()
  const today = getTodayString()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayString = yesterday.toISOString().split('T')[0]

  // Check if today or yesterday is completed (streak is active)
  if (sortedDates[0] !== today && sortedDates[0] !== yesterdayString) {
    return 0
  }

  let streak = 1
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i - 1])
    const prevDate = new Date(sortedDates[i])
    const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],

      addHabit: (habitData) => {
        const habit: Habit = {
          ...habitData,
          id: generateId(),
          streak: 0,
          longestStreak: 0,
          completedDates: [],
          createdAt: new Date(),
        }
        set((state) => ({ habits: [...state.habits, habit] }))
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        }))
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }))
      },

      toggleHabitCompletion: (id, date = getTodayString()) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit

            const isCompleted = habit.completedDates.includes(date)
            const newCompletedDates = isCompleted
              ? habit.completedDates.filter((d) => d !== date)
              : [...habit.completedDates, date]

            const newStreak = calculateStreak(newCompletedDates)

            return {
              ...habit,
              completedDates: newCompletedDates,
              streak: newStreak,
              longestStreak: Math.max(habit.longestStreak, newStreak),
            }
          }),
        }))
      },

      getHabitStreak: (id) => {
        const habit = get().habits.find((h) => h.id === id)
        return habit?.streak ?? 0
      },

      getTodaysHabits: () => {
        const today = new Date().getDay()
        return get().habits.filter((habit) => {
          if (habit.frequency === 'daily') return true
          if (habit.frequency === 'custom' && habit.targetDays) {
            return habit.targetDays.includes(today)
          }
          return true
        })
      },

      getCompletedTodayCount: () => {
        const today = getTodayString()
        return get().habits.filter((habit) =>
          habit.completedDates.includes(today)
        ).length
      },
    }),
    {
      name: 'productivity-habits',
    }
  )
)
