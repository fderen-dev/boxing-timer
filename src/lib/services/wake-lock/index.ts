import { device } from '$stores/device.svelte.js';

import { DesktopWakeLockStrategy } from './desktop.js';
import { MobileWakeLockStrategy } from './mobile.js';
import type { WakeLockStrategy } from './strategy.js';

class WakeLockService {
	private strategy: WakeLockStrategy;

	constructor() {
		this.strategy = device.isMobile()
			? new MobileWakeLockStrategy()
			: new DesktopWakeLockStrategy();
	}

	async acquire(): Promise<void> {
		await this.strategy.acquire();
	}

	release(): void {
		this.strategy.release();
	}

	isSupported(): boolean {
		return this.strategy.isSupported();
	}
}

export const wakeLockService = new WakeLockService();
