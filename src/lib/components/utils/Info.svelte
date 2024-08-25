<script>
	import { Icon, InformationCircle } from 'svelte-hero-icons';
</script>

<div class="px-1 py-3">
	<div
		class="info-box flex items-center gap-2 rounded-md border-2 border-solid border-blue-600 bg-blue-300 bg-opacity-20 px-3 py-2 dark:border-blue-400"
	>
		<Icon src={InformationCircle} class="h-8 w-8 flex-none" />
		<span class="w-full">
			<slot />
		</span>
	</div>
</div>
