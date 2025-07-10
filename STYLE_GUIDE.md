# La Fourmi - Style Guide & Theming System

## 🎨 **Color System**

### **Primary Colors**
```css
--grocery-yellow: 45 93% 58%     /* #FFC107 - Main brand color */
--grocery-yellow-light: 45 93% 68%  /* Lighter variant for hovers */
--background: 0 0% 0%            /* Pure black background */
--card: 0 0% 0%                  /* Black card backgrounds */
--foreground: 210 40% 98%        /* Near-white text */
```

### **Semantic Colors**
```css
--muted: 217.2 32.6% 17.5%       /* Dark gray for muted text */
--border: 217.2 32.6% 17.5%      /* Border color */
--accent: 45 93% 58%             /* Same as grocery-yellow */
```

## 🏗️ **Component Patterns**

### **Card Components**
```tsx
// ✅ CORRECT - Dark theme with proper styling
<Card className="bg-card border-grocery-yellow/20 shadow-lg hover:shadow-2xl">
  <CardContent className="bg-card">
    {/* Content */}
  </CardContent>
</Card>

// ❌ AVOID - Explicit white backgrounds
<Card className="bg-white">
```

### **Buttons**
```tsx
// Primary action buttons
<Button className="bg-grocery-yellow text-black hover:bg-grocery-yellow-light">
  
// Secondary buttons  
<Button variant="outline" className="border-grocery-yellow/30 hover:border-grocery-yellow">

// Glowing buttons
<Button className="glow-border rounded-full">
```

### **Interactive Elements**
```tsx
// Hover effects
className="hover:scale-105 transition-all duration-300"

// Glow effects
className="glow-effect" // For subtle glow
className="glow-border" // For animated border glow
```

## 📐 **Layout & Typography**

### **Typography Scale**
```tsx
// Main headings
className="text-6xl font-bold font-mono"

// Section headings  
className="text-5xl font-bold font-mono"

// Body text
className="text-xl text-muted-foreground font-light"

// HyperText animations
<HyperText 
  text="Your Text" 
  className="text-6xl font-bold font-mono text-gradient"
  animateOnLoad={false}
/>
```

### **Spacing System**
```tsx
// Section padding
className="py-20 px-4" // Standard section
className="py-32 px-8" // Hero sections

// Card padding
className="p-4"     // Compact cards
className="p-6"     // Standard cards  
className="p-12"    // Feature cards
```

## 🎭 **Animation Patterns**

### **Framer Motion Entry**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### **Hover Animations**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="hover:scale-105 transition-all duration-300"
>
```

### **Staggered Animations**
```tsx
transition={{ duration: 0.4, delay: index * 0.05 }}
```

## 🎯 **Component Design Rules**

### **Cards Must Have:**
1. `bg-card` for proper dark theme
2. `border-grocery-yellow/20` for subtle borders
3. `shadow-lg hover:shadow-2xl` for depth
4. `transition-all duration-300` for smooth interactions

### **Sections Must Have:**
1. `bg-background` for consistent background
2. `py-20 px-4` minimum padding
3. `container mx-auto` for content centering

### **Interactive Elements Must Have:**
1. Hover states with `hover:` prefixes
2. Transition animations with `transition-all duration-300`
3. Scale effects for buttons: `hover:scale-105`

## 🚫 **What to Avoid**

### **Color Overrides**
```tsx
// ❌ NEVER use explicit white/gray backgrounds
className="bg-white"
className="bg-gray-100" 

// ✅ USE semantic tokens instead
className="bg-card"
className="bg-background"
className="bg-muted"
```

### **Inconsistent Sizing**
```tsx
// ❌ AVOID arbitrary values
className="text-[32px] p-[24px]"

// ✅ USE design system scale
className="text-2xl p-6"
```

## 🎨 **Design Principles**

### **Visual Hierarchy**
1. **Primary**: Grocery yellow for main actions and highlights
2. **Secondary**: White/gray text for content
3. **Tertiary**: Muted colors for supporting information

### **Contrast & Accessibility**
- Always use high contrast: white text on black backgrounds
- Yellow accent color provides strong visual emphasis
- Maintain readability with proper font weights and sizes

### **Proportional Scaling**
```tsx
// Mobile-first responsive design
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
className="p-4 sm:p-6 md:p-8 lg:p-12"
className="gap-4 sm:gap-6 md:gap-8"
```

## 🔧 **Custom Utilities**

### **Available Custom Classes**
```css
.glow-effect        /* Subtle hover glow */
.glow-border        /* Animated border glow */
.text-gradient      /* Yellow gradient text */
.glass-morphism     /* Glass effect */
.animate-float      /* Floating animation */
.animate-glow       /* Pulsing glow */
.animate-fade-in-up /* Entry animation */
```

## 📱 **Responsive Breakpoints**

```tsx
// Tailwind breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices  
lg: 1024px  // Large devices
xl: 1280px  // Extra large
2xl: 1536px // 2X large
```

## 🎬 **Animation Guidelines**

### **Performance**
- Use `transform` and `opacity` for animations
- Prefer CSS transitions over JavaScript animations
- Use `will-change` sparingly and remove after animation

### **Timing**
```tsx
duration-300  // Quick interactions (buttons, hovers)
duration-500  // Medium transitions (modals, cards)
duration-700  // Slow transitions (page transitions)
```

## 📦 **File Organization**

```
src/
├── components/
│   ├── ui/           # Base UI components (Card, Button, etc.)
│   ├── [Feature]/    # Feature-specific components
│   └── animata/      # Third-party animation components
├── data/            # Static data and content
├── hooks/           # Custom React hooks
└── lib/            # Utilities and helpers
```

## 🔍 **Debugging Dark Theme Issues**

If components show white backgrounds:

1. **Check CSS specificity**: Ensure no explicit `bg-white` classes
2. **Verify theme application**: Cards should use `bg-card` not `bg-white`
3. **Inspect CSS variables**: `--card` should be `0 0% 0%` (black)
4. **Check Tailwind compilation**: Ensure custom theme is compiled correctly

## 🎯 **Quality Checklist**

Before committing new components:

- [ ] Uses semantic color tokens (`bg-card`, `text-foreground`)
- [ ] Has proper hover/focus states
- [ ] Includes smooth transitions (`transition-all duration-300`)
- [ ] Responsive across all breakpoints
- [ ] Maintains grocery yellow accent color
- [ ] Dark theme compatible
- [ ] Accessible contrast ratios
- [ ] Consistent spacing using design system scale 