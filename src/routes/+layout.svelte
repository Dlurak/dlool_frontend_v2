<script>
	import Token from '$lib/components/layout/Token.svelte';
	import UserInfo from '$lib/components/layout/UserInfo.svelte';
	import Confirmation from '$lib/components/layout/confirmation/Confirmation.svelte';
	import Footer from '$lib/components/layout/footer/Footer.svelte';
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import ToastContainer from '$lib/components/layout/toasts/ToastContainer.svelte';
	import '../app.css';
</script>

<div class="flex min-h-[100dvh] w-full flex-col items-stretch justify-between">
	<Navbar />
	<main class="flex w-full flex-col items-center px-3 py-3">
		<slot />
	</main>

	<Footer />

	<Token />
	<UserInfo />
	<ToastContainer />
	<Confirmation />
</div>
