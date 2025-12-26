import { browser } from '$app/environment';

import type { TimerConfig, TimerState } from '$types/timer';

import { audioService } from './audio.js';
import { hapticService } from './haptic.js';
import { wakeLockService } from './wake-lock.js';

// Forward declaration to avoid circular dependency
interface TimerStoreInterface {
	config: TimerConfig;
	state: TimerState;
}

class TimerService {
	private intervalId: number | null = null;
	private animationFrameId: number | null = null;
	private lastTickTime: number = 0;
	private warningPlayed: boolean = false;
	private store: TimerStoreInterface | null = null;

	async start(store: TimerStoreInterface): Promise<void> {
		if (!browser) return;

		this.store = store;

		// Initialize audio context and load sounds
		await audioService.initialize();

		// Start background audio loop for iOS
		audioService.startBackgroundAudio();

		// Acquire wake lock
		await wakeLockService.acquire();

		// Start first round
		if (store.state.status === 'idle') {
			store.state.currentRound = 1;
			store.state.timeRemaining = store.config.roundDuration;
			store.state.status = 'fighting';
			audioService.playSound('bell');
			hapticService.vibrate([200]);
		}

		// Start countdown
		this.lastTickTime = performance.now();
		this.startCountdown();
	}

	pause(): void {
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		if (this.store) {
			this.store.state.status = 'paused';
		}
	}

	resume(): void {
		if (!this.store || !browser) return;

		if (this.store.state.status === 'paused') {
			this.store.state.status =
				this.store.state.currentRound === 0
					? 'idle'
					: this.store.state.currentRound % 2 === 1
						? 'fighting'
						: 'resting';

			this.lastTickTime = performance.now();
			this.startCountdown();
		}
	}

	stop(): void {
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		wakeLockService.release();
		audioService.stopBackgroundAudio();
		audioService.cleanup();

		if (this.store) {
			this.store.state.status = 'idle';
			this.store.state.currentRound = 0;
			this.store.state.timeRemaining = 0;
			this.store.state.isWarning = false;
		}

		this.warningPlayed = false;
		this.store = null;
	}

	skipRound(store: TimerStoreInterface): void {
		if (!browser) return;

		this.store = store;

		// Move to next phase
		if (store.state.status === 'fighting') {
			// Skip to rest or next round
			if (store.state.currentRound < store.config.totalRounds) {
				store.state.status = 'resting';
				store.state.timeRemaining = store.config.restDuration;
				audioService.playSound('bell');
				hapticService.vibrate([100, 50, 100]);
			} else {
				// All rounds complete
				this.complete(store);
			}
		} else if (store.state.status === 'resting') {
			// Skip to next round
			store.state.currentRound += 1;
			store.state.status = 'fighting';
			store.state.timeRemaining = store.config.roundDuration;
			audioService.playSound('bell');
			hapticService.vibrate([200]);
		}

		this.warningPlayed = false;
	}

	restartRound(store: TimerStoreInterface): void {
		if (!browser) return;

		this.store = store;

		if (store.state.status === 'fighting') {
			store.state.timeRemaining = store.config.roundDuration;
			this.warningPlayed = false;
		} else if (store.state.status === 'resting') {
			store.state.timeRemaining = store.config.restDuration;
		}
	}

	private startCountdown(): void {
		if (!browser || !this.store) return;

		const tick = (currentTime: number) => {
			if (!this.store) return;

			const delta = (currentTime - this.lastTickTime) / 1000; // Convert to seconds
			this.lastTickTime = currentTime;

			if (this.store.state.status === 'fighting' || this.store.state.status === 'resting') {
				this.store.state.timeRemaining = Math.max(0, this.store.state.timeRemaining - delta);

				// Check for warning
				if (
					this.store.state.status === 'fighting' &&
					this.store.state.timeRemaining <= this.store.config.warningTime &&
					!this.warningPlayed
				) {
					audioService.playSound('warning');
					hapticService.vibrate([100]);
					this.warningPlayed = true;
				}

				// Check if time is up
				if (this.store.state.timeRemaining <= 0) {
					this.handleTimeUp();
				}
			}

			this.animationFrameId = requestAnimationFrame(tick);
		};

		this.animationFrameId = requestAnimationFrame(tick);
	}

	private handleTimeUp(): void {
		if (!this.store) return;

		if (this.store.state.status === 'fighting') {
			// Round ended, move to rest or complete
			if (this.store.state.currentRound < this.store.config.totalRounds) {
				this.store.state.status = 'resting';
				this.store.state.timeRemaining = this.store.config.restDuration;
				audioService.playSound('bell');
				hapticService.vibrate([200, 100, 200]);
			} else {
				// All rounds complete
				this.complete(this.store);
			}
		} else if (this.store.state.status === 'resting') {
			// Rest ended, start next round
			this.store.state.currentRound += 1;
			this.store.state.status = 'fighting';
			this.store.state.timeRemaining = this.store.config.roundDuration;
			audioService.playSound('bell');
			hapticService.vibrate([200]);
		}

		this.warningPlayed = false;
	}

	private complete(store: TimerStoreInterface): void {
		store.state.status = 'complete';
		store.state.timeRemaining = 0;
		audioService.playSound('bell');
		hapticService.vibrate([200, 100, 200, 100, 200]);
		this.stop();
	}
}

export const timerService = new TimerService();
