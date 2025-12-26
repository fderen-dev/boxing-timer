import { browser } from '$app/environment';

export type DeviceType = 'mobile' | 'desktop';

export function detectDeviceType(): DeviceType {
	if (!browser) return 'desktop';

	// Check for touch support
	const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	// Check user agent for mobile patterns
	const userAgent = navigator.userAgent.toLowerCase();
	const mobilePatterns = [
		/android/i,
		/iphone/i,
		/ipad/i,
		/ipod/i,
		/blackberry/i,
		/windows phone/i,
		/mobile/i
	];
	const isMobileUserAgent = mobilePatterns.some((pattern) => pattern.test(userAgent));

	// Check screen width (mobile: < 768px)
	const isSmallScreen = window.innerWidth < 768;

	// Check for mobile-specific features
	const hasMobileFeatures = 'vibrate' in navigator || 'wakeLock' in navigator;

	// Determine device type
	// Mobile if: touch support AND (mobile user agent OR small screen OR mobile features)
	if (hasTouch && (isMobileUserAgent || isSmallScreen || hasMobileFeatures)) {
		return 'mobile';
	}

	return 'desktop';
}
