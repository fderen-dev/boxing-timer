<script lang="ts">
	import type { Timer } from '$types/timer';
	import { formatTime } from '$utils/time';

	let { timer }: { timer: Timer } = $props();
</script>

<div class="timer-display">
	<h3>Timer Configuration</h3>
	<p>Rounds: {timer.rounds}</p>
	<p>Round Duration: {formatTime(timer.roundDuration)}</p>
	<p>Rest Duration: {formatTime(timer.restDuration)}</p>
</div>

<style>
	.timer-display {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
