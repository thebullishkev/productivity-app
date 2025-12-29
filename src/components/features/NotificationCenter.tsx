import { useEffect, useState } from 'react'
import { Bell, BellOff, X, Check, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { useAppStore, useTaskStore, useHabitStore } from '../../store'
import { Button, Card, Badge } from '../ui'
import {
  requestNotificationPermission,
  sendBrowserNotification,
  generateContextualNotification,
  getRandomMessage,
} from '../../lib/notifications'
import type { Notification } from '../../types'

function NotificationItem({ notification, onAction }: { notification: Notification; onAction?: () => void }) {
  const { markNotificationRead } = useAppStore()

  const typeColors = {
    guilt: 'border-l-blue-400',
    celebration: 'border-l-green-400',
    passive_aggressive: 'border-l-orange-400',
    urgent: 'border-l-red-400',
    fomo: 'border-l-purple-400',
  }

  const mascotEmojis = {
    sad: '😢',
    happy: '😊',
    angry: '😤',
    scheming: '😏',
    celebrating: '🎉',
  }

  return (
    <div
      className={clsx(
        'p-4 bg-surface border-l-4 rounded-r-xl mb-3',
        'transition-all duration-200',
        notification.read ? 'opacity-60' : 'shadow-sm',
        typeColors[notification.type]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{mascotEmojis[notification.mascotExpression]}</span>
        <div className="flex-1">
          <p className="font-medium text-text text-sm">{notification.title}</p>
          <p className="text-sm text-text-muted mt-1">{notification.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-text-muted">
              {new Date(notification.createdAt).toLocaleTimeString()}
            </span>
            <Badge variant="default" size="sm">
              {notification.type.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        {!notification.read && (
          <button
            onClick={() => markNotificationRead(notification.id)}
            className="p-1 text-text-muted hover:text-text"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {onAction && !notification.read && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={onAction}>
            Do it now
          </Button>
          <Button size="sm" variant="ghost">
            <Clock className="w-4 h-4" />
            5 min
          </Button>
        </div>
      )}
    </div>
  )
}

export function NotificationCenter() {
  const { notifications, clearNotifications, getUnreadCount, addNotification, setMascotMood } = useAppStore()
  const { tasks, getOverdueTasks } = useTaskStore()
  const { habits, getCompletedTodayCount, getTodaysHabits } = useHabitStore()

  const [permissionGranted, setPermissionGranted] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    // Check notification permission on mount
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted')
    }
  }, [])

  useEffect(() => {
    // Generate contextual notifications periodically
    const interval = setInterval(() => {
      const overdueTasks = getOverdueTasks()
      const todaysHabits = getTodaysHabits()
      const completedHabits = getCompletedTodayCount()

      const context = {
        overdueTaskCount: overdueTasks.length,
        pendingTaskCount: tasks.filter((t) => t.status === 'pending').length,
        currentStreak: habits.reduce((max, h) => Math.max(max, h.streak), 0),
        hoursSinceLastActivity: 0.5, // Would be calculated from actual activity
        completedToday: completedHabits,
      }

      const notification = generateContextualNotification(context)

      if (notification && Math.random() > 0.7) { // 30% chance to trigger
        addNotification({
          type: notification.type,
          title: 'Prodowl says...',
          message: notification.message,
          mascotExpression: notification.mascotExpression as any,
        })

        // Also update mascot mood
        setMascotMood(notification.mascotExpression, notification.message)

        // Send browser notification if permitted
        if (permissionGranted) {
          sendBrowserNotification('Prodowl', notification.message)
        }
      }
    }, 5 * 60 * 1000) // Every 5 minutes

    return () => clearInterval(interval)
  }, [tasks, habits, permissionGranted])

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission()
    setPermissionGranted(granted)
    if (granted) {
      setMascotMood('celebrating', 'Notifications enabled! I can now bug you properly!')
    }
  }

  const handleTestNotification = () => {
    const types = ['guilt', 'passive_aggressive', 'urgent', 'celebration', 'fomo'] as const
    const type = types[Math.floor(Math.random() * types.length)]
    const message = getRandomMessage(type, { name: 'You', count: '5', hours: '3' })

    addNotification({
      type,
      title: 'Test Notification',
      message,
      mascotExpression: type === 'celebration' ? 'celebrating' : type === 'guilt' ? 'sad' : 'scheming',
    })

    if (permissionGranted) {
      sendBrowserNotification('Prodowl', message)
    }
  }

  const unreadCount = getUnreadCount()
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5)

  return (
    <div>
      {/* Permission Banner */}
      {!permissionGranted && (
        <Card className="mb-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-text">Enable Notifications</p>
                <p className="text-sm text-text-muted">
                  Let me guilt-trip you even when you're not in the app!
                </p>
              </div>
            </div>
            <Button size="sm" onClick={handleRequestPermission}>
              Enable
            </Button>
          </div>
        </Card>
      )}

      {/* Stats & Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-text-muted" />
            <span className="font-medium text-text">{unreadCount} unread</span>
          </div>
          <Badge variant={permissionGranted ? 'success' : 'default'}>
            {permissionGranted ? 'Notifications On' : 'Notifications Off'}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleTestNotification}>
            Test
          </Button>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearNotifications}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <Card className="text-center py-8">
          <BellOff className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No notifications yet.</p>
          <p className="text-sm text-text-muted mt-1">
            Don't worry, I'll find something to bug you about soon!
          </p>
        </Card>
      ) : (
        <>
          {displayedNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}

          {notifications.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-2 text-sm text-primary hover:text-primary-hover transition-colors"
            >
              {showAll ? 'Show less' : `Show ${notifications.length - 5} more`}
            </button>
          )}
        </>
      )}
    </div>
  )
}
