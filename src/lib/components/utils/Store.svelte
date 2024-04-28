<script lang="ts">
	import type { Readable } from 'svelte/store';

	export let store: Readable<unknown>;
</script>

<!--
@component
## Store

Render a readable store directly.
If possible use `$store`
-->

{$store}
