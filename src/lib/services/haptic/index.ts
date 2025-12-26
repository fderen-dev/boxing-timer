import { device } from '$stores/device';

import { DesktopHapticStrategy } from './desktop.js';
import { MobileHapticStrategy } from './mobile.js';
import type { HapticStrategy } from './strategy.js';

class HapticService {
	private strategy: HapticStrategy;

	constructor() {
		this.strategy = device.isMobile() ? new MobileHapticStrategy() : new DesktopHapticStrategy();
	}

	vibrate(pattern: number[]): void {
		this.strategy.vibrate(pattern);
	}

	isSupported(): boolean {
		return this.strategy.isSupported();
	}
}

export const hapticService = new HapticService();
