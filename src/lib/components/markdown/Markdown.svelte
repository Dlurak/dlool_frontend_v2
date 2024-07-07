<script lang="ts">
	import { generateAst } from '$lib/utils/markdown/parse';
	import Node from './Node.svelte';

	export let markdown: string;

	const ast = generateAst(markdown);
</script>

{#each ast.children as node}
	<Node {node} {markdown} />
{/each}
