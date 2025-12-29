import { useState } from 'react'
import { Plus, Flame, Check, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useHabitStore, useAppStore } from '../../store'
import { Button, Card, Input } from '../ui'
import type { Habit, HabitFrequency } from '../../types'

const habitColors = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6',
  '#3B82F6', '#8B5CF6', '#EC4899',
]

const habitIcons = ['💪', '📚', '🧘', '💧', '🏃', '😴', '🎯', '✍️']

function HabitCard({ habit }: { habit: Habit }) {
  const { toggleHabitCompletion, deleteHabit } = useHabitStore()
  const { setMascotMood } = useAppStore()
  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = habit.completedDates.includes(today)

  const handleToggle = () => {
    toggleHabitCompletion(habit.id)
    if (!isCompletedToday) {
      if (habit.streak >= 6) {
        setMascotMood('celebrating', `${habit.streak + 1} DAY STREAK! You're UNSTOPPABLE!`)
      } else {
        setMascotMood('happy', 'Another day, another win!')
      }
    } else {
      setMascotMood('sad', 'Wait... you unchecked that?')
    }
  }

  // Generate last 7 days for mini calendar
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  return (
    <Card variant="interactive" className="mb-3 animate-fade-in">
      <div className="flex items-center gap-4">
        {/* Icon & Color */}
        <button
          onClick={handleToggle}
          className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
            'transition-all duration-200',
            isCompletedToday
              ? 'ring-2 ring-offset-2'
              : 'opacity-70 hover:opacity-100'
          )}
          style={{
            backgroundColor: `${habit.color}20`,
            borderColor: habit.color,
            ...(isCompletedToday && { ringColor: habit.color }),
          }}
        >
          {isCompletedToday ? <Check className="w-6 h-6 text-accent-success" /> : habit.icon}
        </button>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-text">{habit.title}</h4>
            {habit.streak > 0 && (
              <span className="flex items-center gap-1 text-sm font-medium text-orange-500">
                <Flame className="w-4 h-4" />
                {habit.streak}
              </span>
            )}
          </div>

          {/* Mini calendar */}
          <div className="flex gap-1 mt-2">
            {last7Days.map((date) => {
              const isCompleted = habit.completedDates.includes(date)
              const isToday = date === today

              return (
                <div
                  key={date}
                  className={clsx(
                    'w-6 h-6 rounded flex items-center justify-center text-xs',
                    isCompleted
                      ? 'text-white'
                      : 'bg-gray-100 text-text-muted',
                    isToday && !isCompleted && 'ring-1 ring-primary'
                  )}
                  style={isCompleted ? { backgroundColor: habit.color } : undefined}
                >
                  {new Date(date).getDate()}
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => deleteHabit(habit.id)}
          className="p-2 text-text-muted hover:text-accent-error hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}

function AddHabitForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [frequency, setFrequency] = useState<HabitFrequency>('daily')
  const [selectedColor, setSelectedColor] = useState(habitColors[0])
  const [selectedIcon, setSelectedIcon] = useState(habitIcons[0])
  const { addHabit } = useHabitStore()
  const { setMascotMood } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addHabit({
      title: title.trim(),
      frequency,
      color: selectedColor,
      icon: selectedIcon,
    })

    setTitle('')
    setIsOpen(false)
    setMascotMood('excited', "New habit! I can't wait to see your streak grow!")
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full mb-4">
        <Plus className="w-4 h-4" />
        Add Habit
      </Button>
    )
  }

  return (
    <Card className="mb-4 animate-slide-up">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="What habit do you want to build?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        {/* Icon Selector */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-text mb-2">Icon</label>
          <div className="flex gap-2">
            {habitIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setSelectedIcon(icon)}
                className={clsx(
                  'w-10 h-10 rounded-lg text-xl flex items-center justify-center',
                  'transition-all duration-150',
                  selectedIcon === icon
                    ? 'bg-primary/10 ring-2 ring-primary'
                    : 'bg-gray-100 hover:bg-gray-200'
                )}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-text mb-2">Color</label>
          <div className="flex gap-2">
            {habitColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={clsx(
                  'w-8 h-8 rounded-full transition-all duration-150',
                  selectedColor === color && 'ring-2 ring-offset-2 ring-gray-400'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button type="submit" className="flex-1">
            Add Habit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}

export function HabitTracker() {
  const { habits, getTodaysHabits, getCompletedTodayCount } = useHabitStore()
  const todaysHabits = getTodaysHabits()
  const completedCount = getCompletedTodayCount()

  return (
    <div className="h-full overflow-auto p-6">
      {/* Progress Overview */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text">Today's Progress</h3>
            <p className="text-text-muted">
              {completedCount} of {todaysHabits.length} habits completed
            </p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#6366F1 ${(completedCount / Math.max(todaysHabits.length, 1)) * 360}deg, transparent 0deg)`,
                clipPath: 'circle(50% at 50% 50%)',
              }}
            />
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center z-10">
              <span className="font-bold text-text">
                {todaysHabits.length > 0
                  ? Math.round((completedCount / todaysHabits.length) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      <AddHabitForm />

      {/* Habits List */}
      {habits.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-text-muted">No habits yet. Start building good ones!</p>
        </Card>
      ) : (
        habits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
      )}
    </div>
  )
}
