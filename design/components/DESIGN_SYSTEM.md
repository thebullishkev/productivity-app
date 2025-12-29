# Prodowl Design System

## Component Library

### Buttons

#### Primary Button
```jsx
<Button variant="primary">
  Complete Task
</Button>
```

**Specifications:**
- Background: `#6366F1` (primary)
- Text: White `#FFFFFF`
- Border Radius: `12px`
- Padding: `10px 16px`
- Font Weight: 500
- Hover: `#4F46E5` (primary-hover)
- Active: Scale 0.98
- Focus: Ring `#6366F1/50`

**States:**
```css
.btn-primary {
  background: #6366F1;
  color: white;
  transition: all 150ms ease-out;
}

.btn-primary:hover {
  background: #4F46E5;
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:focus {
  outline: none;
  ring: 2px solid rgba(99, 102, 241, 0.5);
  ring-offset: 2px;
}
```

#### Secondary Button
```jsx
<Button variant="secondary">
  Cancel
</Button>
```

**Specifications:**
- Background: White `#FFFFFF`
- Text: `#1F2937` (text)
- Border: `1px solid #E5E7EB`
- Hover: `#F9FAFB` background

#### Ghost Button
```jsx
<Button variant="ghost">
  <Icon /> View All
</Button>
```

**Specifications:**
- Background: Transparent
- Text: `#6B7280` (text-muted)
- Hover: `#F3F4F6` background, `#1F2937` text

#### Button Sizes

| Size | Padding | Font Size | Icon Size |
|------|---------|-----------|-----------|
| sm | `6px 12px` | `14px` | `16px` |
| md | `10px 16px` | `14px` | `20px` |
| lg | `12px 24px` | `16px` | `24px` |

---

### Cards

#### Default Card
```jsx
<Card>
  <Card.Header>
    <Card.Title>Task Summary</Card.Title>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Specifications:**
- Background: White `#FFFFFF`
- Border: `1px solid #F3F4F6`
- Border Radius: `16px`
- Shadow: `0 1px 2px rgba(0, 0, 0, 0.05)`
- Hover Shadow: `0 4px 6px rgba(0, 0, 0, 0.1)`
- Padding: `16px` (default)

#### Interactive Card
```jsx
<Card variant="interactive">
  Clickable content
</Card>
```

**Additional Specs:**
- Cursor: pointer
- Hover: Border color `#6366F1`
- Active: Scale 0.99

#### Task Card

```jsx
<TaskCard
  title="Review documentation"
  priority="high"
  dueDate="Today"
  completed={false}
/>
```

**Layout:**
```
┌─────────────────────────────────────┐
│ ○ Task Title              [Priority]│
│   Due: Today · Category             │
│   [Tag] [Tag]                       │
└─────────────────────────────────────┘
```

---

### Inputs

#### Text Input
```jsx
<Input
  label="Task Name"
  placeholder="Enter task name"
  error="Task name is required"
/>
```

**Specifications:**
- Background: White `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border Radius: `12px`
- Padding: `10px 16px`
- Focus Border: `#6366F1`
- Focus Ring: `2px rgba(99, 102, 241, 0.2)`
- Error Border: `#EF4444`

**Label:**
- Font Size: `14px`
- Font Weight: 500
- Color: `#1F2937`
- Margin Bottom: `8px`

**Error Message:**
- Font Size: `12px`
- Color: `#EF4444`
- Margin Top: `4px`

#### Textarea
```jsx
<Textarea
  label="Description"
  rows={4}
/>
```

Same specs as Input, with `min-height: 100px`

---

### Badges

#### Default Badge
```jsx
<Badge>Label</Badge>
```

**Specifications:**
- Background: `#F3F4F6`
- Text: `#6B7280`
- Border Radius: `6px`
- Padding: `4px 8px`
- Font Size: `12px`
- Font Weight: 500

#### Variants

| Variant | Background | Text |
|---------|------------|------|
| default | `#F3F4F6` | `#6B7280` |
| primary | `#E0E7FF` | `#4F46E5` |
| success | `#D1FAE5` | `#059669` |
| warning | `#FEF3C7` | `#D97706` |
| danger | `#FEE2E2` | `#DC2626` |

---

### Progress Components

#### Circular Progress
```jsx
<CircularProgress value={75} size={120} />
```

**Specifications:**
- Track Color: `#F3F4F6`
- Progress Color: `#6366F1`
- Stroke Width: `8px`
- Animation: Smooth transition on value change

#### Linear Progress
```jsx
<Progress value={60} />
```

**Specifications:**
- Height: `8px`
- Border Radius: `4px`
- Background: `#F3F4F6`
- Fill: Gradient `#6366F1` to `#10B981`

---

### Navigation

#### Sidebar Navigation
```jsx
<SidebarNav
  items={[
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'habits', label: 'Habits', icon: Repeat, badge: 'NEW' },
  ]}
  activeId="tasks"
/>
```

**Item Specifications:**
- Height: `48px`
- Padding: `12px 16px`
- Border Radius: `12px`
- Gap: `12px` between icon and label

**Active State:**
- Background: `rgba(99, 102, 241, 0.1)`
- Text Color: `#6366F1`
- Font Weight: 500

**Inactive State:**
- Background: Transparent
- Text Color: `#6B7280`
- Hover Background: `#F3F4F6`

---

### Notifications

#### Toast Notification
```jsx
<Toast
  type="success"
  title="Task Completed!"
  message="Great job on finishing that task."
  mascotMood="celebrating"
/>
```

**Specifications:**
- Position: Top-right
- Width: `360px`
- Border Radius: `16px`
- Shadow: `0 10px 15px rgba(0, 0, 0, 0.1)`
- Animation: Slide in from right

**Types:**
| Type | Border Left | Icon |
|------|-------------|------|
| success | `#10B981` | CheckCircle |
| warning | `#F59E0B` | AlertTriangle |
| error | `#EF4444` | XCircle |
| info | `#3B82F6` | Info |

#### Mascot Notification
```jsx
<MascotNotification
  message="Hey! You have 3 tasks waiting..."
  mood="scheming"
/>
```

**Specifications:**
- Appears from mascot position
- Speech bubble with tail
- Max Width: `240px`
- Auto-dismiss: 5 seconds

---

### Mascot Component

#### Floating Mascot
```jsx
<Mascot
  mood="happy"
  message="Great progress today!"
  onClick={handleMascotClick}
/>
```

**Specifications:**
- Position: Fixed, bottom-right
- Size: `120x120px` (desktop), `80x80px` (mobile)
- Z-Index: 1000
- Hover: Scale 1.1
- Click: Opens speech bubble

**Mood Glow Effects:**
```css
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

.mascot[data-mood="scheming"] {
  filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.4));
}
```

---

## Animation Tokens

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-celebration: 1500ms;
```

### Easings
```css
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Common Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Layout Adjustments

| Breakpoint | Sidebar | Content | Mascot |
|------------|---------|---------|--------|
| Mobile (<768px) | Hidden (hamburger) | Full width | 80px |
| Tablet (768-1024px) | Collapsed (icons) | Adjusted | 100px |
| Desktop (>1024px) | Full (256px) | Flexible | 120px |

---

## Accessibility

### Focus States
All interactive elements must have visible focus states:
```css
:focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
}
```

### Color Contrast
- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

### Touch Targets
- Minimum size: 44x44px
- Adequate spacing between targets

### Screen Reader
- All icons have aria-labels
- Images have alt text
- Semantic HTML structure
- Announce dynamic content changes

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial design system |
