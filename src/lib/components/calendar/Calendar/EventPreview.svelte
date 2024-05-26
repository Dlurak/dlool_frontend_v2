<script lang="ts">
	import type { Calendar } from '$lib/dlool/calendar/list';

	export let event: Calendar;
</script>

<div
	class="
		aspect-square w-4 rounded-full bg-blue-500 bg-opacity-50 px-1 outline outline-1
		@[5rem]:aspect-[unset] @[5rem]:w-full @[5rem]:rounded
	"
	class:bg-emerald-500={event.priority === 'Minimal' || event.priority === null}
	class:outline-emerald-500={event.priority === 'Minimal' || event.priority === null}
	class:bg-blue-500={event.priority === 'Low'}
	class:outline-blue-500={event.priority === 'Low'}
	class:bg-yellow-500={event.priority === 'Medium'}
	class:outline-yellow-500={event.priority === 'Medium'}
	class:bg-orange-500={event.priority === 'High'}
	class:outline-orange-500={event.priority === 'High'}
	class:bg-red-500={event.priority === 'Critical'}
	class:outline-red-500={event.priority === 'Critical'}
>
	<span class="hidden @[5rem]:inline-block">
		{event.title}
	</span>
</div>
