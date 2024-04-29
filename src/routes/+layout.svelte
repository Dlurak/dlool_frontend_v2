<script>
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import '../app.css';
</script>

<div class="min-h-[100dvh] w-full">
	<Navbar />
	<main class="flex w-full flex-col items-center px-3">
		<slot />
	</main>
</div>
