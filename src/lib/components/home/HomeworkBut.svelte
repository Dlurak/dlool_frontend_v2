<script>
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { range } from '$lib/utils/arrays/range';
	import GradientText from './GradientText.svelte';
</script>

<section class="pt-12">
	<h2 class="hyphens-auto"><Store store={i('home.homeworkBut')} /></h2>

	<div class="grid grid-cols-1 gap-5 text-lg md:grid-cols-2 xl:grid-cols-3">
		<div>
			<h3>
				<GradientText>
					<Store store={i('home.homeworkBut.collaborative')} />
				</GradientText>
			</h3>
			<ul>
				{#each range(1, 5) as num}
					<li><Store store={i(`home.homeworkBut.collaborative.${num}`)} /></li>
				{/each}
			</ul>
		</div>
		<div>
			<h3>
				<GradientText>
					<Store store={i('home.homeworkBut.convenient')} />
				</GradientText>
			</h3>
			<ul>
				{#each range(1, 3) as num}
					<li><Store store={i(`home.homeworkBut.convenient.${num}`)} /></li>
				{/each}
			</ul>
		</div>
		<div>
			<h3>
				<GradientText>
					<Store store={i('home.homeworkBut.free')} />
				</GradientText>
			</h3>
			<ul>
				{#each range(1, 4) as num}
					<li><Store store={i(`home.homeworkBut.free.${num}`)} /></li>
				{/each}
			</ul>
		</div>
	</div>
</section>
