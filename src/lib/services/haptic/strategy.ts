export interface HapticStrategy {
	vibrate(pattern: number[]): void;
	isSupported(): boolean;
}
