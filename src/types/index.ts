// Core Types for Productivity App

// Task Types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskCategory = 'work' | 'personal' | 'social' | 'web3' | 'health'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate?: Date
  createdAt: Date
  completedAt?: Date
  deepLink?: string // For one-click execution
  externalUrl?: string // For social/web3 tasks
  tags: string[]
}

// Habit Types
export type HabitFrequency = 'daily' | 'weekly' | 'custom'

export interface Habit {
  id: string
  title: string
  description?: string
  frequency: HabitFrequency
  targetDays?: number[] // 0-6 for custom (Sunday = 0)
  streak: number
  longestStreak: number
  completedDates: string[] // ISO date strings
  createdAt: Date
  color: string
  icon: string
}

// Time Tracking Types
export type TimerStatus = 'idle' | 'running' | 'paused' | 'break'

export interface TimeEntry {
  id: string
  taskId?: string
  title: string
  startTime: Date
  endTime?: Date
  duration: number // in seconds
  category: TaskCategory
}

export interface TimerState {
  status: TimerStatus
  currentEntry?: TimeEntry
  elapsedSeconds: number
  targetMinutes: number // Pomodoro target
}

// Notes Types
export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  isPinned: boolean
}

// Notification Types (Duolingo-style)
export type NotificationType = 'guilt' | 'celebration' | 'passive_aggressive' | 'urgent' | 'fomo'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  taskId?: string
  deepLink?: string
  createdAt: Date
  read: boolean
  mascotExpression: 'sad' | 'happy' | 'angry' | 'scheming' | 'celebrating'
}

// Mascot State
export type MascotMood = 'happy' | 'sad' | 'excited' | 'disappointed' | 'scheming' | 'celebrating' | 'neutral'

export interface MascotState {
  mood: MascotMood
  message: string
  lastInteraction: Date
}

// App View State
export type AppView = 'tasks' | 'habits' | 'timer' | 'notes' | 'settings'
