<script lang="ts">
	export let disabled = false;
	export let minimal = false;
</script>

<div
	class="flex w-full items-stretch gap-2 rounded px-2 py-2 outline focus-within:outline-emerald-500"
	class:outline-red-500={disabled}
	class:outline-1={minimal}
	class:outline-zinc-300={minimal}
	class:dark:outline-zinc-700={minimal}
	class:dark:outline-zinc-500={!minimal}
	class:outline-2={!minimal}
	class:outline-zinc-400={!minimal}
>
	<slot />
</div>
