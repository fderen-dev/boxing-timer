import { browser } from '$app/environment';

import type { WakeLockStrategy } from './strategy.js';

export class MobileWakeLockStrategy implements WakeLockStrategy {
	private wakeLock: WakeLockSentinel | null = null;

	async acquire(): Promise<void> {
		if (!browser) return;
		if (!('wakeLock' in navigator)) return;

		try {
			const nav = navigator as Navigator & {
				wakeLock?: { request(type: string): Promise<WakeLockSentinel> };
			};
			const wakeLockApi = nav.wakeLock;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (wakeLockApi) {
				const lock = await wakeLockApi.request('screen');
				this.wakeLock = lock;
				lock.addEventListener('release', () => {
					this.wakeLock = null;
				});
			}
		} catch (error) {
			console.warn('Failed to acquire wake lock:', error);
		}
	}

	release(): void {
		if (this.wakeLock) {
			this.wakeLock.release().catch((error: unknown) => {
				console.warn('Failed to release wake lock:', error);
			});
			this.wakeLock = null;
		}
	}

	isSupported(): boolean {
		if (!browser) return false;
		return 'wakeLock' in navigator;
	}
}
