<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let icon: IconSource;
</script>

<tr>
	<td class="px-2">
		<Icon src={icon} class="h-6 w-6" small />
	</td>
	<td>
		<slot />
	</td>
</tr>
