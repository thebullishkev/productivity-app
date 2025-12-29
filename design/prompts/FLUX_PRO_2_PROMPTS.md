# Flux Pro 2 Prompt Templates for Prodowl

## Why Flux Pro 2?

Flux Pro 2 excels at:
- **Prompt Adherence**: Generates exactly what you describe
- **Text in Images**: Can render text accurately (useful for UI mockups)
- **Consistent Details**: Better at maintaining specific attributes
- **Photorealistic Options**: When you need realistic renders

Use Flux when you need **precision over artistic interpretation**.

---

## Character Reference Prompts

### Hero Character (Front View)

```
A cute stylized 3D owl mascot character named Prodowl, front facing view, round plump egg-shaped body with cream-colored feathers (hex #F5F5DC), warm brown accents (hex #8B7355) on wing tips and back, large expressive circular eyes with indigo irises (hex #6366F1), small white catchlight in upper right of each eye, distinct pointed ear tufts standing upright, small curved orange-yellow beak, short sturdy legs with tiny talons, arms/wings relaxed at sides, neutral friendly expression, Pixar Disney 3D animation style, soft studio lighting, clean white background, character design, high detail
```

### Expression Set (6 Moods)

```
A reference sheet showing 6 expressions of Prodowl the cute 3D owl mascot:
Row 1: (1) HAPPY - wide sparkly eyes, open smiling beak, wings spread in joy (2) SAD - droopy half-closed eyes with tears, downturned beak, slumped posture (3) ANGRY - narrowed intense eyes, open sharp beak, puffed feathers
Row 2: (4) SCHEMING - half-lidded eyes, raised eyebrow, sly smirk, leaning forward (5) DISAPPOINTED - wide sorrowful puppy-dog eyes, quivering beak, turning away (6) NEUTRAL - normal attentive eyes, relaxed closed beak, standing straight
Cream colored owl with indigo eyes, Pixar 3D style, white background, labeled expressions, character sheet layout
```

### Character Turnaround

```
Character turnaround sheet of Prodowl the cute 3D owl mascot, 4 angles in a row: front view, 3/4 view, side view, back view. Round plump body, cream colored feathers with brown wing accents, large indigo eyes, pointed ear tufts, small orange beak. Pixar Disney 3D style, consistent lighting across all views, white background, professional character reference, game art style
```

---

## Mood-Specific Generation

### Happy Celebration

```
Prodowl the cute 3D owl mascot celebrating a victory, jumping with joy, both wings raised high, eyes closed in happiness with curved smile lines, small party hat on head, colorful confetti particles floating around, emerald green (hex #10B981) sparkle effects, cream colored owl with indigo eye color visible through squint, Pixar 3D animation style, warm golden lighting, soft gradient background transitioning from white to pale yellow
```

### Sad Disappointment

```
Prodowl the cute 3D owl mascot looking sad and disappointed, sitting down with hunched posture, large watery indigo eyes looking up pleadingly, single tear rolling down cheek, ear tufts drooped flat against head, wings wrapped around body for comfort, soft blue ambient lighting, melancholy atmosphere, cream colored owl with brown accents, Pixar 3D style, pale blue-gray gradient background
```

### Angry Urgency

```
Prodowl the cute 3D owl mascot looking angry and urgent, standing with aggressive stance, feathers visibly ruffled and puffed up, narrowed indigo eyes with furrowed brow feathers, beak open in frustrated exclamation, one wing pointing accusingly, small red steam clouds rising from head, red ambient glow (hex #EF4444), cream colored owl, Pixar 3D style, dramatic lighting with red rim light
```

### Scheming Passive-Aggressive

```
Prodowl the cute 3D owl mascot with scheming passive-aggressive expression, half-lidded indigo eyes, one eyebrow feather raised higher than other, subtle sly smirk on beak, head tilted slightly, wings behind back in plotting pose, yellow-orange ambient glow (hex #F59E0B), cream colored owl with brown accents, Pixar 3D style, soft dramatic lighting, thought bubble with ellipsis floating nearby
```

---

## UI Integration Mockups

### App Notification with Mascot

```
Mobile app notification popup UI mockup featuring Prodowl owl mascot, notification card with rounded corners, white background, mascot peeking from left side of card, speech bubble containing text "You have 3 tasks waiting!", indigo accent color (hex #6366F1), modern minimal iOS style design, clean typography, soft shadow, 9:16 aspect ratio vertical mobile screen
```

