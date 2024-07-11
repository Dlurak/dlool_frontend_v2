<script lang="ts">
	export let active = false;
</script>

<button
	class="rounded px-1.5 py-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-700"
	class:bg-zinc-300={active}
	class:dark:bg-zinc-700={active}
	on:click
>
	<slot />
</button>
