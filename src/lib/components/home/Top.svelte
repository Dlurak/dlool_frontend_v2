<script>
	import Store from '$lib/components/utils/Store.svelte';
	import { Github } from 'svelte-bootstrap-icons';
	import { i } from '$lib/i18n/store';
	import GradientText from './GradientText.svelte';

	const logoAlt = i('home.logo.alt');
</script>

<section
	class="print:margin-0 grid break-after-page grid-cols-1 py-10 lg:grid-cols-[2fr,1fr] lg:py-24 print:p-0"
>
	<div class="flex flex-col justify-center gap-3">
		<h1 class="hyphens-auto break-words text-4xl leading-tight lg:text-5xl">
			<span class="text-5xl lg:text-6xl">
				<GradientText>Dlool</GradientText>
			</span><br />
			<Store store={i('home.subtitle')} />
		</h1>
		<h2 class="hyphens-auto text-2xl text-gray-500 lg:text-3xl">
			<Store store={i('home.digitalEra')} />
		</h2>

		<div class="flex flex-wrap gap-4 py-2 text-lg print:hidden">
			<!--
			<a
				href="/documentation/getting-started"
				class="text-light-text dark:text-dark-text rounded-full bg-emerald-500 px-4 py-1 shadow-md"
			>
				<Store store={i('home.quick.getStarted')} />
			</a>
			<a
				href="#why"
				class="text-light-text dark:text-dark-text rounded-full border px-4 py-1 shadow-md"
			>
				<Store store={i('home.quick.why')} />
			</a>
			-->
			<a
				href="https://github.com/Dlurak/dloolFrontend_v2"
				class="text-light-text dark:text-dark-text flex items-center gap-1 rounded-full border px-4 py-1 shadow-md"
			>
				<Github />
				<Store store={i('home.quick.github')} />
			</a>
		</div>
	</div>

	<div class="hidden p-10 lg:block xl:p-14">
		<div class="rounded-full shadow-2xl shadow-green-500 print:shadow-none">
			<img src="/assets/logo.svg" alt={$logoAlt} />
		</div>
	</div>
</section>
