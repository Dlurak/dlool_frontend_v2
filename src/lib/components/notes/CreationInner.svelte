<script lang="ts">
	import type { Note } from '$lib/dlool/notes/list';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import NotTyppable from '../select/NotTyppable.svelte';
	import { capitalize } from '$lib/utils/strings/case';
	import TextArea from '../input/TextArea.svelte';
	import TextInput from '../input/Text.svelte';
	import { priorities } from '$lib/constants/priorities';

	export let title = '';
	export let summary = '';
	export let priority: Note['priority'] | null = null;
	export let editScope: Note['editScope'] | null = null;

	const scopes = ['self', 'class', 'school'] as const;
</script>

<h4><Store store={i('note.title')} /></h4>
<TextInput placeholder={i('note.title.placeholder')} bind:value={title} />

<h4><Store store={i('note.summary')} /></h4>
<TextArea placeholder={i('note.summary.placeholder')} bind:value={summary} />

<h4><Store store={i('note.priority')} /></h4>
<NotTyppable
	options={priorities.map((prio) => ({
		label: i(`note.priority.${prio}`),
		value: capitalize(prio)
	}))}
	bind:value={priority}
/>

<h4><Store store={i('note.scope')} /></h4>
<NotTyppable
	options={scopes.map((sc) => ({
		label: i(`note.scope.${sc}`),
		value: capitalize(sc)
	}))}
	bind:value={editScope}
/>
