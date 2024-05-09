<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.data.status === 'success'}
	{@const note = data.data.data}

	<h2>{note.title}</h2>

	{#if note.summary}
		<p>{note.summary}</p>
	{/if}
{/if}
