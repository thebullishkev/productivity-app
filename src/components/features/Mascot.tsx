import { useEffect } from 'react'
import { clsx } from 'clsx'
import { useAppStore, useTaskStore, useHabitStore } from '../../store'
import type { MascotMood } from '../../types'

// Mascot expressions as SVG components (placeholder - replace with actual mascot images)
const mascotExpressions: Record<MascotMood, string> = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  disappointed: '😔',
  scheming: '😏',
  celebrating: '🎉',
  neutral: '🙂',
}

const moodColors: Record<MascotMood, string> = {
  happy: 'from-green-400 to-teal-400',
  sad: 'from-blue-400 to-indigo-400',
  excited: 'from-yellow-400 to-orange-400',
  disappointed: 'from-gray-400 to-slate-400',
  scheming: 'from-purple-400 to-pink-400',
  celebrating: 'from-pink-400 to-rose-400',
  neutral: 'from-primary to-accent-success',
}

export function Mascot() {
  const { mascot, setMascotMood } = useAppStore()
  const { tasks, getOverdueTasks } = useTaskStore()
  const { habits, getCompletedTodayCount, getTodaysHabits } = useHabitStore()

  // Smart mood updates based on user activity
  useEffect(() => {
    const checkMood = () => {
      const overdueTasks = getOverdueTasks()
      const todaysHabits = getTodaysHabits()
      const completedHabits = getCompletedTodayCount()
      const now = new Date()
      const hoursSinceInteraction = (now.getTime() - new Date(mascot.lastInteraction).getTime()) / (1000 * 60 * 60)

      // Check for overdue tasks
      if (overdueTasks.length > 3) {
        setMascotMood('scheming', `You have ${overdueTasks.length} overdue tasks... just saying.`)
        return
      }

      // Check for habit completion
      if (todaysHabits.length > 0 && completedHabits === todaysHabits.length) {
        setMascotMood('celebrating', 'ALL habits completed! You absolute LEGEND!')
        return
      }

      // Passive aggressive after no interaction
      if (hoursSinceInteraction > 2) {
        setMascotMood('sad', "I've been waiting here... no pressure though.")
        return
      }

      // Default to neutral after a while
      if (hoursSinceInteraction > 0.5 && mascot.mood !== 'neutral') {
        setMascotMood('neutral')
      }
    }

    // Check mood every 5 minutes
    const interval = setInterval(checkMood, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [mascot.lastInteraction, getOverdueTasks, getTodaysHabits, getCompletedTodayCount, setMascotMood])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech Bubble */}
      <div
        className={clsx(
          'absolute bottom-full right-0 mb-3 w-64 p-4 rounded-2xl',
          'bg-surface shadow-lg border border-gray-100',
          'animate-fade-in',
          'before:absolute before:bottom-[-8px] before:right-6',
          'before:w-4 before:h-4 before:bg-surface',
          'before:rotate-45 before:border-r before:border-b before:border-gray-100'
        )}
      >
        <p className="text-sm text-text">{mascot.message}</p>
      </div>

      {/* Mascot Avatar */}
      <button
        onClick={() => setMascotMood('happy', "Hi there! Let's be productive!")}
        className={clsx(
          'w-16 h-16 rounded-2xl',
          'bg-gradient-to-br shadow-lg',
          'flex items-center justify-center text-3xl',
          'transition-all duration-300 hover:scale-110',
          'animate-bounce',
          moodColors[mascot.mood]
        )}
        style={{ animationDuration: '2s' }}
      >
        {mascotExpressions[mascot.mood]}
      </button>

      {/* Notification dot */}
      {mascot.mood === 'scheming' && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-error rounded-full animate-pulse" />
      )}
    </div>
  )
}

// Notification component for Duolingo-style push notifications
export function MascotNotification({
  message,
  onClose,
  onAction,
  actionLabel = 'Do it now',
}: {
  message: string
  onClose: () => void
  onAction?: () => void
  actionLabel?: string
}) {
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className="flex items-start gap-4 p-4 bg-surface rounded-2xl shadow-xl border border-gray-100 max-w-sm">
        {/* Mascot mini avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-success flex items-center justify-center text-2xl flex-shrink-0">
          😢
        </div>

        <div className="flex-1">
          <p className="text-sm text-text mb-3">{message}</p>
          <div className="flex gap-2">
            {onAction && (
              <button
                onClick={onAction}
                className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
              >
                {actionLabel}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-text-muted text-sm hover:text-text transition-colors"
            >
              5 min
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-text-muted hover:text-text transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}
