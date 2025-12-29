import { clsx } from 'clsx'
import {
  CheckSquare,
  Repeat,
  Clock,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { useAppStore } from '../../store'
import type { AppView } from '../../types'

interface NavItem {
  id: AppView
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'habits', label: 'Habits', icon: Repeat },
  { id: 'timer', label: 'Timer', icon: Clock },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { currentView, setView } = useAppStore()

  return (
    <aside className="w-64 h-screen bg-surface border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-success flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="font-bold text-text">Prodowl</h1>
            <p className="text-xs text-text-muted">Stay productive</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => setView(item.id)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl',
                    'transition-all duration-150 text-left',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-muted hover:bg-gray-100 hover:text-text'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-primary/10 to-accent-success/10 rounded-xl p-4">
          <p className="text-sm font-medium text-text mb-1">Pro Tip</p>
          <p className="text-xs text-text-muted">
            Complete 3 tasks today to keep your streak alive!
          </p>
        </div>
      </div>
    </aside>
  )
}
