<script lang="ts" context="module">
	type Type = 'heading' | 'bold' | 'italic' | 'link';

	function getIcon(type: Type) {
		switch (type) {
			case 'heading':
				return H3;
			case 'bold':
				return Bold;
			case 'italic':
				return Italic;
			case 'link':
				return Link;
		}
	}
</script>

<script lang="ts">
	import { Icon, Link, H3, Bold, Italic } from 'svelte-hero-icons';

	export let type: Type;
</script>

<button class="aspect-square rounded-sm p-0.5 hover:bg-zinc-300 hover:dark:bg-zinc-700" on:click>
	<Icon src={getIcon(type)} class="h-5 w-5" />
</button>
