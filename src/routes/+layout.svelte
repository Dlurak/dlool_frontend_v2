<script>
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import '../app.css';
</script>

<div class="min-h-[100dvh]">
	<Navbar />
	<main class="px-3">
		<slot />
	</main>
</div>
