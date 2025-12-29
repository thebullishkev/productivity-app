import { useState } from 'react'
import { Plus, Check, Trash2, ExternalLink, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useTaskStore, useAppStore } from '../../store'
import { Button, Card, Input, Badge } from '../ui'
import type { Task, TaskPriority, TaskCategory } from '../../types'

const priorityColors: Record<TaskPriority, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-600',
  urgent: 'bg-red-100 text-red-600',
}

const categoryColors: Record<TaskCategory, string> = {
  work: 'bg-purple-100 text-purple-600',
  personal: 'bg-green-100 text-green-600',
  social: 'bg-pink-100 text-pink-600',
  web3: 'bg-yellow-100 text-yellow-600',
  health: 'bg-teal-100 text-teal-600',
}

function TaskItem({ task }: { task: Task }) {
  const { updateTask, deleteTask, completeTask } = useTaskStore()
  const { setMascotMood } = useAppStore()
  const isCompleted = task.status === 'completed'

  const handleComplete = () => {
    completeTask(task.id)
    setMascotMood('celebrating', 'YESSS! One more task CRUSHED!')
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleDeepLink = () => {
    if (task.externalUrl) {
      window.open(task.externalUrl, '_blank')
    }
  }

  return (
    <Card
      variant={isCompleted ? 'default' : 'interactive'}
      className={clsx(
        'mb-3 animate-fade-in',
        isCompleted && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={clsx(
            'w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
            'transition-all duration-150',
            isCompleted
              ? 'bg-accent-success border-accent-success'
              : 'border-gray-300 hover:border-primary hover:bg-primary/5'
          )}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={clsx(
                'font-medium text-text truncate',
                isCompleted && 'line-through text-text-muted'
              )}
            >
              {task.title}
            </h4>
            {task.externalUrl && (
              <button
                onClick={handleDeepLink}
                className="text-text-muted hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-text-muted mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="default" className={categoryColors[task.category]}>
              {task.category}
            </Badge>
            {task.dueDate && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={handleDelete}
          className="p-2 text-text-muted hover:text-accent-error hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}

function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory>('personal')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const { addTask } = useTaskStore()
  const { setMascotMood } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title: title.trim(),
      category,
      priority,
      tags: [],
    })

    setTitle('')
    setIsOpen(false)
    setMascotMood('excited', "New task added! Let's crush it!")
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full mb-4">
        <Plus className="w-4 h-4" />
        Add Task
      </Button>
    )
  }

  return (
    <Card className="mb-4 animate-slide-up">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="flex gap-4 mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="social">Social</option>
            <option value="web3">Web3</option>
            <option value="health">Health</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <Button type="submit" className="flex-1">
            Add Task
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

export function TaskList() {
  const { tasks, getTasksByStatus } = useTaskStore()
  const pendingTasks = tasks.filter((t) => t.status !== 'completed')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  return (
    <div className="h-full overflow-auto p-6">
      <AddTaskForm />

      {/* Pending Tasks */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
          To Do ({pendingTasks.length})
        </h3>
        {pendingTasks.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-text-muted">No tasks yet. Add one to get started!</p>
          </Card>
        ) : (
          pendingTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
            Completed ({completedTasks.length})
          </h3>
          {completedTasks.slice(0, 5).map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
