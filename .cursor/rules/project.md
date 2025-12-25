# Boxing Timer - Project Instructions

## Overview

Mobile-first PWA for boxing and combat sports training. Configurable round/rest intervals with audio and haptic feedback, designed for noisy gym environments with sweaty hands or boxing gloves.

## Target Platform

- **Primary:** Mobile browsers (iOS Safari 15+, Android Chrome 90+)
- **Secondary:** Tablets

---

## Functional Requirements

### Timer Core

- [ ] Configurable round duration (seconds/minutes)
- [ ] Configurable rest period duration
- [ ] Configurable total number of rounds
- [ ] Start, pause, resume, reset controls
- [ ] Track and display current round number
- [ ] Countdown display for active round/rest period
- [ ] Automatic transition between rounds and rest periods

### Audio & Haptic System

- [ ] Bell sound on round start
- [ ] Bell sound on round end
- [ ] Warning sound at configurable time before round ends (default 10s)
- [ ] Vibration patterns for round/rest transitions (Vibration API)
- [ ] Volume boost option for gym noise

### Presets & Persistence

- [ ] Predefined presets: Amateur (3x3min), Pro (12x3min), Muay Thai (5x3min)
- [ ] Create and save custom presets to localStorage
- [ ] Delete saved presets
- [ ] Load preset with single tap

### Mobile Controls

- [ ] Large single-tap start/pause toggle (center screen)
- [ ] Swipe right to skip to next round
- [ ] Swipe left to restart current round
- [ ] Floating controls visible during countdown

---

## Non-Functional Requirements

### Performance

- [ ] Timer accuracy within ±100ms
- [ ] Audio playback latency under 50ms
- [ ] First contentful paint under 1.5s on 4G
- [ ] Bundle size under 200KB

### Usability

- [ ] Touch targets minimum 56x56px
- [ ] High contrast UI for bright gym lighting
- [ ] Countdown readable from 2+ meters distance
- [ ] Portrait orientation lock
- [ ] Single-hand operable
- [ ] Dark mode default

### Reliability

- [ ] Offline-first (Service Worker caching)
- [ ] Timer continues when screen locked
- [ ] Screen Wake Lock API during active session
- [ ] Web Audio API with silent audio loop for background playback
- [ ] Graceful recovery from interruptions (calls, notifications)

### Battery & Resources

- [ ] Minimal CPU usage (requestAnimationFrame throttling when inactive)
- [ ] No network requests during active session
- [ ] OLED-friendly dark theme

### Installation

- [ ] Installable as PWA (Add to Home Screen)
- [ ] Full-screen capable (no browser chrome)
- [ ] Handles notch/safe area insets

---

## UI States

1. **Idle** - Timer not started, configuration visible
2. **Fighting** - Round active, countdown running, green/red theme
3. **Warning** - Last 10s of round, yellow/orange theme, warning sound
4. **Resting** - Rest period active, blue theme
5. **Complete** - All rounds finished, summary displayed

---

## Audio Assets Required

- `bell.mp3` - Round start/end bell (short, punchy)
- `warning.mp3` - Warning beep (distinct from bell)
- `silent.mp3` - 1s silent loop for background audio hack

---

## Data Models

```typescript
interface TimerConfig {
	roundDuration: number; // seconds
	restDuration: number; // seconds
	totalRounds: number;
	warningTime: number; // seconds before round end
}

interface Preset {
	id: string;
	name: string;
	config: TimerConfig;
	isCustom: boolean;
}

interface TimerState {
	status: 'idle' | 'fighting' | 'resting' | 'paused' | 'complete';
	currentRound: number;
	timeRemaining: number; // seconds
	isWarning: boolean;
}
```

---

## Default Presets

| Name      | Rounds | Round Duration | Rest Duration |
| --------- | ------ | -------------- | ------------- |
| Amateur   | 3      | 3:00           | 1:00          |
| Pro       | 12     | 3:00           | 1:00          |
| Muay Thai | 5      | 3:00           | 1:00          |
| Quick     | 6      | 2:00           | 0:30          |

---

## Browser APIs to Use

- **Web Audio API** - Sound playback
- **Vibration API** - `navigator.vibrate()`
- **Screen Wake Lock API** - `navigator.wakeLock.request('screen')`
- **localStorage** - Preset persistence

---

## Out of Scope (v1)

- User accounts / cloud sync
- Social / sharing features
- Workout programming beyond timer
- Desktop keyboard shortcuts
- Multiple concurrent timers
