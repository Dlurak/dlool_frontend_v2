<script lang="ts" context="module">
	type Type = 'heading' | 'bold' | 'italic' | 'link';

	// TODO: Finish this function once svelte-hero-icons has more icons
	// https://github.com/JustinVoitel/svelte-hero-icons/issues/35
	function getIcon(type: Type): IconSource {
		switch (type) {
			case 'heading':
			case 'bold':
			case 'italic':
			case 'link':
				return Link;
		}
	}
</script>

<script lang="ts">
	import { Icon, Link, type IconSource } from 'svelte-hero-icons';

	export let type: Type;
</script>

<button>
	<Icon src={getIcon(type)} />
</button>
