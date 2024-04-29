<script>
	import Creator from './Creator.svelte';
	import Contact from './Contact.svelte';
	import Links from './Links.svelte';
	import { network } from 'nutzlich';
	import { navHeight } from '$lib/stores';

	const net = network();
</script>

<footer
	class="flex flex-col gap-4 bg-emerald-400 px-3 py-2 pb-[--nav-h] sm:pb-2 dark:bg-emerald-800"
	style:--nav-h={`${$navHeight + 20}px`}
>
	<div class="flex w-full flex-col gap-4 md:flex-row">
		<Creator />
		{#if $net.isOnline}
			<Contact />
		{/if}
	</div>
	<Links />
</footer>
