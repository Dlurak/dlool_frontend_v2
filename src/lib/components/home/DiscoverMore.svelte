<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { Icon, VideoCamera } from 'svelte-hero-icons';
	import { Github, Mastodon } from 'svelte-bootstrap-icons';
	import { links } from '$lib/constants/home/links';
</script>

<section class="pt-5 print:hidden">
	<div class="flex items-center gap-2 py-3">
		<span class="h-0.5 w-full rounded-full bg-gradient-to-r from-transparent to-gray-600" />
		<span class="whitespace-nowrap"><Store store={i('home.more')} /></span>
		<span class="h-0.5 w-full rounded-full bg-gradient-to-l from-transparent to-gray-600" />
	</div>
	<div class="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-4">
		{#each links as link}
			<a href={link.href} class="flex flex-col items-center justify-center gap-1">
				<span class="h-8 w-8 text-black dark:text-white">
					{#if link.icon === 'github'}
						<Github class="h-8 w-8" />
					{:else if link.icon === 'mastodon'}
						<Mastodon class="h-8 w-8" />
					{:else if link.icon === 'cam'}
						<Icon src={VideoCamera} solid class="h-8 w-8" />
					{/if}
				</span>
				<Store store={i(link.text)} />
			</a>
		{/each}
	</div>
</section>
