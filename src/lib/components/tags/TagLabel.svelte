<script context="module" lang="ts">
	interface Tag {
		tag: string;
		color: string;
	}
</script>

<script lang="ts">
	import { addOpacityToHex } from '$lib/utils/colors/conv';
	import { blackOrWhiteText } from '$lib/utils/colors/txtColor';
	import convert from 'color-convert';
	import { createEventDispatcher } from 'svelte';
	import { Icon, XMark } from 'svelte-hero-icons';

	export let tag: Tag;

	export let removable = false;

	$: hex = tag.color;
	$: [r, g, b] = convert.hex.rgb(hex);

	const dispatch = createEventDispatcher<{
		remove: Tag;
	}>();
</script>

<span
	class="border-1 flex items-center gap-0.5 rounded-full border-solid border-[--color] bg-[--color-opaque] px-2 py-0.5 text-[--txt-color]"
	style:--color={hex}
	style:--color-opaque={addOpacityToHex(hex, 0.8)}
	style:--txt-color={blackOrWhiteText({ r, g, b })}
>
	{tag.tag}

	{#if removable}
		<button
			class="p-0.5"
			on:click={() => {
				dispatch('remove', { tag: tag.tag, color: tag.color });
			}}
		>
			<Icon src={XMark} class="h-4 w-4" />
		</button>
	{/if}
</span>
