<script lang="ts">
	import { title } from '$lib/stores';

	let t = $title;
</script>

<svelte:head>
	<title>{t ? `${$t} | Dlool` : 'Dlool'}</title>
</svelte:head>
