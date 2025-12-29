import { useEffect } from 'react'
import { Wallet, ExternalLink, Check, Zap, RefreshCw } from 'lucide-react'
import { clsx } from 'clsx'
import { useWeb3Store, useAppStore } from '../../store'
import { Button, Card, Badge } from '../ui'
import { chains, formatAddress, type ChainId, type Web3Task } from '../../lib/web3'

const taskTypeIcons: Record<string, string> = {
  mint: '🎨',
  claim: '🎁',
  vote: '🗳️',
  stake: '💰',
  bridge: '🌉',
  swap: '🔄',
  sign: '✍️',
  custom: '⚡',
}

const taskTypeColors: Record<string, string> = {
  mint: 'bg-purple-100 text-purple-700',
  claim: 'bg-green-100 text-green-700',
  vote: 'bg-blue-100 text-blue-700',
  stake: 'bg-yellow-100 text-yellow-700',
  bridge: 'bg-orange-100 text-orange-700',
  swap: 'bg-pink-100 text-pink-700',
  sign: 'bg-gray-100 text-gray-700',
  custom: 'bg-indigo-100 text-indigo-700',
}

function WalletConnect() {
  const { wallet, isConnecting, connectWallet, disconnectWallet, error, clearError } = useWeb3Store()
  const { setMascotMood } = useAppStore()

  const handleConnect = async () => {
    await connectWallet()
    setMascotMood('excited', 'Web3 wallet connected! Time to claim some rewards!')
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setMascotMood('sad', 'Wallet disconnected... but why?')
  }

  if (wallet.isConnected) {
    return (
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-text">{formatAddress(wallet.address!)}</p>
              <p className="text-sm text-text-muted">
                {wallet.chainId && chains[wallet.chainId]?.name} • {wallet.balance} ETH
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-text">Connect Wallet</h3>
          <p className="text-sm text-text-muted">Link your wallet to manage Web3 tasks</p>
        </div>
        <Button onClick={handleConnect} isLoading={isConnecting}>
          <Wallet className="w-4 h-4" />
          Connect
        </Button>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-accent-error">{error}</p>
          <button onClick={clearError} className="text-xs text-text-muted hover:text-text mt-1">
            Dismiss
          </button>
        </div>
      )}
    </Card>
  )
}

function Web3TaskItem({ task }: { task: Web3Task }) {
  const { executeTask, completeWeb3Task } = useWeb3Store()
  const { setMascotMood } = useAppStore()

  const handleExecute = async () => {
    const result = await executeTask(task.id)
    if (result.success) {
      setMascotMood('celebrating', 'Web3 task completed! Blockchain gains!')
    } else if (result.error) {
      setMascotMood('sad', `Oops: ${result.error}`)
    }
  }

  const handleComplete = () => {
    completeWeb3Task(task.id)
    setMascotMood('celebrating', 'Another Web3 task crushed!')
  }

  const isOverdue = task.deadline && new Date(task.deadline) < new Date()

  return (
    <Card
      variant={task.completed ? 'default' : 'interactive'}
      className={clsx('mb-3', task.completed && 'opacity-60')}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
            taskTypeColors[task.type] || taskTypeColors.custom
          )}
        >
          {taskTypeIcons[task.type] || '⚡'}
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
            {isOverdue && !task.completed && (
              <Badge variant="error" size="sm">Urgent</Badge>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-text-muted mb-2">{task.description}</p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default" size="sm">
              {chains[task.chain]?.name || task.chain}
            </Badge>
            <Badge variant="primary" size="sm">
              {task.type}
            </Badge>
            {task.estimatedGas && (
              <span className="text-xs text-text-muted">Gas: {task.estimatedGas}</span>
            )}
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
              <Zap className="w-4 h-4" />
              Execute
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

export function Web3Tasks() {
  const { tasks, loadSampleTasks, wallet } = useWeb3Store()

  useEffect(() => {
    if (tasks.length === 0) {
      loadSampleTasks()
    }
  }, [])

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div>
      <WalletConnect />

      {/* Stats */}
      {wallet.isConnected && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-primary">{pendingTasks.length}</p>
            <p className="text-xs text-text-muted">Pending</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-accent-success">{completedTasks.length}</p>
            <p className="text-xs text-text-muted">Completed</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-text">{wallet.balance || '0'}</p>
            <p className="text-xs text-text-muted">ETH Balance</p>
          </Card>
        </div>
      )}

      {/* Pending Tasks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">
            Web3 Tasks ({pendingTasks.length})
          </h3>
          <Button variant="ghost" size="sm" onClick={loadSampleTasks}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {pendingTasks.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-text-muted">No Web3 tasks. Connect your wallet to get started!</p>
          </Card>
        ) : (
          pendingTasks.map((task) => <Web3TaskItem key={task.id} task={task} />)
        )}
      </div>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
            Completed ({completedTasks.length})
          </h3>
          {completedTasks.slice(0, 3).map((task) => (
            <Web3TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
