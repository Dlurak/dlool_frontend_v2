<script lang="ts">
	export let disabled = false;
</script>

<div
	class="flex w-full items-center gap-2 rounded px-2 py-2 outline outline-2 outline-gray-400 focus-within:outline-emerald-500"
	class:outline-red-500={disabled}
>
	<slot />
</div>
