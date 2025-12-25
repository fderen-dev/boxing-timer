import { writable } from 'svelte/store';

import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const newTheme = current === 'dark' ? 'light' : 'dark';
				if (browser) {
					document.documentElement.classList.toggle('dark', newTheme === 'dark');
					localStorage.setItem('theme', newTheme);
				}
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				document.documentElement.classList.toggle('dark', theme === 'dark');
				localStorage.setItem('theme', theme);
			}
			set(theme);
		},
		init: () => {
			if (!browser) return;

			// Check localStorage first
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored) {
				set(stored);
				document.documentElement.classList.toggle('dark', stored === 'dark');
				return;
			}

			// Check system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = prefersDark ? 'dark' : 'light';
			set(theme);
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	};
}

export const theme = createThemeStore();
