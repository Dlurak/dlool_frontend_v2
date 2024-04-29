<script>
	import { createFloatingActions } from 'svelte-floating-ui';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { useHover } from 'nutzlich';

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'top',
		middleware: [offset(3), flip(), shift()]
	});

	const [showToolip, hoverRef] = useHover();
</script>

<span use:floatingRef use:hoverRef class="w-full">
	<slot />
</span>

{#if $showToolip}
	<span
		use:floatingContent
		class="bg:outline-gray-700 absolute rounded-sm bg-zinc-300 bg-opacity-50 px-2 py-1 shadow-2xl outline outline-1 outline-gray-400 backdrop-blur-lg dark:bg-zinc-800 dark:bg-opacity-50"
	>
		<slot name="tooltip" />
	</span>
{/if}
