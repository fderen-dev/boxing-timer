import type { TimerConfig, TimerState } from '$types/timer';

import { timerService } from '../services/timer.js';

export class TimerStore {
	config = $state<TimerConfig>({
		roundDuration: 180,
		restDuration: 60,
		totalRounds: 3,
		warningTime: 10
	});

	state = $state<TimerState>({
		status: 'idle',
		currentRound: 0,
		timeRemaining: 0,
		isWarning: false
	});

	isWarning = $derived(
		this.state.status === 'fighting' && this.state.timeRemaining <= this.config.warningTime
	);

	setConfig(config: TimerConfig): void {
		this.config = config;
	}

	async start(): Promise<void> {
		await timerService.start(this);
	}

	pause(): void {
		timerService.pause();
	}

	resume(): void {
		timerService.resume();
	}

	reset(): void {
		timerService.stop();
		this.state.status = 'idle';
		this.state.currentRound = 0;
		this.state.timeRemaining = 0;
		this.state.isWarning = false;
	}

	skipRound(): void {
		timerService.skipRound(this);
	}

	restartRound(): void {
		timerService.restartRound(this);
	}
}

export const timer = new TimerStore();
