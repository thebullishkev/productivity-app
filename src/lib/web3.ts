// Web3 Integration for Productivity App

export type Web3TaskType = 'mint' | 'claim' | 'vote' | 'stake' | 'bridge' | 'swap' | 'sign' | 'custom'
export type ChainId = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'optimism' | 'solana'

export interface Web3Task {
  id: string
  type: Web3TaskType
  title: string
  description?: string
  chain: ChainId
  contractAddress?: string
  deadline?: Date
  estimatedGas?: string
  value?: string
  deepLink?: string
  completed: boolean
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: ChainId | null
  balance: string | null
}

// Chain configurations
export const chains: Record<ChainId, { name: string; chainIdHex: string; rpcUrl: string; explorer: string }> = {
  ethereum: {
    name: 'Ethereum',
    chainIdHex: '0x1',
    rpcUrl: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
  },
  polygon: {
    name: 'Polygon',
    chainIdHex: '0x89',
    rpcUrl: 'https://polygon.llamarpc.com',
    explorer: 'https://polygonscan.com',
  },
  arbitrum: {
    name: 'Arbitrum',
    chainIdHex: '0xa4b1',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
  },
  base: {
    name: 'Base',
    chainIdHex: '0x2105',
    rpcUrl: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
  },
  optimism: {
    name: 'Optimism',
    chainIdHex: '0xa',
    rpcUrl: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
  },
  solana: {
    name: 'Solana',
    chainIdHex: 'solana',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io',
  },
}

// Check if MetaMask or similar wallet is available
export function isWalletAvailable(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined'
}

// Connect wallet
export async function connectWallet(): Promise<WalletState> {
  if (!isWalletAvailable()) {
    throw new Error('No wallet found. Please install MetaMask or another Web3 wallet.')
  }

  const ethereum = (window as any).ethereum

  try {
    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const address = accounts[0]

    // Get chain ID
    const chainIdHex = await ethereum.request({ method: 'eth_chainId' })
    const chainId = getChainIdFromHex(chainIdHex)

    // Get balance
    const balanceHex = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })
    const balance = (parseInt(balanceHex, 16) / 1e18).toFixed(4)

    return {
      isConnected: true,
      address,
      chainId,
      balance,
    }
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the connection request')
    }
    throw error
  }
}

// Disconnect wallet (clear state)
export function disconnectWallet(): WalletState {
  return {
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  }
}

// Switch chain
export async function switchChain(chainId: ChainId): Promise<void> {
  if (!isWalletAvailable()) {
    throw new Error('No wallet found')
  }

  const chain = chains[chainId]
  if (!chain || chainId === 'solana') {
    throw new Error('Chain not supported for switching')
  }

  const ethereum = (window as any).ethereum

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.chainIdHex }],
    })
  } catch (error: any) {
    // Chain not added, try to add it
    if (error.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chain.chainIdHex,
          chainName: chain.name,
          rpcUrls: [chain.rpcUrl],
          blockExplorerUrls: [chain.explorer],
        }],
      })
    } else {
      throw error
    }
  }
}

// Get chain ID from hex
function getChainIdFromHex(hex: string): ChainId | null {
  for (const [id, chain] of Object.entries(chains)) {
    if (chain.chainIdHex === hex) {
      return id as ChainId
    }
  }
  return null
}

// Format address for display
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Sign message (for verification)
export async function signMessage(message: string): Promise<string> {
  if (!isWalletAvailable()) {
    throw new Error('No wallet found')
  }

  const ethereum = (window as any).ethereum
  const accounts = await ethereum.request({ method: 'eth_accounts' })

  if (accounts.length === 0) {
    throw new Error('No account connected')
  }

  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [message, accounts[0]],
  })

  return signature
}

// Execute Web3 task
export async function executeWeb3Task(task: Web3Task): Promise<{ success: boolean; txHash?: string; error?: string }> {
  if (!isWalletAvailable()) {
    return { success: false, error: 'No wallet found' }
  }

  // If task has a deep link, open it
  if (task.deepLink) {
    window.open(task.deepLink, '_blank')
    return { success: true }
  }

  // For tasks that require signing/sending
  try {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length === 0) {
      return { success: false, error: 'No account connected' }
    }

    // Simple transaction for demo
    if (task.type === 'sign') {
      const signature = await signMessage(`Completing task: ${task.title}`)
      return { success: true, txHash: signature }
    }

    // For other types, we'd integrate with specific protocols
    // This is a placeholder for actual contract interactions
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Create sample Web3 tasks
export function createSampleWeb3Tasks(): Web3Task[] {
  return [
    {
      id: 'w3-1',
      type: 'claim',
      title: 'Claim your AIRDROP',
      description: 'You have unclaimed tokens waiting!',
      chain: 'ethereum',
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
      deepLink: 'https://app.uniswap.org',
      completed: false,
    },
    {
      id: 'w3-2',
      type: 'vote',
      title: 'Vote on governance proposal',
      description: 'Your tokens want to be heard',
      chain: 'ethereum',
      deepLink: 'https://snapshot.org',
      completed: false,
    },
    {
      id: 'w3-3',
      type: 'stake',
      title: 'Stake ETH for rewards',
      description: 'Earn passive income on your holdings',
      chain: 'ethereum',
      estimatedGas: '0.002 ETH',
      completed: false,
    },
    {
      id: 'w3-4',
      type: 'mint',
      title: 'Mint daily NFT reward',
      description: 'Free mint for active users',
      chain: 'base',
      deepLink: 'https://opensea.io',
      completed: false,
    },
  ]
}

// Listen for account/chain changes
export function setupWalletListeners(
  onAccountChange: (accounts: string[]) => void,
  onChainChange: (chainId: string) => void,
  onDisconnect: () => void
): () => void {
  if (!isWalletAvailable()) return () => {}

  const ethereum = (window as any).ethereum

  ethereum.on('accountsChanged', onAccountChange)
  ethereum.on('chainChanged', onChainChange)
  ethereum.on('disconnect', onDisconnect)

  // Return cleanup function
  return () => {
    ethereum.removeListener('accountsChanged', onAccountChange)
    ethereum.removeListener('chainChanged', onChainChange)
    ethereum.removeListener('disconnect', onDisconnect)
  }
}
