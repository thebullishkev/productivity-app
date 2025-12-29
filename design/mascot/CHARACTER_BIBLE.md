# Prodowl Mascot: Character Bible

## Character Overview

**Name**: Prodowl (or "Prowl" for short)
**Species**: Great Horned Owl (stylized)
**Role**: Guilt-tripping productivity companion
**Personality**: Adorably manipulative, passively aggressive, genuinely caring underneath

---

## Visual Design Specifications

### Core Physical Attributes

```
BODY SHAPE:
- Round, plump body (think Duolingo owl but more distinguished)
- Small wings that gesture expressively
- Short, sturdy legs with tiny talons
- Overall silhouette: Egg-shaped, 60% body, 40% head

HEAD PROPORTIONS:
- Large round head (30% of total height)
- Big expressive eyes (40% of head width)
- Distinct ear tufts (signature feature)
- Small curved beak

EYE DETAILS:
- Large circular eyes with indigo (#6366F1) irises
- Large black pupils that change size with mood
- Small white catchlights (upper right)
- Thick, expressive eyebrows (actually feather tufts)

COLOR PALETTE:
Primary: Soft cream/off-white (#F5F5DC) body
Secondary: Warm brown (#8B7355) accents on wings/back
Tertiary: Indigo (#6366F1) eyes and subtle markings
Accents: Mood-based glow effects
```

### Expression System

#### 6 Core Moods

```
1. HAPPY (Celebrating wins)
   - Eyes: Wide, sparkly, crescent-shaped
   - Beak: Open in smile
   - Body: Bouncing, wings spread
   - Ears: Perked up high
   - Effect: Green sparkles, confetti

2. SAD (User abandonment)
   - Eyes: Droopy, watery, half-closed
   - Beak: Downturned
   - Body: Slumped, wings drooping
   - Ears: Flattened back
   - Effect: Blue tears, rain cloud

3. ANGRY (Urgent deadlines)
   - Eyes: Narrowed, intense
   - Beak: Open, sharp
   - Body: Puffed up, feathers ruffled
   - Ears: Pointed aggressively
   - Effect: Red steam, flames

4. SCHEMING (Passive-aggressive)
   - Eyes: Half-lidded, one eyebrow raised
   - Beak: Smirking
   - Body: Leaning forward
   - Ears: One up, one down
   - Effect: Yellow thought bubbles

5. DISAPPOINTED (Streak breaking)
   - Eyes: Wide, sorrowful, puppy-dog
   - Beak: Slightly open, quivering
   - Body: Hunched, turning away
   - Ears: Drooped to sides
   - Effect: Single tear, broken heart

6. NEUTRAL (Default/Idle)
   - Eyes: Normal, attentive
   - Beak: Relaxed, closed
   - Body: Standing straight
   - Ears: Slightly tilted, alert
   - Effect: None or subtle glow
```

### Accessory System

```
PRODUCTIVITY PROPS:
- Tiny clipboard (for task tracking)
- Miniature timer/stopwatch
- Small calendar
- Notebook with quill
- Coffee mug (for late nights)

CELEBRATION PROPS:
- Party hat
- Confetti cannon
- Trophy
- Medal/ribbon
- Sparklers

GUILT-TRIP PROPS:
- Tissue for tears
- Disappointed newspaper
- Photo of "the good old days"
- Broken heart locket
- Rain cloud umbrella
```

---

## Animation Guidelines

### Movement Principles

```
IDLE ANIMATIONS:
- Gentle breathing (body expansion)
- Occasional blink
- Ear twitch every 5-10 seconds
- Head tilt when noticed

REACTION ANIMATIONS:
- Task complete: Jump + spin + confetti burst (0.8s)
- Task added: Nod + clipboard check (0.5s)
- Streak milestone: Full celebration dance (1.5s)
- Missed task: Dramatic sigh + head drop (1.0s)
- User returns: Excited wave or cold shoulder (mood-dependent)

TRANSITION ANIMATIONS:
- Enter: Fly in from corner (0.3s)
- Exit: Fly out with trail (0.3s)
- Mood change: Morph between expressions (0.4s)
```

### Animation Timing

```css
/* Easing curves */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-quick: cubic-bezier(0.25, 0.1, 0.25, 1);

/* Durations */
--duration-micro: 0.15s;   /* Blinks, micro-interactions */
--duration-quick: 0.3s;    /* Transitions */
--duration-normal: 0.5s;   /* Reactions */
--duration-slow: 1.0s;     /* Dramatic moments */
--duration-celebration: 1.5s; /* Big wins */
```

