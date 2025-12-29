# Midjourney Prompt Templates for Prodowl

## Character Reference Generation

### Hero Character Sheet

```
/imagine Prodowl character sheet, cute stylized owl mascot, round plump body, large expressive indigo eyes, cream-colored feathers with warm brown accents, distinct ear tufts, small curved beak, Pixar-style 3D render, multiple angles: front view, side view, back view, 3/4 view, white background, character design reference sheet, professional concept art --ar 16:9 --s 250 --v 6.1
```

### Expression Sheet

```
/imagine Prodowl owl mascot expression sheet, 6 emotions: happy celebrating, sad crying, angry frustrated, scheming mischievous, disappointed sorrowful, neutral calm, cute stylized owl with indigo eyes and cream feathers, Pixar 3D animation style, white background, character turnaround, professional concept art --ar 16:9 --s 250 --v 6.1
```

---

## Mood-Specific Prompts

### Happy/Celebrating

```
/imagine Prodowl cute owl mascot celebrating, jumping with joy, wings spread wide, eyes sparkling with happiness, confetti and sparkles around, indigo (#6366F1) and emerald (#10B981) color accents, Pixar 3D style, soft studio lighting, white gradient background --ar 1:1 --s 300 --v 6.1
```

### Sad/Disappointed

```
/imagine Prodowl cute owl mascot looking sad and disappointed, large teary indigo eyes, drooping ear tufts, single tear rolling down cheek, hunched posture, soft blue lighting, melancholy atmosphere, Pixar 3D style, cream colored owl with brown accents --ar 1:1 --s 300 --v 6.1
```

### Angry/Urgent

```
/imagine Prodowl cute owl mascot looking angry and frustrated, narrowed intense indigo eyes, ruffled feathers, puffed up chest, small steam clouds above head, red (#EF4444) ambient glow, Pixar 3D style, dramatic lighting, cream colored owl --ar 1:1 --s 300 --v 6.1
```

### Scheming/Passive-Aggressive

```
/imagine Prodowl cute owl mascot with scheming expression, one eyebrow raised, half-lidded indigo eyes, sly smirk, leaning forward conspiratorially, yellow (#F59E0B) ambient glow, Pixar 3D style, cream colored owl with brown accents, soft shadows --ar 1:1 --s 300 --v 6.1
```

### Neutral/Default

```
/imagine Prodowl cute owl mascot in neutral standing pose, attentive expression, large round indigo eyes with catchlights, perked ear tufts, relaxed wings at sides, cream colored feathers with warm brown accents, Pixar 3D style, clean white background, soft studio lighting --ar 1:1 --s 250 --v 6.1
```

---

## Action Poses

### Pointing at Task

```
/imagine Prodowl cute owl mascot pointing with one wing, determined helpful expression, standing on small podium, pointing at floating task card UI element, indigo eyes focused, Pixar 3D style, productivity app mascot, soft gradient background --ar 16:9 --s 250 --v 6.1
```

### Holding Clipboard

```
/imagine Prodowl cute owl mascot holding tiny clipboard, wearing small reading glasses, studious expression, checking off tasks, pencil behind ear tuft, cream owl with brown accents, Pixar 3D style, productivity mascot, soft lighting --ar 1:1 --s 300 --v 6.1
```

### Celebration Dance

```
/imagine Prodowl cute owl mascot doing celebration dance, party hat on head, wings waving, happy closed eyes, colorful confetti explosion, trophy floating nearby, emerald and gold sparkles, Pixar 3D style, white background, energetic pose --ar 1:1 --s 350 --v 6.1
```

### Arms Crossed (Waiting)

```
/imagine Prodowl cute owl mascot with wings crossed, tapping foot impatiently, one eyebrow raised, clock ticking behind, slightly annoyed but cute expression, cream owl with indigo eyes, Pixar 3D style, pastel background --ar 1:1 --s 250 --v 6.1
```

---

## UI Integration Scenes

### Notification Pop-up

```
/imagine Prodowl owl mascot peeking from notification bubble, cute concerned expression, speech bubble with exclamation mark, mobile app UI mockup, indigo (#6366F1) accent colors, clean minimalist design, Pixar 3D style mascot, white background --ar 9:16 --s 200 --v 6.1
```

### Onboarding Welcome

```
/imagine Prodowl owl mascot waving hello, welcoming gesture, friendly smile, standing next to "Welcome!" text, confetti particles, warm inviting scene, app onboarding illustration, Pixar 3D style, soft pastel gradient background --ar 16:9 --s 250 --v 6.1
```

### Empty State

```
/imagine Prodowl owl mascot sitting on empty task list, looking bored and lonely, chin resting on wing, cobwebs on empty checkboxes, melancholy but cute, app empty state illustration, Pixar 3D style, muted colors --ar 16:9 --s 250 --v 6.1
```

### Achievement Unlock

```
/imagine Prodowl owl mascot bursting through golden achievement badge, triumphant pose, wings spread wide, sparkles and stars, "Achievement Unlocked" banner, celebration effects, Pixar 3D style, dynamic composition --ar 1:1 --s 350 --v 6.1
```

---

## Marketing Assets

### App Store Icon

```
/imagine Prodowl owl mascot face close-up, large friendly indigo eyes, slight smile, cream colored feathers, indigo (#6366F1) gradient background, app icon style, centered composition, Pixar 3D render, professional polish --ar 1:1 --s 200 --v 6.1 --no text
```

### Social Media Banner

```
/imagine Prodowl owl mascot with productivity tools floating around, clipboard, timer, calendar, checklist, motivational pose, "Stay Productive" theme, indigo and emerald accent colors, Pixar 3D style, social media banner composition --ar 16:9 --s 250 --v 6.1
```

### Hero Image

```
/imagine Prodowl owl mascot as productivity hero, cape flowing, standing triumphantly on completed task mountain, sunrise behind, inspirational atmosphere, Pixar 3D style, epic but cute composition, warm lighting --ar 16:9 --s 350 --v 6.1
```

---

## Consistency Parameters

### Style Lock (Use on ALL prompts)

```
--s 250 --v 6.1 --style raw
```

### Character Description Prefix (Use on ALL character prompts)

```
Prodowl: A cute stylized owl mascot with a round plump body, large expressive indigo (#6366F1) eyes with white catchlights, cream-colored (#F5F5DC) feathers with warm brown (#8B7355) accents on wings, distinct pointed ear tufts, small curved beak, Pixar-Disney 3D animation style
```

### Quality Suffix

```
--q 2 --no watermark --no text --no signature
```

---

## Advanced Techniques

### Seed Locking for Consistency

After generating a good base character:
1. Note the seed number from /info
2. Use `--seed [number]` on subsequent generations
3. Adjust prompt while keeping seed for variations

### Weight Control

```
Prodowl character::4 background elements::1 lighting effects::2
```

### Multi-Prompt for Complex Scenes

```
/imagine Prodowl owl mascot:: celebrating with confetti:: standing on podium:: Pixar 3D style --ar 1:1 --s 250 --v 6.1
```

---

## Batch Generation Workflow

1. **Generate base character** (front view, clean background)
2. **Lock seed** from best result
3. **Generate expression variations** with same seed
4. **Generate pose variations** with same seed
5. **Generate scene integrations** with same seed
6. **Upscale final selections** for production use

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2024-01 | Initial prompt library |
