<script lang="ts">
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import type { JoinReq } from '$lib/dlool/moderation/own';
	import Reviewer from './Reviewer.svelte';
	import Heading from './Heading.svelte';
	import Classline from './ClassLine.svelte';

	export let req: JoinReq | ForeignReq;
</script>

<div class="rounded-md p-2 outline outline-2 outline-gray-500">
	<Heading {req} />
	<Classline {req} />

	<slot name="userDetails" />

	<Reviewer {req} />

	<slot name="bottom" />
</div>
