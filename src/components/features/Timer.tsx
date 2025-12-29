import { useEffect, useState } from 'react'
import { Play, Pause, Square, RotateCcw, Coffee } from 'lucide-react'
import { clsx } from 'clsx'
import { useTimerStore, useAppStore } from '../../store'
import { Button, Card, Input } from '../ui'
import type { TaskCategory } from '../../types'

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function TimerDisplay() {
  const {
    status,
    elapsedSeconds,
    targetMinutes,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
    tick,
  } = useTimerStore()
  const { setMascotMood } = useAppStore()

  const [taskTitle, setTaskTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory>('work')

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (status === 'running') {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [status, tick])

  // Check for timer completion
  useEffect(() => {
    if (status === 'running' && elapsedSeconds >= targetMinutes * 60) {
      stopTimer()
      setMascotMood('celebrating', `${targetMinutes} minutes CRUSHED! Take a break, champion!`)
      // Play notification sound
      new Audio('/notification.mp3').play().catch(() => {})
    }
  }, [elapsedSeconds, targetMinutes, status, stopTimer, setMascotMood])

  const remainingSeconds = Math.max(0, targetMinutes * 60 - elapsedSeconds)
  const progress = (elapsedSeconds / (targetMinutes * 60)) * 100

  const handleStart = () => {
    startTimer(taskTitle || 'Focus Session', category)
    setMascotMood('excited', "Let's DO THIS! Focus mode activated!")
  }

  const handlePause = () => {
    pauseTimer()
    setMascotMood('sad', "Wait... don't stop now!")
  }

  const handleResume = () => {
    resumeTimer()
    setMascotMood('happy', "Back to it! Let's go!")
  }

  const handleStop = () => {
    stopTimer()
    setMascotMood('happy', 'Good session! Every minute counts.')
  }

  const handleReset = () => {
    resetTimer()
    setTaskTitle('')
  }

  return (
    <div className="flex flex-col items-center">
      {/* Timer Circle */}
      <div className="relative w-64 h-64 mb-8">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke={status === 'running' ? '#6366F1' : status === 'paused' ? '#F59E0B' : '#E5E7EB'}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-text tabular-nums">
            {formatTime(remainingSeconds)}
          </span>
          <span className="text-sm text-text-muted mt-2">
            {status === 'idle' && 'Ready to focus'}
            {status === 'running' && 'Focusing...'}
            {status === 'paused' && 'Paused'}
            {status === 'break' && 'Break time'}
          </span>
        </div>
      </div>

      {/* Task Input (only when idle) */}
      {status === 'idle' && (
        <div className="w-full max-w-xs mb-6 space-y-3">
          <Input
            placeholder="What are you working on?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="social">Social</option>
            <option value="web3">Web3</option>
            <option value="health">Health</option>
          </select>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4">
        {status === 'idle' && (
          <Button onClick={handleStart} size="lg">
            <Play className="w-5 h-5" />
            Start Focus
          </Button>
        )}

        {status === 'running' && (
          <>
            <Button onClick={handlePause} variant="secondary" size="lg">
              <Pause className="w-5 h-5" />
              Pause
            </Button>
            <Button onClick={handleStop} variant="danger" size="lg">
              <Square className="w-5 h-5" />
              Stop
            </Button>
          </>
        )}

        {status === 'paused' && (
          <>
            <Button onClick={handleResume} size="lg">
              <Play className="w-5 h-5" />
              Resume
            </Button>
            <Button onClick={handleStop} variant="danger" size="lg">
              <Square className="w-5 h-5" />
              Stop
            </Button>
          </>
        )}

        {(status === 'idle' || status === 'paused') && elapsedSeconds > 0 && (
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  )
}

function TimerSettings() {
  const { targetMinutes, setTargetMinutes } = useTimerStore()

  const presets = [15, 25, 45, 60]

  return (
    <Card className="mt-8">
      <h3 className="font-medium text-text mb-4">Session Length</h3>
      <div className="flex gap-2">
        {presets.map((minutes) => (
          <button
            key={minutes}
            onClick={() => setTargetMinutes(minutes)}
            className={clsx(
              'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
              targetMinutes === minutes
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-muted hover:bg-gray-200'
            )}
          >
            {minutes}m
          </button>
        ))}
      </div>
    </Card>
  )
}

function TodayStats() {
  const { getTodaysEntries, getTotalTimeToday } = useTimerStore()
  const todaysEntries = getTodaysEntries()
  const totalSeconds = getTotalTimeToday()

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  return (
    <Card className="mt-4">
      <h3 className="font-medium text-text mb-4">Today's Focus</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-text">
            {hours > 0 && `${hours}h `}{minutes}m
          </p>
          <p className="text-sm text-text-muted">Total focus time</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{todaysEntries.length}</p>
          <p className="text-sm text-text-muted">Sessions</p>
        </div>
      </div>
    </Card>
  )
}

export function Timer() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-md mx-auto">
        <TimerDisplay />
        <TimerSettings />
        <TodayStats />
      </div>
    </div>
  )
}
