export interface WakeLockStrategy {
	acquire(): Promise<void>;
	release(): void;
	isSupported(): boolean;
}
