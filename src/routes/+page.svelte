<script>
	import Top from '$lib/components/home/Top.svelte';
	import Boxes from '$lib/components/home/Boxes.svelte';
	import HomeworkBut from '$lib/components/home/HomeworkBut.svelte';
	import DiscoverMore from '$lib/components/home/DiscoverMore.svelte';
	import { i } from '$lib/i18n/store';
	import MetaData from '$lib/components/utils/MetaData.svelte';
</script>

<MetaData title={i('title')} />

<div class="max-w-[min(80rem,95%)]">
	<Top />
	<Boxes />
	<HomeworkBut />
	<DiscoverMore />
</div>
