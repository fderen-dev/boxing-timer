<script lang="ts">
	import { timer } from '$stores/timer';
	import { formatTime } from '$utils/time';
</script>

<div class="timer-display">
	<h3>Timer Configuration</h3>
	<p>Rounds: {timer.config.totalRounds}</p>
	<p>Round Duration: {formatTime(timer.config.roundDuration)}</p>
	<p>Rest Duration: {formatTime(timer.config.restDuration)}</p>
</div>

<style>
	.timer-display {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
