<script lang="ts">
	import { page } from '$app/stores';
	import type { Calendar } from '$lib/dlool/calendar/list';

	export let event: Calendar;

	$: isMinimal = event.priority === 'Minimal' || event.priority === null;
	$: isLow = event.priority === 'Low';
	$: isMedium = event.priority === 'Medium';
	$: isHigh = event.priority === 'High';
	$: isCritical = event.priority === 'Critical';
</script>

<a
	href={`/calendar/${event.id}${$page.url.search}`}
	class="
		aspect-square w-4 rounded-full
		bg-blue-500 bg-opacity-50 px-1 text-black outline outline-1
		@[5rem]:aspect-[unset] @[5rem]:w-full @[5rem]:rounded dark:text-white
	"
	class:bg-emerald-500={isMinimal}
	class:outline-emerald-500={isMinimal}
	class:bg-blue-500={isLow}
	class:outline-blue-500={isLow}
	class:bg-yellow-500={isMedium}
	class:outline-yellow-500={isMedium}
	class:bg-orange-500={isHigh}
	class:outline-orange-500={isHigh}
	class:bg-red-500={isCritical}
	class:outline-red-500={isCritical}
>
	<span class="hidden @[5rem]:inline-block">
		{event.title}
	</span>
</a>
