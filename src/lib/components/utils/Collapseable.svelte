<script lang="ts">
	import { animationLength } from '$lib/utils/store/animation';
	import { Icon, ChevronDown } from 'svelte-hero-icons';
	import { slide } from 'svelte/transition';
	import { localstorage } from 'svocal';

	export let id: string;
	const isExpanded = localstorage(`isCollapsed-${id}`, true);
</script>

<div class="flex items-center justify-between">
	<slot name="heading" />
	<button
		on:click={() => isExpanded.update((v) => !v)}
		class:rotate-180={$isExpanded}
		class="transition-all"
	>
		<slot name="button">
			<Icon src={ChevronDown} mini class="h-6 w-6" />
		</slot>
	</button>
</div>

{#if $isExpanded}
	<div transition:slide={{ duration: $animationLength }} class="p-0.5">
		<slot name="content" />
	</div>
{/if}
