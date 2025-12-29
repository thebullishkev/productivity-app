# Flux Kontext Training Guide for Prodowl Character Consistency

## What is Flux Kontext?

Flux Kontext is a technique for achieving **character consistency** across multiple AI-generated images by using reference images to guide generation. It works by understanding the visual context of a reference image and applying that context to new generations.

---

## Training Dataset Preparation

### Required Reference Images

Generate or create these **10-15 reference images** for maximum consistency:

#### Core Character Views (5 images)
```
1. FRONT VIEW - Clean front-facing, neutral expression
2. 3/4 VIEW - Angled view showing depth
3. SIDE VIEW (LEFT) - Profile view
4. SIDE VIEW (RIGHT) - Profile view (mirrored)
5. BACK VIEW - Rear view showing wing pattern
```

#### Expression Range (6 images)
```
6. HAPPY - Wide eyes, open smile, raised wings
7. SAD - Droopy eyes, tears, hunched
8. ANGRY - Narrowed eyes, ruffled feathers
9. SCHEMING - Half-lidded, smirk, raised eyebrow
10. SURPRISED - Wide eyes, open beak, raised ear tufts
11. NEUTRAL - Default calm expression
```

#### Scale References (2-3 images)
```
12. FULL BODY - Head to toe, showing proportions
13. HEAD CLOSE-UP - Detailed face features
14. WITH SIZE REFERENCE - Next to common object for scale
```

### Image Requirements

```
FORMAT: PNG (transparent background preferred) or JPG
RESOLUTION: 1024x1024 minimum, 2048x2048 recommended
BACKGROUND: Clean white or transparent
LIGHTING: Consistent soft studio lighting
STYLE: Same visual style across all images
```

---

## Creating the Reference Set

### Step 1: Generate Hero Image

Using Flux Pro 2 or Midjourney, create your definitive character:

```
Prodowl character design, cute stylized 3D owl mascot, round plump egg-shaped body, cream colored feathers (hex #F5F5DC), warm brown accents (hex #8B7355) on wings, large circular eyes with indigo irises (hex #6366F1), white catchlights, distinct pointed ear tufts, small curved orange beak, Pixar Disney animation style, front facing, neutral expression, white background, professional character art, highly detailed

--seed 12345 [LOCK THIS SEED]
```

### Step 2: Generate Variations with Same Seed

Using the locked seed, generate all required views:

```
[SAME DESCRIPTION] + "3/4 angle view, showing left side" --seed 12345
[SAME DESCRIPTION] + "side profile view, facing left" --seed 12345
[SAME DESCRIPTION] + "back view, showing wing pattern" --seed 12345
```

### Step 3: Generate Expressions

```
[SAME DESCRIPTION] + "happy celebrating expression, eyes closed in joy, wings raised" --seed 12345
[SAME DESCRIPTION] + "sad expression, large teary eyes, drooped ear tufts" --seed 12345
[SAME DESCRIPTION] + "angry expression, narrowed eyes, ruffled feathers" --seed 12345
```

### Step 4: Quality Control

Review all images for:
- Consistent color values
- Same proportions
- Matching style
- Clean backgrounds
- No artifacts

---

## Flux Kontext Usage

### Basic Reference Prompting

Upload your reference image, then prompt:

```
[Upload: prodowl_reference.png]

Generate an image of this exact owl character doing [ACTION],
maintaining the same:
- Color palette (cream body, indigo eyes, brown accents)
- Art style (Pixar 3D)
- Proportions (round body, large eyes, ear tufts)
- Level of detail

Scene: [DESCRIPTION]
```

### Multi-Reference Prompting

For complex scenes, upload multiple references:

```
[Upload: prodowl_front.png, prodowl_happy.png]

Create an image of this owl character in a [SCENE].
Reference Image 1 shows the character design.
Reference Image 2 shows the expression style to use.

Generate: The character celebrating in a confetti-filled room
```

### Contextual Scene Generation

```
[Upload: prodowl_reference.png]

Place this character in the following context:
- Setting: Modern productivity app notification popup
- Action: Peeking out from corner of notification
- Expression: Scheming/mischievous
- Maintain exact character design from reference

Style: UI mockup, modern app design
```