### Dashboard Widget

```
Productivity app dashboard widget featuring Prodowl owl mascot, rectangular card UI element, mascot standing on left side waving, progress ring chart on right showing 75% completion, text "4 of 6 tasks done" below chart, cream colored owl mascot, indigo and emerald accent colors, modern minimal UI design, white card with subtle shadow, Figma style mockup
```

### Empty State Illustration

```
App empty state illustration featuring Prodowl owl mascot sitting alone on empty checklist, bored expression, chin resting on wing, cobwebs on empty checkbox items, text below saying "No tasks yet", melancholy but cute atmosphere, cream colored owl with indigo eyes, Pixar 3D style mascot, muted pastel colors, centered composition, modern app illustration style
```

### Achievement Modal

```
Achievement unlock modal UI featuring Prodowl owl mascot bursting through golden badge, triumphant pose with wings spread, sparkle and star effects, modal title "Achievement Unlocked!", subtitle "Complete 10 tasks in one day", indigo primary button saying "Awesome!", confetti particles, modern app UI design, white modal with rounded corners, celebration theme
```

---

## Marketing Assets

### App Store Screenshot

```
App store screenshot mockup showing Prodowl productivity app interface on iPhone, task list view with completed and pending tasks, mascot character in bottom right corner giving thumbs up, clean white UI with indigo accents, modern iOS design language, status bar showing time, professional app store presentation, 9:19.5 aspect ratio
```

### Social Media Post

```
Social media post graphic for Prodowl productivity app, square format, mascot character in center with clipboard, floating productivity icons around (clock, checklist, calendar), motivational text "Your tasks are waiting!" in modern sans-serif font, indigo to purple gradient background, clean modern design, Instagram post style, no watermarks
```

### Website Hero

```
Website hero section illustration featuring Prodowl owl mascot as productivity superhero, small cape flowing behind, standing triumphantly on mountain of completed task checkmarks, sunrise with golden rays behind, inspirational atmosphere, cream colored owl with indigo eyes, Pixar 3D style, wide cinematic composition 21:9 aspect ratio, marketing illustration style
```

---

## Flux-Specific Techniques

### Prompt Structure for Flux

```
[Subject] + [Specific details] + [Style] + [Lighting] + [Background] + [Technical specs]
```

### Color Specification

Flux responds well to hex codes:
```
indigo eyes (hex #6366F1)
cream feathers (hex #F5F5DC)
brown accents (hex #8B7355)
```

### Text Rendering

Flux can render text - use for mockups:
```
...speech bubble containing text "Your tasks miss you!"...
...button labeled "Start Now"...
```

### Aspect Ratios

```
1:1  - Character portraits, social posts
9:16 - Mobile mockups, Stories
16:9 - Desktop mockups, banners
4:5  - Instagram feed
21:9 - Website hero sections
```

### Negative Prompting

Add at end for cleaner results:
```
--negative "blurry, low quality, watermark, signature, text artifacts, deformed, extra limbs, bad anatomy"
```

---

## Batch Generation Workflow

### Step 1: Generate Base Character

```
Prodowl cute 3D owl mascot, front view, neutral expression, cream feathers (hex #F5F5DC), indigo eyes (hex #6366F1), brown wing accents, Pixar style, white background, character reference
```

### Step 2: Generate Expressions

Use same base description + expression modifiers:
```
[Base description] + happy celebrating expression, sparkly eyes, wings raised
[Base description] + sad disappointed expression, teary eyes, drooped ears
[Base description] + angry frustrated expression, narrowed eyes, ruffled feathers
```

### Step 3: Generate Poses

```
[Base description] + pointing pose, one wing extended forward
[Base description] + arms crossed pose, skeptical expression
[Base description] + jumping celebration pose, confetti around
```

### Step 4: Generate Scenes

```
[Full character description] in [scene context], [lighting], [background]
```

---

## Quality Control Checklist

Before using generated images:

- [ ] Eye color is correct indigo (#6366F1)
- [ ] Feather colors match (cream body, brown accents)
- [ ] Ear tufts are present and distinct
- [ ] Expression matches intended mood
- [ ] No anatomical errors (extra wings, wrong proportions)
- [ ] Background is clean (no artifacts)
- [ ] Consistent with other generated images
- [ ] Appropriate resolution for use case

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2024-01 | Initial Flux Pro 2 prompt library |
