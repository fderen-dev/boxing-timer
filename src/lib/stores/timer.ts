import { writable } from 'svelte/store';

import type { Timer } from '$types/timer';

export const timerStore = writable<Timer>({
	rounds: 3,
	roundDuration: 180,
	restDuration: 60
});
