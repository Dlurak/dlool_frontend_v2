<script>
	import Footer from '$lib/components/layout/footer/Footer.svelte';
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import ToastContainer from '$lib/components/layout/toasts/ToastContainer.svelte';
	import '../app.css';
</script>

<div class="flex min-h-[100dvh] w-full flex-col justify-between">
	<Navbar />
	<main class="flex w-full flex-col items-center px-3 py-3">
		<slot />
	</main>
	<Footer />

	<ToastContainer />
</div>
