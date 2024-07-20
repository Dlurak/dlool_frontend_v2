<script lang="ts" context="module">
	function handleMarkdownInsertion(ele: HTMLTextAreaElement, value: string, func: InsertionFunc) {
		const { selectionStart, selectionEnd } = ele;

		const [newValue, offset1, offset2] = func(value, selectionStart, selectionEnd);
		ele.focus();

		// When the value is updated in the dom
		ele.addEventListener(
			'selectionchange',
			() => ele && ele.setSelectionRange(selectionStart + offset1, selectionEnd + offset2),
			{ once: true }
		);
		return newValue;
	}
</script>

<script lang="ts">
	import { type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';
	import Line from './Area/Line.svelte';
	import Inner from './Area/Inner.svelte';
	import Markdown from '../markdown/Markdown.svelte';
	import {
		insertBold,
		insertHeading,
		insertItalic,
		insertLink,
		type InsertionFunc
	} from '$lib/utils/markdown/generate';
	import { i } from '$lib/i18n/store';
	import Store from '../utils/Store.svelte';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let markdown = false;

	export let value: string = '';

	export let isValid: boolean | null = null;
	export let rows = 2;
	let ele: HTMLTextAreaElement | undefined;

	let viewMode: 'edit' | 'preview' = 'edit';
</script>

<Frame>
	<div class="flex w-full flex-col items-stretch gap-2">
		{#if markdown}
			<Line
				bind:viewMode
				on:heading={() => {
					if (!ele) return;
					value = handleMarkdownInsertion(ele, value, insertHeading);
				}}
				on:bold={() => {
					if (!ele) return;
					value = handleMarkdownInsertion(ele, value, insertBold);
				}}
				on:italic={() => {
					if (!ele) return;
					value = handleMarkdownInsertion(ele, value, insertItalic);
				}}
				on:link={() => {
					if (!ele) return;
					value = handleMarkdownInsertion(ele, value, insertLink);
				}}
			/>
		{/if}

		<hr class="h-1 w-full border-zinc-300 dark:border-zinc-700" />

		{#if viewMode === 'edit'}
			<Inner
				bind:ele
				{placeholder}
				{icon}
				{isValid}
				{rows}
				bind:value
				on:input
				on:keydown={(e) => {
					const { key, ctrlKey } = e;

					if (!ele) return;
					if (!ctrlKey) return;

					switch (key) {
						case 'b':
							e.preventDefault();
							value = handleMarkdownInsertion(ele, value, insertBold);
							return;
						case 'i':
							e.preventDefault();
							value = handleMarkdownInsertion(ele, value, insertItalic);
							return;
						case 'l':
							e.preventDefault();
							value = handleMarkdownInsertion(ele, value, insertLink);
							return;
						case 'h':
							e.preventDefault();
							value = handleMarkdownInsertion(ele, value, insertHeading);
							return;
						default:
							console.log(key);
					}
				}}
			>
				<slot slot="pre-validator" name="pre-validator" />
				<slot slot="post-validator" name="post-validator" />
			</Inner>
		{:else if viewMode === 'preview'}
			{#if value.trim() === ''}
				<span class="w-full text-center text-gray-600 dark:text-gray-400">
					<Store store={i('markdownpreview.noPreview')} />
				</span>
			{:else}
				<Markdown markdown={value} />
			{/if}
		{/if}
	</div>
</Frame>
