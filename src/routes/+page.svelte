<script>
	import { svocal } from '$lib/utils/store/svocal';

	const lang = svocal('i18n.currentlang');
</script>

<h1>Dlool</h1>

<button
	on:click={() => {
		lang.update((old) => (old === 'de' ? 'en' : 'de'));
	}}
>
	{$lang}
</button>
