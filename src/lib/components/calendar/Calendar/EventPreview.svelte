<script lang="ts">
	import type { Calendar } from '$lib/dlool/calendar/list';

	export let event: Calendar;
</script>

<div class="rounded bg-emerald-500 bg-opacity-50 px-1 outline outline-1 outline-emerald-500">
	{event.title}
</div>
