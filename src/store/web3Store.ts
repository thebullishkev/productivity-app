import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Web3Task, WalletState, ChainId } from '../lib/web3'
import {
  connectWallet as connectWalletLib,
  disconnectWallet as disconnectWalletLib,
  switchChain as switchChainLib,
  executeWeb3Task as executeWeb3TaskLib,
  createSampleWeb3Tasks,
  setupWalletListeners,
} from '../lib/web3'

interface Web3StoreState {
  wallet: WalletState
  tasks: Web3Task[]
  isConnecting: boolean
  error: string | null

  // Actions
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchChain: (chainId: ChainId) => Promise<void>
  addWeb3Task: (task: Omit<Web3Task, 'id' | 'completed'>) => void
  completeWeb3Task: (id: string) => void
  executeTask: (id: string) => Promise<{ success: boolean; error?: string }>
  loadSampleTasks: () => void
  clearError: () => void
}

const generateId = () => `w3-${Math.random().toString(36).substring(2, 9)}`

export const useWeb3Store = create<Web3StoreState>()(
  persist(
    (set, get) => ({
      wallet: {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      },
      tasks: [],
      isConnecting: false,
      error: null,

      connectWallet: async () => {
        set({ isConnecting: true, error: null })
        try {
          const walletState = await connectWalletLib()
          set({ wallet: walletState, isConnecting: false })

          // Setup listeners for account/chain changes
          setupWalletListeners(
            (accounts) => {
              if (accounts.length === 0) {
                get().disconnectWallet()
              } else {
                set((state) => ({
                  wallet: { ...state.wallet, address: accounts[0] },
                }))
              }
            },
            () => {
              // Reload on chain change
              window.location.reload()
            },
            () => {
              get().disconnectWallet()
            }
          )
        } catch (error: any) {
          set({ error: error.message, isConnecting: false })
        }
      },

      disconnectWallet: () => {
        set({ wallet: disconnectWalletLib() })
      },

      switchChain: async (chainId) => {
        try {
          await switchChainLib(chainId)
          set((state) => ({
            wallet: { ...state.wallet, chainId },
          }))
        } catch (error: any) {
          set({ error: error.message })
        }
      },

      addWeb3Task: (taskData) => {
        const task: Web3Task = {
          ...taskData,
          id: generateId(),
          completed: false,
        }
        set((state) => ({ tasks: [...state.tasks, task] }))
      },

      completeWeb3Task: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          ),
        }))
      },

      executeTask: async (id) => {
        const task = get().tasks.find((t) => t.id === id)
        if (!task) return { success: false, error: 'Task not found' }

        const result = await executeWeb3TaskLib(task)
        if (result.success) {
          get().completeWeb3Task(id)
        }
        return result
      },

      loadSampleTasks: () => {
        const sampleTasks = createSampleWeb3Tasks()
        set({ tasks: sampleTasks })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'productivity-web3',
      partialize: (state) => ({ tasks: state.tasks }), // Don't persist wallet state
    }
  )
)