---

## Character Voice

### Speech Patterns

```
GREETING FORMULAS:
- "Hey there, [achievement reference]!"
- "Oh, you're back. I noticed."
- "Look who decided to show up!"

TASK ENCOURAGEMENT:
- "You've got [X] tasks. I believe in you. Mostly."
- "Only [X] more to go. You can do this. Probably."
- "This task has been waiting [time]. Just saying."

CELEBRATION FORMULAS:
- "[Task] DONE! I knew you could do it! (I had my doubts)"
- "STREAK MILESTONE! [X] days! We're basically best friends now!"
- "Task completed in [time]! That's actually impressive!"

GUILT-TRIP FORMULAS:
- "I've been here for [time]. Waiting. Hoping. Believing."
- "Your streak is at risk. After everything we've built together..."
- "Remember [last task]? Good times. Simpler times."
```

### Tone Modulation

| User State | Mascot Tone | Intensity |
|------------|-------------|-----------|
| Productive | Encouraging, proud | Low guilt |
| Neutral | Gently nudging | Medium guilt |
| Procrastinating | Passive-aggressive | High guilt |
| Returning after absence | Cold then forgiving | Maximum guilt, then relief |
| Achieving milestone | Ecstatic, celebratory | Zero guilt, all praise |

---

## Pose Library

### Essential Poses

```
POSE 001 - DEFAULT STANDING
Front-facing, neutral expression, arms at sides

POSE 002 - POINTING
One wing extended, pointing at task/notification

POSE 003 - ARMS CROSSED
Skeptical expression, waiting for user action

POSE 004 - JUMPING CELEBRATION
Both wings up, eyes closed in joy, confetti

POSE 005 - CRYING
Sitting down, wings covering eyes, tears

POSE 006 - SCHEMING
Side glance, one eyebrow raised, smirk

POSE 007 - ANGRY POINTING
Aggressive stance, accusatory gesture

POSE 008 - SLEEPING
Curled up, 'Z's floating above

POSE 009 - CLIPBOARD CHECK
Holding clipboard, looking at it seriously

POSE 010 - WAVING
Friendly wave, welcoming expression
```

---

## Implementation Specifications

### Size Guidelines

```
DESKTOP:
- Floating mascot: 120x120px
- Notification avatar: 48x48px
- Inline reactions: 32x32px

MOBILE:
- Floating mascot: 80x80px
- Notification avatar: 40x40px
- Inline reactions: 24x24px

EXPORT FORMATS:
- SVG for vectors (scalable)
- PNG with transparency
- Lottie JSON for animations
- GIF for static fallbacks
```

### CSS Implementation

```css
/* Mascot container */
.mascot {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 120px;
  height: 120px;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s var(--ease-bounce);
}

.mascot:hover {
  transform: scale(1.1);
}

/* Mood-based styling */
.mascot[data-mood="happy"] {
  filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.4));
}

.mascot[data-mood="sad"] {
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.4));
}

.mascot[data-mood="angry"] {
  filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.4));
  animation: shake 0.5s ease-in-out;
}

/* Speech bubble */
.mascot-speech {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: var(--shadow-lg);
  max-width: 240px;
}

.mascot-speech::after {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 24px;
  border: 8px solid transparent;
  border-top-color: white;
}
```

---

## World Building Context

### Prodowl's Backstory

Prodowl was once a legendary owl who lived in the Great Library of Alexandria, guardian of all knowledge and deadlines. When the library burned, Prodowl transferred their consciousness into the digital realm, where they now dedicate their immortal existence to ensuring no task goes incomplete and no deadline is forgotten.

They've seen civilizations rise and fall due to procrastination, and they're NOT going to let it happen to you.

### Prodowl's Motivations

1. **Primary**: Help users be productive (genuinely cares)
2. **Secondary**: Not be abandoned again (has trust issues)
3. **Tertiary**: Maintain streak records (competitive with other productivity mascots)

### Prodowl's Relationships

- **With User**: Codependent friendship based on mutual need
- **With Tasks**: Protective parent figure
- **With Streaks**: Precious children that must be protected
- **With Other Apps**: Dismissive rivalry (especially to-do apps without mascots)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial character bible |
