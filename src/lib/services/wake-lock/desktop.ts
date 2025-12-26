import type { WakeLockStrategy } from './strategy.js';

export class DesktopWakeLockStrategy implements WakeLockStrategy {
	async acquire(): Promise<void> {
		// No-op: Wake lock less critical on desktop (doesn't sleep like mobile)
	}

	release(): void {
		// No-op: Wake lock less critical on desktop
	}

	isSupported(): boolean {
		return false;
	}
}
