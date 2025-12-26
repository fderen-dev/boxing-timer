import { browser } from '$app/environment';

import { detectDeviceType, type DeviceType } from '$utils/device';

class DeviceStore {
	type = $state<DeviceType>(browser ? detectDeviceType() : 'desktop');

	init(): void {
		if (browser) {
			this.type = detectDeviceType();
		}
	}

	getType(): DeviceType {
		return this.type;
	}

	isMobile(): boolean {
		return this.type === 'mobile';
	}

	isDesktop(): boolean {
		return this.type === 'desktop';
	}
}

export const device = new DeviceStore();
