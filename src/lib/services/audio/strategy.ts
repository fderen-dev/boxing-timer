export interface AudioStrategy {
	initialize(): Promise<void>;
	playSound(type: 'bell' | 'warning'): void;
	startBackgroundAudio(): void;
	stopBackgroundAudio(): void;
	cleanup(): void;
	setVolume(volume: number): void;
}
