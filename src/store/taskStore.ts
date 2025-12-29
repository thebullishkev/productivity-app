import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskStatus, TaskPriority, TaskCategory } from '../types'

interface TaskState {
  tasks: Task[]

  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void

  // Selectors
  getTasksByStatus: (status: TaskStatus) => Task[]
  getTasksByCategory: (category: TaskCategory) => Task[]
  getOverdueTasks: () => Task[]
  getTodaysTasks: () => Task[]
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (taskData) => {
        const task: Task = {
          ...taskData,
          id: generateId(),
          status: 'pending',
          createdAt: new Date(),
          tags: taskData.tags || [],
        }
        set((state) => ({ tasks: [...state.tasks, task] }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      completeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status: 'completed' as TaskStatus, completedAt: new Date() }
              : task
          ),
        }))
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter((task) => task.status === status)
      },

      getTasksByCategory: (category) => {
        return get().tasks.filter((task) => task.category === category)
      },

      getOverdueTasks: () => {
        const now = new Date()
        return get().tasks.filter(
          (task) =>
            task.dueDate &&
            new Date(task.dueDate) < now &&
            task.status !== 'completed'
        )
      },

      getTodaysTasks: () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return get().tasks.filter((task) => {
          if (!task.dueDate) return false
          const dueDate = new Date(task.dueDate)
          return dueDate >= today && dueDate < tomorrow
        })
      },
    }),
    {
      name: 'productivity-tasks',
    }
  )
)
