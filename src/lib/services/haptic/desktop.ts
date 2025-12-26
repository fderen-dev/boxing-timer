import type { HapticStrategy } from './strategy.js';

export class DesktopHapticStrategy implements HapticStrategy {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	vibrate(_pattern: number[]): void {
		// No-op: Vibration not supported on desktop
	}

	isSupported(): boolean {
		return false;
	}
}
