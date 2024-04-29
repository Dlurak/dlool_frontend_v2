<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import FooterLink from './FooterLink.svelte';
	import { links } from '$lib/constants/footer/links';
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(min(24rem,100%),1fr))] gap-4">
	{#each links as group}
		<div>
			<h4 class="text-start md:text-center"><Store store={group.name} /></h4>
			<div class="flex">
				{#each group.entries as link}
					<FooterLink {...link} />
				{/each}
			</div>
		</div>
	{/each}
</div>
