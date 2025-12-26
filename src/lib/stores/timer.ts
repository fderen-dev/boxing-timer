import type { TimerConfig, TimerState } from '$types/timer';

class TimerStore {
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

	start(): void {
		// Implementation for starting timer
	}

	pause(): void {
		// Implementation for pausing timer
	}

	resume(): void {
		// Implementation for resuming from paused
	}

	reset(): void {
		// Implementation for resetting to idle state
	}

	skipRound(): void {
		// Implementation for skipping to next round
	}

	restartRound(): void {
		// Implementation for restarting current round
	}
}

export const timer = new TimerStore();
