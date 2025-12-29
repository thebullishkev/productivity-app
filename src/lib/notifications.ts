// Duolingo-style Manipulative Notification System

import type { NotificationType, MascotMood, Task, Habit } from '../types'

export interface NotificationTemplate {
  type: NotificationType
  messages: string[]
  mascotExpression: MascotMood
}

// Guilt-trip messages
const guiltMessages = [
  "I've been waiting here all day... no pressure though.",
  "{name} misses you. Your tasks miss you more.",
  "Your streak is crying. Literally.",
  "Remember when you said you'd be productive? I remember.",
  "Fine. I'll just sit here. Alone. With your undone tasks.",
  "Your future self just texted. They're disappointed.",
  "I made you a to-do list. You haven't even looked at it.",
  "The tasks aren't going to complete themselves... trust me, I asked.",
  "Day {days} of waiting for you to open the app...",
  "Your goals called. They want to know if you're still together.",
]

// Passive-aggressive messages
const passiveAggressiveMessages = [
  "Oh, you have time for {app} but not for your goals? Cool cool cool.",
  "No worries! Your dreams can wait. They've been waiting for years anyway.",
  "I see you're busy. I'll just tell your tasks you said hi.",
  "Must be nice having zero responsibilities.",
  "That's okay, other users completed 3 tasks already today.",
  "I'm not mad. I'm just... disappointed.",
  "Sure, ignore me. Everyone else does too.",
  "Your task has been pending for {hours} hours. It's developing abandonment issues.",
  "Oh you're back? I wasn't crying, you were crying.",
  "Remember me? Your productivity app? No? That's fine.",
]

// Urgent/FOMO messages
const urgentMessages = [
  "Your task window closes in {minutes} minutes. Just saying.",
  "I'm STRESSED about your calendar right now.",
  "Everyone else already finished this. Literally everyone.",
  "This deadline is approaching faster than your motivation.",
  "URGENT: Your procrastination has reached critical levels.",
  "Red alert! Task overdue! This is not a drill!",
  "Your streak is about to DIE. Do something!",
  "The clock is ticking... tick tock... TICK TOCK.",
  "{count} people in your network just completed their goals...",
  "Last chance before I start sending sad owl pictures.",
]

// Celebration messages
const celebrationMessages = [
  "YESSS! You actually did it! I'm literally crying!",
  "WHO IS THIS PRODUCTIVITY LEGEND?!",
  "Your streak is now longer than my attention span!",
  "I just told all the other mascots about you. You're famous now.",
  "Achievement unlocked: Actually Did The Thing!",
  "You're on FIRE! (Not literally, please don't panic)",
  "This calls for a celebration! 🎉🎉🎉",
  "I knew you had it in you! (I had doubts, but still!)",
  "Productivity level: OVER 9000!",
  "You just made my whole day. My whole WEEK even!",
]

// FOMO messages for social features
const fomoMessages = [
  "Your friend {friend} just completed their workout. Race them?",
  "{count} people in your network are being productive right now.",
  "{friend} just hit a 30-day streak. Where's yours?",
  "Everyone's crushing their goals today. Join them?",
  "The productivity train is leaving. Are you on board?",
  "Your competitor just finished {task}. Just saying...",
  "{friend} shared their progress. Show them what you've got!",
  "Trending now: Being productive. You should try it.",
]

export const notificationTemplates: Record<NotificationType, NotificationTemplate> = {
  guilt: {
    type: 'guilt',
    messages: guiltMessages,
    mascotExpression: 'sad',
  },
  passive_aggressive: {
    type: 'passive_aggressive',
    messages: passiveAggressiveMessages,
    mascotExpression: 'disappointed',
  },
  urgent: {
    type: 'urgent',
    messages: urgentMessages,
    mascotExpression: 'scheming',
  },
  celebration: {
    type: 'celebration',
    messages: celebrationMessages,
    mascotExpression: 'celebrating',
  },
  fomo: {
    type: 'fomo',
    messages: fomoMessages,
    mascotExpression: 'scheming',
  },
}

// Get random message from template
export function getRandomMessage(type: NotificationType, replacements?: Record<string, string>): string {
  const template = notificationTemplates[type]
  let message = template.messages[Math.floor(Math.random() * template.messages.length)]

  // Replace placeholders
  if (replacements) {
    Object.entries(replacements).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value)
    })
  }

  return message
}

// Generate notification based on context
export function generateContextualNotification(context: {
  overdueTaskCount: number
  pendingTaskCount: number
  currentStreak: number
  hoursSinceLastActivity: number
  completedToday: number
}): { type: NotificationType; message: string; mascotExpression: MascotMood } | null {
  const { overdueTaskCount, pendingTaskCount, currentStreak, hoursSinceLastActivity, completedToday } = context

  // Celebration for completing tasks
  if (completedToday >= 5) {
    return {
      type: 'celebration',
      message: getRandomMessage('celebration'),
      mascotExpression: 'celebrating',
    }
  }

  // Urgent for overdue tasks
  if (overdueTaskCount > 0) {
    return {
      type: 'urgent',
      message: getRandomMessage('urgent', { count: overdueTaskCount.toString() }),
      mascotExpression: 'scheming',
    }
  }

  // Guilt trip for long absence
  if (hoursSinceLastActivity > 24) {
    return {
      type: 'guilt',
      message: getRandomMessage('guilt', { days: Math.floor(hoursSinceLastActivity / 24).toString() }),
      mascotExpression: 'sad',
    }
  }

  // Passive aggressive for medium absence
  if (hoursSinceLastActivity > 4 && pendingTaskCount > 0) {
    return {
      type: 'passive_aggressive',
      message: getRandomMessage('passive_aggressive', { hours: Math.floor(hoursSinceLastActivity).toString() }),
      mascotExpression: 'disappointed',
    }
  }

  // Streak at risk
  if (currentStreak > 0 && hoursSinceLastActivity > 20) {
    return {
      type: 'urgent',
      message: "Your streak is about to DIE. Do something!",
      mascotExpression: 'scheming',
    }
  }

  return null
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Send browser notification
export function sendBrowserNotification(
  title: string,
  body: string,
  options?: {
    icon?: string
    tag?: string
    data?: Record<string, unknown>
    onClick?: () => void
  }
): void {
  if (Notification.permission !== 'granted') return

  const notification = new Notification(title, {
    body,
    icon: options?.icon || '/mascot.png',
    tag: options?.tag,
    data: options?.data,
    requireInteraction: true,
  })

  if (options?.onClick) {
    notification.onclick = () => {
      window.focus()
      options.onClick?.()
      notification.close()
    }
  }

  // Auto close after 10 seconds
  setTimeout(() => notification.close(), 10000)
}

// Schedule notification
export function scheduleNotification(
  title: string,
  body: string,
  delayMs: number,
  options?: Parameters<typeof sendBrowserNotification>[2]
): NodeJS.Timeout {
  return setTimeout(() => {
    sendBrowserNotification(title, body, options)
  }, delayMs)
}
