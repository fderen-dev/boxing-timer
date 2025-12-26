import { browser } from '$app/environment';

class HapticService {
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

export const hapticService = new HapticService();
