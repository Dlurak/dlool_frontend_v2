<script>
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
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
				<li><Store store={i('home.homeworkBut.collaborative.1')} /></li>
				<li><Store store={i('home.homeworkBut.collaborative.2')} /></li>
				<li><Store store={i('home.homeworkBut.collaborative.3')} /></li>
				<li><Store store={i('home.homeworkBut.collaborative.4')} /></li>
				<li><Store store={i('home.homeworkBut.collaborative.5')} /></li>
			</ul>
		</div>
		<div>
			<h3>
				<GradientText>
					<Store store={i('home.homeworkBut.convenient')} />
				</GradientText>
			</h3>
			<ul>
				<li><Store store={i('home.homeworkBut.convenient.1')} /></li>
				<li><Store store={i('home.homeworkBut.convenient.2')} /></li>
				<li><Store store={i('home.homeworkBut.convenient.3')} /></li>
				<li><Store store={i('home.homeworkBut.convenient.4')} /></li>
				<li><Store store={i('home.homeworkBut.convenient.5')} /></li>
			</ul>
		</div>
		<div>
			<h3>
				<GradientText>
					<Store store={i('home.homeworkBut.free')} />
				</GradientText>
			</h3>
			<ul>
				<li><Store store={i('home.homeworkBut.free.1')} /></li>
				<li><Store store={i('home.homeworkBut.free.2')} /></li>
				<li><Store store={i('home.homeworkBut.free.3')} /></li>
				<li><Store store={i('home.homeworkBut.free.4')} /></li>
			</ul>
		</div>
	</div>
</section>
