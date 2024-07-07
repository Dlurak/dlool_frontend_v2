<script lang="ts">
	import { getAtPos } from '$lib/utils/markdown/getAtPos';
	import type { Node } from './types';

	export let node: Node;
	export let markdown: string;
	export let ind = 0;
</script>

{#if node.type === 'text'}
	{node.value}
{:else if node.type === 'image'}
	<img src={node.url} alt={node.alt} title={node.title} />
{:else if node.type === 'paragraph'}
	<p>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} />
		{/each}
	</p>
{:else if node.type === 'emphasis'}
	<em>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} />
		{/each}
	</em>
{:else if node.type === 'strong'}
	<b>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} />
		{/each}
	</b>
{:else if node.type === 'link'}
	<a href={node.url} title={node.title}>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} />
		{/each}
	</a>
{:else if node.type === 'inlineCode'}
	<code>
		{node.value}
	</code>
{:else if node.type === 'break'}
	<br />
{:else if node.type === 'heading'}
	{@const { depth, children } = node}
	{#if depth === 1}
		<h1>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h1>
	{:else if depth === 2}
		<h2>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h2>
	{:else if depth === 3}
		<h3>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h3>
	{:else if depth === 4}
		<h4>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h4>
	{:else if depth === 5}
		<h5>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h5>
	{:else if depth === 6}
		<h6>
			{#each children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</h6>
	{/if}
{:else if node.type === 'blockquote'}
	<blockquote class="flex gap-1">
		<div class="h-full w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />

		<div>
			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</div>
	</blockquote>
{:else if node.type === 'list'}
	{#if node.ordered}
		<ol class="list-outside list-decimal pl-5">
			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</ol>
	{:else}
		<ul class="list-outside list-disc pl-5">
			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</ul>
	{/if}
{:else if node.type === 'listItem'}
	<li>
		<span class="flex items-center gap-2">
			{#if node.checked !== null && node.checked !== undefined}
				<input
					type="checkbox"
					checked={node.checked}
					class="inline-block h-3 w-3 appearance-none rounded-sm outline outline-1 outline-zinc-300 checked:bg-emerald-400 checked:outline-none"
					disabled
				/>
			{/if}

			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</span>
	</li>
{:else if node.type === 'thematicBreak'}
	<hr class="border-zinc-200 dark:border-zinc-800" />
{:else if node.type === 'code'}
	<code lang={node.lang}>
		{node.value}
	</code>
{:else if node.type === 'table'}
	<table>
		<thead>
			{#each node.children.slice(0, 1) as childNode}
				<svelte:self node={childNode} {markdown} ind={0} />
			{/each}
		</thead>
		<tbody>
			{#each node.children.slice(1) as childNode}
				<svelte:self node={childNode} {markdown} ind={1} />
			{/each}
		</tbody>
	</table>
{:else if node.type === 'tableRow'}
	<tr>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} {ind} />
		{/each}
	</tr>
{:else if node.type === 'tableCell'}
	{#if ind === 0}
		<th>
			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</th>
	{:else}
		<td>
			{#each node.children as childNode}
				<svelte:self node={childNode} {markdown} />
			{/each}
		</td>
	{/if}
{:else if node.type === 'delete'}
	<s>
		{#each node.children as childNode}
			<svelte:self node={childNode} {markdown} />
		{/each}
	</s>
{:else if node.position}
	{getAtPos(markdown, node.position)}
{/if}
