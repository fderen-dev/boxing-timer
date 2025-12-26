import { browser } from '$app/environment';

import type { HapticStrategy } from './strategy.js';

export class MobileHapticStrategy implements HapticStrategy {
	vibrate(pattern: number[]): void {
		if (!browser) return;

		try {
			if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
				navigator.vibrate(pattern);
			}
		} catch (error) {
			console.warn('Failed to vibrate:', error);
		}
	}

	isSupported(): boolean {
		if (!browser) return false;
		return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
	}
}
