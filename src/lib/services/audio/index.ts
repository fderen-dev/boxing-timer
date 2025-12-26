import { device } from '$stores/device.svelte.js';

import { DesktopAudioStrategy } from './desktop.js';
import { MobileAudioStrategy } from './mobile.js';
import type { AudioStrategy } from './strategy.js';

class AudioService {
	private strategy: AudioStrategy;

	constructor() {
		this.strategy = device.isMobile() ? new MobileAudioStrategy() : new DesktopAudioStrategy();
	}

	async initialize(): Promise<void> {
		await this.strategy.initialize();
	}

	playSound(type: 'bell' | 'warning'): void {
		this.strategy.playSound(type);
	}

	startBackgroundAudio(): void {
		this.strategy.startBackgroundAudio();
	}

	stopBackgroundAudio(): void {
		this.strategy.stopBackgroundAudio();
	}

	cleanup(): void {
		this.strategy.cleanup();
	}

	setVolume(volume: number): void {
		this.strategy.setVolume(volume);
	}
}

export const audioService = new AudioService();
