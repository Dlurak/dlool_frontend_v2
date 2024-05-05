<script lang="ts">
	import { Icon, ChevronDown, ChevronUp } from 'svelte-hero-icons';
	import { localstorage } from 'svocal';

	export let id: string;
	const isExpanded = localstorage(`isCollapsed-${id}`, true);
</script>

<div class="flex items-center justify-between">
	<slot name="heading" />
	<button on:click={() => isExpanded.update((v) => !v)}>
		<slot name="button">
			<Icon src={$isExpanded ? ChevronUp : ChevronDown} mini class="h-6 w-6" />
		</slot>
	</button>
</div>

{#if $isExpanded}
	<slot name="content" />
{/if}
