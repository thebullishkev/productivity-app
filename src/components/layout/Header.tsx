import { Bell, Search } from 'lucide-react'
import { useAppStore } from '../../store'
import { Input } from '../ui'

export function Header() {
  const { currentView, notifications, getUnreadCount } = useAppStore()
  const unreadCount = getUnreadCount()

  const viewTitles: Record<string, string> = {
    tasks: 'Tasks',
    habits: 'Habits',
    timer: 'Focus Timer',
    notes: 'Notes',
    settings: 'Settings',
  }

  return (
    <header className="h-16 bg-surface border-b border-gray-100 px-6 flex items-center justify-between">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-text">
          {viewTitles[currentView] || 'Dashboard'}
        </h2>
        <p className="text-sm text-text-muted">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-200 bg-background
                       text-sm text-text placeholder:text-text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-150"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-text-muted" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-error text-white
                           text-xs font-medium rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-success
                          flex items-center justify-center text-white font-medium">
          U
        </button>
      </div>
    </header>
  )
}
