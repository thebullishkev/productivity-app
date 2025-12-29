# Prodowl Brand Guide

## Brand Overview

**Prodowl** is a productivity app that uses Duolingo-style guilt-tripping to manipulate users into completing their tasks. Our mascot owl is simultaneously adorable and passive-aggressive, making users feel just bad enough to act, but not bad enough to uninstall.

### Brand Essence
- **Mission**: Make productivity feel like a game you can't lose (but definitely can disappoint)
- **Personality**: Playfully manipulative, cute but judgmental, supportive yet guilt-inducing
- **Voice**: Friendly with an edge of passive aggression

---

## Visual Identity System

### Logo System

#### Primary Mark
The Prodowl logo combines a stylized owl face with productivity symbolism.

```
Primary Lockup: [Owl Icon] + "Prodowl" wordmark
Stacked Lockup: [Owl Icon above] + "Prodowl" below
Icon Only: Owl face for favicons, app icons (32px and below)
```

#### Logo Specifications
- **Minimum Size**: 40px width (digital), 12mm (print)
- **Clear Space**: 1x the height of the owl icon on all sides
- **Do Not**: Stretch, rotate, change colors outside palette, add effects

### Color System

#### Primary Palette
```css
/* Core Brand Colors */
--primary: #6366F1;           /* Indigo - Main brand color */
--primary-hover: #4F46E5;     /* Darker indigo for interactions */
--primary-light: #E0E7FF;     /* Light indigo for backgrounds */

/* Accent Colors */
--accent-success: #10B981;    /* Emerald - Celebrations, completions */
--accent-warning: #F59E0B;    /* Amber - Gentle reminders */
--accent-danger: #EF4444;     /* Red - Urgent guilt-trips */
--accent-info: #3B82F6;       /* Blue - Information */
```

#### Mascot Expression Colors
```css
/* Mood-Based Accents */
--mood-happy: #10B981;        /* Green glow when celebrating */
--mood-sad: #6366F1;          /* Purple tint when disappointed */
--mood-angry: #EF4444;        /* Red flush when upset */
--mood-scheming: #F59E0B;     /* Yellow gleam when plotting */
--mood-celebrating: #EC4899;  /* Pink sparkles for victories */
```

#### Neutral Palette
```css
/* Backgrounds & Surfaces */
--background: #FAFAFA;        /* App background */
--surface: #FFFFFF;           /* Cards, modals */
--border: #E5E7EB;            /* Subtle borders */

/* Text Colors */
--text: #1F2937;              /* Primary text */
--text-muted: #6B7280;        /* Secondary text */
--text-light: #9CA3AF;        /* Tertiary text */
```

### Typography System

#### Font Stack
```css
/* Primary Font: Inter */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Hierarchy */
--text-xs: 0.75rem;    /* 12px - Labels, badges */
--text-sm: 0.875rem;   /* 14px - Body small, captions */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large body */
--text-xl: 1.25rem;    /* 20px - Section headers */
--text-2xl: 1.5rem;    /* 24px - Page headers */
--text-3xl: 1.875rem;  /* 30px - Hero text */
--text-4xl: 2.25rem;   /* 36px - Display */
```

#### Font Weights
```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Emphasis, buttons */
--font-semibold: 600;  /* Subheadings */
--font-bold: 700;      /* Headlines, mascot speech */
```

### Spacing System

```css
/* Base unit: 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius System

```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cards */
--radius-xl: 1rem;       /* 16px - Large cards, modals */
--radius-2xl: 1.5rem;    /* 24px - Hero elements */
--radius-full: 9999px;   /* Circular elements */
```

### Shadow System

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Colored shadows for mascot expressions */
--shadow-glow-success: 0 0 20px rgba(16, 185, 129, 0.3);
--shadow-glow-danger: 0 0 20px rgba(239, 68, 68, 0.3);
--shadow-glow-primary: 0 0 20px rgba(99, 102, 241, 0.3);
```

---

## Brand Voice & Tone

### Voice Characteristics
1. **Playfully Passive-Aggressive**: Never mean, but pointedly disappointed
2. **Supportive with an Edge**: Celebrates wins enthusiastically, mourns losses dramatically
3. **Personal & Direct**: Uses "you" and "your", creates intimacy
4. **Gamified Language**: Treats productivity like a game with stakes

### Tone by Context

#### Guilt-Trip Messages
```
Light: "Hey, just checking in... those tasks won't complete themselves."
Medium: "I've been sitting here for 3 hours. Waiting. Just... waiting."
Heavy: "Remember when you said you'd be productive today? The tasks remember."
```

#### Celebration Messages
```
Small Win: "Task done! See? You CAN do things!"
Streak: "7 days in a row! I'm not crying, you're crying!"
Big Achievement: "LEGENDARY! I knew you had it in you! (I had doubts, but still!)"
```

#### Urgent/FOMO Messages
```
Deadline: "This task is due in 1 hour. ONE HOUR. Just saying."
Abandoned: "Your streak is about to break. After all we've been through..."
Peer Pressure: "5 of your friends completed tasks today. Just 5. No pressure."
```

### Microcopy Guidelines

| Context | Style | Example |
|---------|-------|---------|
| Button Labels | Action-oriented | "Mark Complete", "Start Timer", "Add Task" |
| Empty States | Encouraging + slight guilt | "No tasks yet. A fresh start... or procrastination?" |
| Error Messages | Sympathetic | "Something went wrong. Even owls have off days." |
| Success Messages | Celebratory | "Done! You absolute legend!" |
| Loading States | Playful | "Preparing your disappointment... er, dashboard" |

---

## UI Design Principles

### 1. Minimalist Foundation
- White space is sacred
- One primary action per screen
- Reduce cognitive load

### 2. Delightful Interactions
- Micro-animations on task completion
- Mascot reactions to user actions
- Satisfying feedback on all interactions

### 3. Emotional Design
- Colors shift based on productivity state
- Mascot mood reflects user behavior
- Celebrate wins, dramatize losses

### 4. Accessible First
- WCAG 2.1 AA compliance minimum
- Color contrast ratios > 4.5:1
- Focus states on all interactive elements
- Screen reader friendly

### 5. Mobile-First Responsive
- Touch targets minimum 44x44px
- Thumb-friendly navigation
- Swipe gestures for common actions

---

## Application Guidelines

### App Icon
- Use simplified owl face
- Primary indigo background (#6366F1)
- White owl details
- Rounded corners per platform spec

### Favicon
- 32x32: Full owl icon
- 16x16: Owl eyes only (simplified)
- SVG for modern browsers

### Social Media
- Profile: Owl icon on brand color
- Cover: Gradient background with tagline
- Posts: Clean white backgrounds, owl accent

### Email
- Header: Logo left-aligned
- Footer: Owl icon + social links
- Body: Clean typography, plenty of white space

---

## Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#E0E7FF',
        },
        accent: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
        surface: '#FFFFFF',
        background: '#FAFAFA',
        text: {
          DEFAULT: '#1F2937',
          muted: '#6B7280',
          light: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial brand system |
