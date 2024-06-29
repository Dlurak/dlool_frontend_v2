<script>
	import { browser } from '$app/environment';
	import { animationLength } from '$lib/utils/store/animation';

	animationLength.subscribe((le) => {
		if (!browser) return;

		document.documentElement.style.setProperty('--transition-duration', `${le}ms`);
	});
</script>
