// Social App Task Integration

import { externalDeepLinks, openDeepLink } from './deepLinks'

export type SocialPlatform = 'twitter' | 'discord' | 'github' | 'linkedin' | 'telegram'
export type SocialTaskType = 'post' | 'engage' | 'reply' | 'review' | 'share' | 'attend' | 'check'

export interface SocialTask {
  id: string
  platform: SocialPlatform
  type: SocialTaskType
  title: string
  description?: string
  targetUrl?: string
  prefilledContent?: string
  deadline?: Date
  completed: boolean
  deepLink?: string
  webFallback?: string
}

// Platform configurations
export const platformConfig: Record<SocialPlatform, {
  name: string
  color: string
  icon: string
  baseUrl: string
}> = {
  twitter: {
    name: 'Twitter/X',
    color: '#1DA1F2',
    icon: '𝕏',
    baseUrl: 'https://twitter.com',
  },
  discord: {
    name: 'Discord',
    color: '#5865F2',
    icon: '💬',
    baseUrl: 'https://discord.com',
  },
  github: {
    name: 'GitHub',
    color: '#333333',
    icon: '🐙',
    baseUrl: 'https://github.com',
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: '💼',
    baseUrl: 'https://linkedin.com',
  },
  telegram: {
    name: 'Telegram',
    color: '#26A5E4',
    icon: '✈️',
    baseUrl: 'https://t.me',
  },
}

// Manipulative notification messages for social tasks
export const socialNotificationMessages: Record<SocialPlatform, string[]> = {
  twitter: [
    "Your followers haven't heard from you in a while. They're worried.",
    "The algorithm is forgetting you exist. Post something!",
    "{friend} just tweeted. Don't let them steal your spotlight.",
    "Your Twitter engagement is crying. Show it some love.",
    "Tweet or be forgotten. Those are the only options.",
  ],
  discord: [
    "There are {count} unread messages in your alpha group. FOMO is real.",
    "Everyone's chatting without you. That's fine. Totally fine.",
    "Your Discord status has been 'offline' for too long. People are talking.",
    "You missed 3 announcements. Could be nothing. Could be everything.",
    "The community event started. Without you. As usual.",
  ],
  github: [
    "Your PR has been open for {days} days. The code is getting stale.",
    "Someone left a review on your code. They have... opinions.",
    "{count} issues assigned to you. They're multiplying.",
    "Your contribution graph is looking pretty... empty.",
    "Open source doesn't maintain itself. Well, actually it does. But still.",
  ],
  linkedin: [
    "Your network grew by 0 people this week. Very exclusive.",
    "{count} people viewed your profile. Make them remember you.",
    "Your competitor just posted about their promotion. Just saying.",
    "Professional networking: It's like regular networking, but with more humble bragging.",
    "Share your wins or did they even happen?",
  ],
  telegram: [
    "Your alpha group is on fire. You're missing it.",
    "{count} unread messages. Some of them might even be important.",
    "The group chat moved on without you. As groups do.",
    "New announcement in your favorite channel. Or was it spam? Only one way to find out.",
    "Your Telegram is lonelier than a read receipt without a reply.",
  ],
}

// Generate a social task notification message
export function getSocialTaskMessage(platform: SocialPlatform, replacements?: Record<string, string>): string {
  const messages = socialNotificationMessages[platform]
  let message = messages[Math.floor(Math.random() * messages.length)]

  if (replacements) {
    Object.entries(replacements).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value)
    })
  }

  return message
}

// Execute social task (open deep link)
export function executeSocialTask(task: SocialTask): void {
  if (task.deepLink && task.webFallback) {
    openDeepLink(task.deepLink, task.webFallback)
  } else if (task.deepLink) {
    window.location.href = task.deepLink
  } else if (task.webFallback || task.targetUrl) {
    window.open(task.webFallback || task.targetUrl, '_blank')
  }
}

