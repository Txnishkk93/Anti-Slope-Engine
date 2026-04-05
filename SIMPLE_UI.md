# AI Anti-Slop Engine - Simple UI Version

## Overview
This is a clean, minimalist implementation of the AI Anti-Slop Engine using only **Tailwind CSS** (no shadcn/ui, no Aceternity, no animations).

## Design System
- **Colors**: White, grays, and black only
- **Typography**: System fonts (Geist Sans)
- **Layout**: Simple flexbox and grid layouts
- **Spacing**: Tailwind spacing scale
- **No animations, no themes, no complex components**

## Pages

### Homepage (`/`)
- Clean header with navigation
- Hero section with main CTA
- Features overview (3 columns)
- Footer

### Generator (`/generator`)
- Two-column layout
- Input panel on left (document type, topic, notes)
- Preview panel on right
- Generate, Copy, and Download buttons

## File Structure
```
app/
├── page.tsx              (Homepage)
├── generator/
│   └── page.tsx         (Generator page)
├── layout.tsx           (Root layout - simple, no providers)
└── globals.css          (Just Tailwind import)

components/
└── ui/                  (Unused shadcn components - not needed for this UI)
```

## Technology Stack
- **Next.js 16** (React 19, App Router)
- **TypeScript**
- **Tailwind CSS 4** (utility-first styling)
- **No component libraries**
- **No animations (Framer Motion removed)**
- **No theme provider (single light theme)**

## Key Features
1. **Minimalist Design**: White background, dark text, simple borders
2. **No External Dependencies**: Only uses Tailwind for styling
3. **Fast & Lightweight**: Minimal JavaScript, pure CSS utilities
4. **Responsive**: Mobile-first design
5. **Functional Generator**: Mock data generation with copy/download

## Customization

### Colors
Edit Tailwind classes directly in components:
- `bg-white`, `bg-gray-50`, `bg-gray-900`
- `text-gray-900`, `text-gray-600`
- `border-gray-200`, `border-gray-300`

### Typography
- Headings: `font-bold`, `text-4xl`, `text-3xl`, `text-2xl`, `text-lg`
- Body: `text-base`, `text-sm`
- Utilities: `font-medium`, `font-semibold`

### Layout
- Use `flex` for rows and columns
- Use `grid grid-cols-1 md:grid-cols-2` for responsive grids
- Use `max-w-4xl mx-auto` for centered content

## Running the Project
```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` - it will show the simple homepage.

## Notes
- All shadcn/ui components remain in the project but are unused
- You can remove `components/ui/` folder if you want to clean up
- The project uses mock data for the generator - no real API calls yet
- Perfect starting point for adding backend integration
