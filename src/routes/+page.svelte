<script>
	import { i } from '$lib/i18n/i18n';
	import { svocal } from '$lib/utils/store/svocal';

	const lang = svocal('i18n.currentlang');

	const string = i('nav.homework', { count: 0 });
</script>

<h1>{string}</h1>

<button
	on:click={() => {
		lang.update((old) => (old === 'de' ? 'en' : 'de'));
	}}
>
	Switch
</button>
