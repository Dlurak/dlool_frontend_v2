<script>
	import Token from '$lib/components/layout/Token.svelte';
	import UserInfo from '$lib/components/layout/UserInfo.svelte';
	import Confirmation from '$lib/components/layout/confirmation/Confirmation.svelte';
	import Footer from '$lib/components/layout/footer/Footer.svelte';
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import ToastContainer from '$lib/components/layout/toasts/ToastContainer.svelte';
	import { mediaQuery } from 'nutzlich';
	import { navHeight, footerHeight } from '$lib/stores';
	import '../app.css';
	import Launcher from '$lib/components/layout/launcher/Launcher.svelte';
	import Title from '$lib/components/layout/Title.svelte';

	const isBig = mediaQuery('(min-width: 640px)');

	$: accessiourHeight = $isBig ? $navHeight + $footerHeight : $footerHeight;
</script>

<div class="flex min-h-[100dvh] w-full flex-col items-stretch justify-between">
	<Navbar />
	<main
		class="flex h-full min-h-[--h] w-full flex-col items-center px-3 py-3 outline"
		style:--h={`calc(100dvh - ${accessiourHeight}px)`}
	>
		<slot />
	</main>

	<Footer />

	<Token />
	<UserInfo />
	<ToastContainer />
	<Confirmation />
	<Launcher />
	<Title />
</div>
