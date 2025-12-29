import { useEffect, useState } from 'react'
import { ExternalLink, Check, RefreshCw, Twitter, MessageCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useSocialStore, useAppStore } from '../../store'
import { Button, Card, Badge } from '../ui'
import { platformConfig, type SocialTask, type SocialPlatform } from '../../lib/social'

function SocialTaskItem({ task }: { task: SocialTask }) {
  const { executeTask, completeSocialTask, deleteSocialTask } = useSocialStore()
  const { setMascotMood } = useAppStore()
  const config = platformConfig[task.platform]

  const handleExecute = () => {
    executeTask(task.id)
    setMascotMood('scheming', `Opening ${config.name}... go crush it!`)
  }

  const handleComplete = () => {
    completeSocialTask(task.id)
    setMascotMood('celebrating', `${config.name} task done! Your presence is FELT!`)
  }

  return (
    <Card
      variant={task.completed ? 'default' : 'interactive'}
      className={clsx('mb-3', task.completed && 'opacity-60')}
    >
      <div className="flex items-start gap-4">
        {/* Platform Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white"
          style={{ backgroundColor: config.color }}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={clsx(
                'font-medium text-text',
                task.completed && 'line-through text-text-muted'
              )}
            >
              {task.title}
            </h4>
            <Badge
              variant="default"
              size="sm"
              style={{ backgroundColor: `${config.color}20`, color: config.color }}
            >
              {config.name}
            </Badge>
          </div>

          {task.description && (
            <p className="text-sm text-text-muted mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              {task.type}
            </Badge>
            {task.deadline && (
              <span className="text-xs text-text-muted">
                Due: {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        {!task.completed && (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleExecute}>
              <ExternalLink className="w-4 h-4" />
              Open
            </Button>
            <Button size="sm" variant="secondary" onClick={handleComplete}>
              <Check className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

function PlatformFilter({
  selected,
  onSelect,
}: {
  selected: SocialPlatform | 'all'
  onSelect: (platform: SocialPlatform | 'all') => void
}) {
  const platforms: (SocialPlatform | 'all')[] = ['all', 'twitter', 'discord', 'github', 'linkedin', 'telegram']

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {platforms.map((platform) => {
        const config = platform === 'all' ? null : platformConfig[platform]
        return (
          <button
            key={platform}
            onClick={() => onSelect(platform)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
              'transition-all duration-150',
              selected === platform
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-muted hover:bg-gray-200'
            )}
          >
            {config ? (
              <span className="flex items-center gap-2">
                <span>{config.icon}</span>
                <span>{config.name}</span>
              </span>
            ) : (
              'All'
            )}
          </button>
        )
      })}
    </div>
  )
}

export function SocialTasks() {
  const { tasks, loadSampleTasks, getPendingTasks, getCompletedCount } = useSocialStore()
  const [filter, setFilter] = useState<SocialPlatform | 'all'>('all')

  useEffect(() => {
    if (tasks.length === 0) {
      loadSampleTasks()
    }
  }, [])

  const pendingTasks = getPendingTasks()
  const completedCount = getCompletedCount()

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter((t) => t.platform === filter)

  const filteredPending = filteredTasks.filter((t) => !t.completed)
  const filteredCompleted = filteredTasks.filter((t) => t.completed)

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-primary">{pendingTasks.length}</p>
          <p className="text-sm text-text-muted">Social Tasks</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-accent-success">{completedCount}</p>
          <p className="text-sm text-text-muted">Completed Today</p>
        </Card>
      </div>

      {/* Filter */}
      <PlatformFilter selected={filter} onSelect={setFilter} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">
          {filter === 'all' ? 'All Platforms' : platformConfig[filter].name} ({filteredPending.length})
        </h3>
        <Button variant="ghost" size="sm" onClick={loadSampleTasks}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Pending Tasks */}
      {filteredPending.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-text-muted">No pending tasks for this platform.</p>
        </Card>
      ) : (
        filteredPending.map((task) => <SocialTaskItem key={task.id} task={task} />)
      )}

      {/* Completed */}
      {filteredCompleted.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
            Completed ({filteredCompleted.length})
          </h3>
          {filteredCompleted.slice(0, 3).map((task) => (
            <SocialTaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
