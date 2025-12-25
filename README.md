# Boxing Timer

### Overview

A mobile-first progressive web application for boxing and combat sports training. The timer provides configurable round/rest intervals with audio and haptic feedback, designed for use in noisy gym environments with sweaty hands or boxing gloves.

### Target Platform

Primary: Mobile browsers (iOS Safari, Android Chrome)
Secondary: Tablets and desktop

### Core Functionality

- Configurable rounds, round duration, and rest periods
- Start/pause/reset controls with large touch targets
- Audio bell and warning sounds with vibration feedback
- Predefined presets (amateur, pro, Muay Thai) and custom preset saving
- Automatic round/rest transitions

### Technical Approach

- TypeScript with strict mode
- PWA architecture (offline-first, installable)
- Web Audio API for reliable sound playback
- Screen Wake Lock API and Vibration API
- localStorage for preset persistence
- Dark mode UI optimized for OLED battery savings

### Key Constraints

- Bundle size under 200KB
- Touch targets minimum 56x56px
- Timer must persist through screen lock and interruptions
- High contrast visuals for bright gym lighting

### Out of Scope (v1)

- User accounts and cloud sync
- Social/sharing features
- Workout programming beyond timer
- Desktop keyboard shortcuts

## Tech stack

- ⚡ **Svelte 5** with SvelteKit
- 📦 **pnpm** for fast, efficient package management
- 🔧 **TypeScript** with strict mode enabled
- 🎯 **Path Aliases** for clean imports:
  - `$components` → `src/lib/components`
  - `$stores` → `src/lib/stores`
  - `$utils` → `src/lib/utils`
  - `$types` → `src/lib/types`
  - `$assets` → `src/lib/assets`
- 🔍 **ESLint** with flat config:
  - TypeScript ESLint strict rules
  - Svelte plugin
  - Prettier integration
- 💅 **Prettier** with:
  - Svelte plugin
  - Auto-import sorting (svelte → $app → $lib → aliases → relative)
- 📱 **PWA** support via @vite-pwa/sveltekit:
  - Offline functionality
  - Standalone display mode
  - Portrait orientation
- 🪝 **Husky** + **lint-staged** for pre-commit hooks

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (will be installed if not present)

### Installation

```sh
# Install dependencies
pnpm install
```

### Development

```sh
# Start development server
pnpm dev

# Start and open in browser
pnpm dev -- --open
```

### Building

```sh
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Run TypeScript and Svelte checks
- `pnpm check:watch` - Run checks in watch mode
- `pnpm lint` - Lint code with ESLint
- `pnpm lint:fix` - Lint and fix issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Project Structure

```
boxing-timer/
├── src/
│   ├── lib/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Svelte components
│   │   ├── stores/        # Svelte stores
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── routes/            # SvelteKit routes
│   ├── app.html           # HTML template
│   └── app.d.ts           # Type definitions
├── static/                # Static files (favicon, PWA icons, etc.)
├── .husky/                # Git hooks
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier configuration
├── svelte.config.js       # SvelteKit configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Configuration

### TypeScript

TypeScript is configured with strict mode enabled. Path aliases are configured in `svelte.config.js` and automatically recognized by TypeScript.

### ESLint

ESLint uses the new flat config format with:

- Strict TypeScript rules
- Svelte-specific linting
- Prettier integration to avoid conflicts

### Prettier

Prettier is configured to:

- Use tabs for indentation
- Single quotes for strings
- Sort imports automatically in the correct order

### PWA

The PWA is configured with:

- Standalone display mode for app-like experience
- Portrait orientation lock
- Offline support with service worker
- Precaching of static assets

## License

See [LICENSE](LICENSE) for details.