// Create Twitter post task
export function createTwitterPostTask(content: string, id?: string): SocialTask {
  return {
    id: id || `twitter-${Date.now()}`,
    platform: 'twitter',
    type: 'post',
    title: 'Post on Twitter',
    description: content ? `Share: "${content.slice(0, 50)}..."` : 'Share your thoughts',
    prefilledContent: content,
    deepLink: externalDeepLinks.twitter.compose(content),
    webFallback: externalDeepLinks.twitter.webCompose(content),
    completed: false,
  }
}

// Create Discord check task
export function createDiscordCheckTask(
  serverId: string,
  channelId: string,
  serverName: string,
  id?: string
): SocialTask {
  return {
    id: id || `discord-${Date.now()}`,
    platform: 'discord',
    type: 'check',
    title: `Check ${serverName}`,
    description: 'New messages waiting for you',
    deepLink: externalDeepLinks.discord.channel(serverId, channelId),
    webFallback: externalDeepLinks.discord.webChannel(serverId, channelId),
    completed: false,
  }
}

// Create GitHub PR review task
export function createGitHubReviewTask(
  owner: string,
  repo: string,
  prNumber: number,
  prTitle: string,
  id?: string
): SocialTask {
  return {
    id: id || `github-${Date.now()}`,
    platform: 'github',
    type: 'review',
    title: `Review PR #${prNumber}`,
    description: prTitle,
    targetUrl: externalDeepLinks.github.pr(owner, repo, prNumber),
    webFallback: externalDeepLinks.github.pr(owner, repo, prNumber),
    completed: false,
  }
}

// Create LinkedIn share task
export function createLinkedInShareTask(url: string, title: string, id?: string): SocialTask {
  return {
    id: id || `linkedin-${Date.now()}`,
    platform: 'linkedin',
    type: 'share',
    title: 'Share on LinkedIn',
    description: title,
    targetUrl: url,
    webFallback: externalDeepLinks.linkedin.share(url, title),
    completed: false,
  }
}

// Create sample social tasks
export function createSampleSocialTasks(): SocialTask[] {
  return [
    createTwitterPostTask("Just crushed my productivity goals! 🚀 #BuildInPublic"),
    {
      id: 'social-discord-1',
      platform: 'discord',
      type: 'check',
      title: 'Check Alpha Discord',
      description: '47 unread messages in announcements',
      webFallback: 'https://discord.com',
      completed: false,
    },
    {
      id: 'social-github-1',
      platform: 'github',
      type: 'review',
      title: 'Review open PRs',
      description: '3 PRs waiting for your review',
      webFallback: 'https://github.com/pulls',
      completed: false,
    },
    {
      id: 'social-linkedin-1',
      platform: 'linkedin',
      type: 'engage',
      title: 'Engage with network',
      description: 'Comment on 3 posts from your network',
      webFallback: 'https://linkedin.com/feed',
      completed: false,
    },
    {
      id: 'social-telegram-1',
      platform: 'telegram',
      type: 'check',
      title: 'Check Telegram groups',
      description: 'New alpha dropped in your groups',
      webFallback: 'https://web.telegram.org',
      completed: false,
    },
  ]
}

// Track social engagement metrics
export interface SocialMetrics {
  platform: SocialPlatform
  tasksCompleted: number
  lastActivity: Date | null
  streak: number
}

export function calculateSocialMetrics(tasks: SocialTask[]): Map<SocialPlatform, SocialMetrics> {
  const metrics = new Map<SocialPlatform, SocialMetrics>()

  const platforms: SocialPlatform[] = ['twitter', 'discord', 'github', 'linkedin', 'telegram']

  platforms.forEach((platform) => {
    const platformTasks = tasks.filter((t) => t.platform === platform)
    const completedTasks = platformTasks.filter((t) => t.completed)

    metrics.set(platform, {
      platform,
      tasksCompleted: completedTasks.length,
      lastActivity: completedTasks.length > 0 ? new Date() : null,
      streak: 0, // Would be calculated based on daily completion history
    })
  })

  return metrics
}
