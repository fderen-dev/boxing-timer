import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

class ThemeStore {
	value = $state<Theme>('light');

	toggle(): void {
		const newTheme = this.value === 'dark' ? 'light' : 'dark';
		this.set(newTheme);
	}

	set(theme: Theme): void {
		this.value = theme;

		if (browser) {
			document.documentElement.classList.toggle('dark', theme === 'dark');
			localStorage.setItem('theme', theme);
		}
	}

	init(): void {
		if (!browser) return;

		const stored = localStorage.getItem('theme') as Theme | null;

		if (stored) {
			this.set(stored);
			return;
		}

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		const theme = prefersDark ? 'dark' : 'light';
		this.set(theme);
	}
}

export const theme = new ThemeStore();
