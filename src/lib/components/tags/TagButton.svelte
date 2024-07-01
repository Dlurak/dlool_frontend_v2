<script context="module" lang="ts">
	interface Tag {
		tag: string;
		color: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TagLabel from './TagLabel.svelte';

	export let tag: Tag;

	export let removable = false;

	export let disabled = false;

	const dispatch = createEventDispatcher<{
		click: Tag;
	}>();
</script>

<button
	{disabled}
	class="disabled:opacity-50"
	on:click={() => {
		dispatch('click', { tag: tag.tag, color: tag.color });
	}}
>
	<TagLabel {tag} {removable} on:remove />
</button>
