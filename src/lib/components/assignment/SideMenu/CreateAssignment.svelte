<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import CreateAssignmentInner from './CreateAssignmentInner.svelte';

	export let school: string;
	export let allowedClasses: string[];

	let showModal = false;
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
		<CreateAssignmentInner {school} {allowedClasses} on:submit />
	</svelte:fragment>
</Modal>