---

## Advanced Techniques

### Style Transfer with Character Lock

```
[Upload: prodowl_reference.png]

Recreate this character in [NEW STYLE]:
- Keep character design EXACTLY (colors, proportions, features)
- Apply [STYLE] artistic treatment
- Examples: watercolor, cel-shaded anime, low-poly 3D, pixel art

New style: Watercolor illustration with soft edges
```

### Pose Transfer

```
[Upload: prodowl_reference.png, pose_reference.png]

Generate this character (Image 1) in this pose (Image 2).
- Character: Use exact design from Image 1
- Pose: Match body position from Image 2
- Maintain character proportions and style
```

### Scene Composition

```
[Upload: prodowl_reference.png, scene_layout.png]

Composite this character into this scene.
- Place character at [POSITION] in scene
- Scale character appropriately to scene
- Match lighting and shadows to scene
- Maintain character style
```

---

## Prompt Templates for Kontext

### UI Integration Template

```
[Reference: prodowl_base.png]

Generate this owl character in a mobile app UI context:
- Character position: [top-right / bottom-left / center]
- Character action: [waving / pointing / reacting]
- UI element type: [notification / modal / widget]
- Text to display: "[MESSAGE]"
- Color scheme: indigo (#6366F1), white, gray

Style: Modern iOS app design, clean minimal
```

### Marketing Asset Template

```
[Reference: prodowl_base.png]

Create a marketing graphic featuring this character:
- Format: [social post / banner / hero image]
- Theme: [productivity / celebration / motivation]
- Text (if any): "[HEADLINE]"
- Background: [gradient / solid / scene]
- Mood: [energetic / calm / urgent]

Style: Professional app marketing, polished
```

### Animation Frame Template

```
[Reference: prodowl_base.png]

Generate animation keyframe:
- Frame position: [start / middle / end] of [action]
- Action: [jumping / waving / transforming]
- Preserve exact character design
- Clear pose readable as silhouette

Style: Match reference, animation-ready
```

---

## Character Consistency Checklist

### Before Each Generation

- [ ] Reference image uploaded
- [ ] Character description matches reference
- [ ] Required features specified (colors, proportions)
- [ ] Style locked to reference

### After Each Generation

- [ ] Eye color correct (indigo #6366F1)
- [ ] Feather color correct (cream #F5F5DC)
- [ ] Brown accents present on wings
- [ ] Ear tufts distinct and present
- [ ] Beak shape consistent
- [ ] Body proportions match
- [ ] Art style matches reference
- [ ] No extra limbs or features
- [ ] Expression appropriate to context

---

## Building a Prompt Library

### Create Reusable Components

**Character Lock Prefix:**
```
This character: Prodowl, a cute stylized 3D owl mascot with round plump body, cream colored feathers (#F5F5DC), indigo eyes (#6366F1), brown wing accents (#8B7355), pointed ear tufts, small orange beak, Pixar-Disney style.
```

**Style Lock:**
```
Style: Pixar Disney 3D animation, soft studio lighting, high quality render, professional character art.
```

**Quality Suffix:**
```
High detail, clean render, no artifacts, consistent with reference image.
```

### Combining Components

```
[CHARACTER LOCK PREFIX]
[SCENE DESCRIPTION]
[STYLE LOCK]
[QUALITY SUFFIX]
```

---

## Troubleshooting

### Character Drift

**Problem**: Generated character looks different from reference
**Solution**:
- Use stronger character description
- Include hex color codes
- Reference multiple images
- Specify "exactly like reference image"

### Style Inconsistency

**Problem**: Art style varies between generations
**Solution**:
- Lock style explicitly: "Pixar 3D animation style"
- Use consistent lighting description
- Reference same style images

### Color Inaccuracy

**Problem**: Colors don't match brand palette
**Solution**:
- Include hex codes in prompt
- Reference multiple images with correct colors
- Use color picker to verify outputs

### Proportion Issues

**Problem**: Character proportions change
**Solution**:
- Include explicit proportions: "60% body, 40% head"
- Reference turnaround sheet
- Describe relative sizes

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2024-01 | Initial Flux Kontext training guide |
