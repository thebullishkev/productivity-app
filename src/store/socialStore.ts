import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SocialTask, SocialPlatform } from '../lib/social'
import { createSampleSocialTasks, executeSocialTask as executeSocialTaskLib } from '../lib/social'

interface SocialStoreState {
  tasks: SocialTask[]

  // Actions
  addSocialTask: (task: Omit<SocialTask, 'id' | 'completed'>) => void
  completeSocialTask: (id: string) => void
  deleteSocialTask: (id: string) => void
  executeTask: (id: string) => void
  loadSampleTasks: () => void

  // Selectors
  getTasksByPlatform: (platform: SocialPlatform) => SocialTask[]
  getPendingTasks: () => SocialTask[]
  getCompletedCount: () => number
}

const generateId = () => `social-${Math.random().toString(36).substring(2, 9)}`

export const useSocialStore = create<SocialStoreState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addSocialTask: (taskData) => {
        const task: SocialTask = {
          ...taskData,
          id: generateId(),
          completed: false,
        }
        set((state) => ({ tasks: [...state.tasks, task] }))
      },

      completeSocialTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          ),
        }))
      },

      deleteSocialTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      executeTask: (id) => {
        const task = get().tasks.find((t) => t.id === id)
        if (task) {
          executeSocialTaskLib(task)
          // Don't auto-complete - user needs to confirm completion
        }
      },

      loadSampleTasks: () => {
        const sampleTasks = createSampleSocialTasks()
        set({ tasks: sampleTasks })
      },

      getTasksByPlatform: (platform) => {
        return get().tasks.filter((task) => task.platform === platform)
      },

      getPendingTasks: () => {
        return get().tasks.filter((task) => !task.completed)
      },

      getCompletedCount: () => {
        return get().tasks.filter((task) => task.completed).length
      },
    }),
    {
      name: 'productivity-social',
    }
  )
)
