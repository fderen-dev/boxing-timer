export interface TimerConfig {
	roundDuration: number; // seconds
	restDuration: number; // seconds
	totalRounds: number;
	warningTime: number; // seconds before round end
}

export interface TimerState {
	status: 'idle' | 'fighting' | 'resting' | 'paused' | 'complete';
	currentRound: number;
	timeRemaining: number; // seconds
	isWarning: boolean;
}

export interface Preset {
	id: string;
	name: string;
	config: TimerConfig;
	isCustom: boolean;
}
