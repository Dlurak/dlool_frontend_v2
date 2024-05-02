<script lang="ts">
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import type { JoinReq } from '$lib/dlool/moderation/own';
	import { AcademicCap, BuildingLibrary, Icon } from 'svelte-hero-icons';

	export let req: JoinReq | ForeignReq;
</script>

<div class="flex py-3">
	<div class="flex w-full gap-1">
		<Icon src={AcademicCap} class="h-6 w-6" mini />
		{req.wantsToJoin.name}
	</div>

	<div class="flex w-full gap-1">
		<Icon src={BuildingLibrary} class="h-6 w-6" mini />
		{req.wantsToJoin.school.name}
	</div>
</div>
