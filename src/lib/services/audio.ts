import { browser } from '$app/environment';

class AudioService {
	private audioContext: AudioContext | null = null;
	private bellAudio: AudioBuffer | null = null;
	private warningAudio: AudioBuffer | null = null;
	private backgroundAudio: HTMLAudioElement | null = null;
	private volume: number = 1.0;

	async initialize(): Promise<void> {
		if (!browser) return;

		try {
			// Runtime check for browser compatibility - AudioContext may not be available in all environments
			const AudioContextClass =
				(window as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
					.AudioContext ||
				(window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
			if (!AudioContextClass) {
				throw new Error('AudioContext not supported');
			}
			const audioContext = new AudioContextClass();
			this.audioContext = audioContext;

			// Load bell sound
			try {
				const bellResponse = await fetch('/bell.mp3');
				const bellArrayBuffer = await bellResponse.arrayBuffer();
				this.bellAudio = await audioContext.decodeAudioData(bellArrayBuffer);
			} catch (error) {
				console.warn('Failed to load bell sound:', error);
			}

			// Load warning sound
			try {
				const warningResponse = await fetch('/warning.mp3');
				const warningArrayBuffer = await warningResponse.arrayBuffer();
				this.warningAudio = await audioContext.decodeAudioData(warningArrayBuffer);
			} catch (error) {
				console.warn('Failed to load warning sound:', error);
			}
		} catch (error) {
			console.warn('Failed to initialize audio context:', error);
		}
	}

	playSound(type: 'bell' | 'warning'): void {
		if (!browser || !this.audioContext) return;

		const audioBuffer = type === 'bell' ? this.bellAudio : this.warningAudio;
		if (!audioBuffer) return;

		try {
			const source = this.audioContext.createBufferSource();
			const gainNode = this.audioContext.createGain();

			// Volume boost for gym noise
			gainNode.gain.value = this.volume;

			source.buffer = audioBuffer;
			source.connect(gainNode);
			gainNode.connect(this.audioContext.destination);

			source.start(0);
		} catch (error) {
			console.warn(`Failed to play ${type} sound:`, error);
		}
	}

	startBackgroundAudio(): void {
		if (!browser) return;

		try {
			this.backgroundAudio = new Audio('/silent.mp3');
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = 0.01;
			this.backgroundAudio.play().catch((error: unknown) => {
				console.warn('Failed to start background audio:', error);
			});
		} catch (error) {
			console.warn('Failed to create background audio:', error);
		}
	}

	stopBackgroundAudio(): void {
		if (this.backgroundAudio) {
			this.backgroundAudio.pause();
			this.backgroundAudio = null;
		}
	}

	cleanup(): void {
		if (this.audioContext) {
			this.audioContext.close().catch((error: unknown) => {
				console.warn('Failed to close audio context:', error);
			});
			this.audioContext = null;
		}

		this.bellAudio = null;
		this.warningAudio = null;
	}

	setVolume(volume: number): void {
		this.volume = Math.max(0, Math.min(1, volume));
	}
}

export const audioService = new AudioService();
