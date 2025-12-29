// Deep Linking System for One-Click Execution

export type DeepLinkAction =
  | 'complete-task'
  | 'open-task'
  | 'check-habit'
  | 'start-timer'
  | 'open-note'
  | 'external'

export interface DeepLink {
  action: DeepLinkAction
  id?: string
  params?: Record<string, string>
  externalUrl?: string
}

// App URL scheme
const APP_SCHEME = 'prodowl://'

// Parse deep link URL
export function parseDeepLink(url: string): DeepLink | null {
  try {
    // Handle app scheme
    if (url.startsWith(APP_SCHEME)) {
      const path = url.replace(APP_SCHEME, '')
      return parseDeepLinkPath(path)
    }

    // Handle web URLs
    if (url.includes('/app/')) {
      const path = url.split('/app/')[1]
      return parseDeepLinkPath(path)
    }

    return null
  } catch {
    return null
  }
}

function parseDeepLinkPath(path: string): DeepLink | null {
  const [action, id, ...rest] = path.split('/')

  switch (action) {
    case 'task':
      if (rest[0] === 'complete') {
        return { action: 'complete-task', id }
      }
      return { action: 'open-task', id }

    case 'habit':
      if (rest[0] === 'check') {
        return { action: 'check-habit', id }
      }
      return { action: 'check-habit', id }

    case 'timer':
      return { action: 'start-timer', params: { duration: id || '25' } }

    case 'note':
      return { action: 'open-note', id }

    case 'external':
      return { action: 'external', externalUrl: decodeURIComponent(id || '') }

    default:
      return null
  }
}

// Generate deep link URL
export function generateDeepLink(link: DeepLink): string {
  switch (link.action) {
    case 'complete-task':
      return `${APP_SCHEME}task/${link.id}/complete`
    case 'open-task':
      return `${APP_SCHEME}task/${link.id}`
    case 'check-habit':
      return `${APP_SCHEME}habit/${link.id}/check`
    case 'start-timer':
      return `${APP_SCHEME}timer/${link.params?.duration || '25'}`
    case 'open-note':
      return `${APP_SCHEME}note/${link.id}`
    case 'external':
      return `${APP_SCHEME}external/${encodeURIComponent(link.externalUrl || '')}`
    default:
      return APP_SCHEME
  }
}

// Generate web-based deep link (for sharing)
export function generateWebDeepLink(link: DeepLink, baseUrl: string = window.location.origin): string {
  const appPath = generateDeepLink(link).replace(APP_SCHEME, '')
  return `${baseUrl}/app/${appPath}`
}

// External app deep links
export const externalDeepLinks = {
  // Twitter/X
  twitter: {
    compose: (text: string) => `twitter://post?text=${encodeURIComponent(text)}`,
    profile: (username: string) => `twitter://user?screen_name=${username}`,
    webCompose: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  },

  // Discord
  discord: {
    channel: (serverId: string, channelId: string) => `discord://channels/${serverId}/${channelId}`,
    server: (serverId: string) => `discord://channels/${serverId}`,
    webChannel: (serverId: string, channelId: string) =>
      `https://discord.com/channels/${serverId}/${channelId}`,
  },

  // GitHub
  github: {
    repo: (owner: string, repo: string) => `github://repo/${owner}/${repo}`,
    issue: (owner: string, repo: string, issue: number) =>
      `https://github.com/${owner}/${repo}/issues/${issue}`,
    pr: (owner: string, repo: string, pr: number) =>
      `https://github.com/${owner}/${repo}/pull/${pr}`,
  },

  // MetaMask / Web3
  metamask: {
    connect: () => 'metamask://connect',
    send: (address: string, amount: string) =>
      `metamask://send?address=${address}&amount=${amount}`,
    // WalletConnect URI
    walletConnect: (uri: string) => `metamask://wc?uri=${encodeURIComponent(uri)}`,
  },

  // LinkedIn
  linkedin: {
    share: (url: string, title?: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}${title ? `&title=${encodeURIComponent(title)}` : ''}`,
    profile: (profileId: string) => `linkedin://profile/${profileId}`,
  },

  // Telegram
  telegram: {
    chat: (username: string) => `tg://resolve?domain=${username}`,
    share: (url: string, text?: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}${text ? `&text=${encodeURIComponent(text)}` : ''}`,
  },
}

// Open deep link with fallback
export function openDeepLink(
  primaryUrl: string,
  fallbackUrl?: string,
  timeout: number = 2000
): void {
  const start = Date.now()

  // Try to open the primary URL (app deep link)
  window.location.href = primaryUrl

  // If the app doesn't open, fall back to web URL
  if (fallbackUrl) {
    setTimeout(() => {
      // If we're still here and not much time passed, app probably isn't installed
      if (Date.now() - start < timeout + 100) {
        window.open(fallbackUrl, '_blank')
      }
    }, timeout)
  }
}

// Handle incoming deep link (for web app)
export function handleIncomingDeepLink(
  url: string,
  handlers: {
    onCompleteTask?: (taskId: string) => void
    onOpenTask?: (taskId: string) => void
    onCheckHabit?: (habitId: string) => void
    onStartTimer?: (duration: number) => void
    onOpenNote?: (noteId: string) => void
    onExternal?: (url: string) => void
  }
): boolean {
  const link = parseDeepLink(url)
  if (!link) return false

  switch (link.action) {
    case 'complete-task':
      handlers.onCompleteTask?.(link.id!)
      return true
    case 'open-task':
      handlers.onOpenTask?.(link.id!)
      return true
    case 'check-habit':
      handlers.onCheckHabit?.(link.id!)
      return true
    case 'start-timer':
      handlers.onStartTimer?.(parseInt(link.params?.duration || '25', 10))
      return true
    case 'open-note':
      handlers.onOpenNote?.(link.id!)
      return true
    case 'external':
      handlers.onExternal?.(link.externalUrl!)
      return true
    default:
      return false
  }
}
