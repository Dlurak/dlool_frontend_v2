<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.data}
	{#await data.data}
		Loading
	{:then data}
		{#each data.data.assignments as assignment}
			{assignment.description}
		{/each}
	{/await}
{:else if data.message === 'no school/class provided'}
	Set a school and class
{/if}
