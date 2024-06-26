<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import CreateAssignmentInner, { type CreationPayload } from './CreateAssignmentInner.svelte';
	import { createEventDispatcher } from 'svelte';

	export let school: string;
	export let allowedClasses: string[];

	let showModal = false;

	const dispatch = createEventDispatcher<{
		submit: CreationPayload;
	}>();
</script>

<PrimaryButton
	on:click={() => {
		showModal = !showModal;
	}}
>
	<Store store={i('assignments.create')} />
</PrimaryButton>

<Modal bind:isOpen={showModal}>
	<div slot="title">
		<Store store={i('assignments.create')} />
	</div>

	<svelte:fragment slot="body">
		<CreateAssignmentInner
			{school}
			{allowedClasses}
			on:submit={({ detail }) => {
				showModal = false;
				dispatch('submit', detail);
			}}
		/>
	</svelte:fragment>
</Modal>
