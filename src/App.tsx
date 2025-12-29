import { useAppStore } from './store'
import { Sidebar, Header } from './components/layout'
import {
  TaskList,
  HabitTracker,
  Timer,
  Notes,
  Mascot,
  Web3Tasks,
  SocialTasks,
  NotificationCenter,
} from './components/features'
import { Card } from './components/ui'

function SettingsView() {
  const { userName, setUserName } = useAppStore()

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-xl">
        <Card className="mb-6">
          <h3 className="font-semibold text-text mb-4">Profile</h3>
          <label className="block text-sm font-medium text-text mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5
                       text-text placeholder:text-text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </Card>

        <Card className="mb-6">
          <h3 className="font-semibold text-text mb-4">Notifications</h3>
          <p className="text-sm text-text-muted">
            Duolingo-style manipulative notifications coming soon!
            The mascot will guilt-trip you into completing your tasks.
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-text mb-4">About</h3>
          <p className="text-sm text-text-muted mb-2">
            <strong>Prodowl</strong> - Your guilt-tripping productivity companion
          </p>
          <p className="text-sm text-text-muted">
            Built with React, TypeScript, Tailwind CSS, and Zustand.
            Featuring a manipulative mascot that won't let you slack off.
          </p>
        </Card>
      </div>
    </div>
  )
}

function MainContent() {
  const { currentView } = useAppStore()

  switch (currentView) {
    case 'tasks':
      return <TaskList />
    case 'habits':
      return <HabitTracker />
    case 'timer':
      return <Timer />
    case 'notes':
      return <Notes />
    case 'web3':
      return (
        <div className="h-full overflow-auto p-6">
          <div className="max-w-4xl">
            <Web3Tasks />
          </div>
        </div>
      )
    case 'social':
      return (
        <div className="h-full overflow-auto p-6">
          <div className="max-w-4xl">
            <SocialTasks />
          </div>
        </div>
      )
    case 'notifications':
      return (
        <div className="h-full overflow-auto p-6">
          <div className="max-w-2xl">
            <NotificationCenter />
          </div>
        </div>
      )
    case 'settings':
      return <SettingsView />
    default:
      return <TaskList />
  }
}

function App() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <MainContent />
        </main>
      </div>

      {/* Floating Mascot */}
      <Mascot />
    </div>
  )
}

export default App
