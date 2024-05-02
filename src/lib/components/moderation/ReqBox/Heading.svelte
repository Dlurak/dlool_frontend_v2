<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import type { JoinReq } from '$lib/dlool/moderation/own';
	import { i } from '$lib/i18n/store';

	export let req: JoinReq | ForeignReq;
</script>

<div
	class="w-full rounded px-4 py-2 text-center text-xl font-semibold"
	class:bg-red-500={req.status === 'Rejected'}
	class:bg-green-500={req.status === 'Accepted'}
	class:bg-blue-500={req.status === 'Pending'}
>
	<Store store={i(`moderation.state.${req.status}`)} />
</div>
