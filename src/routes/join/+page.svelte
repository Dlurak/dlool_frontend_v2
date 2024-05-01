<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { listClasses, type Class } from '$lib/dlool/classList';
	import { listSchools, type School } from '$lib/dlool/schoolList';
	import { i } from '$lib/i18n/store';
	import { useAuth } from '$lib/utils/store/auth';
	import { readable } from 'svelte/store';
	import Store from '$lib/components/utils/Store.svelte';
	import { AcademicCap, BuildingLibrary } from 'svelte-hero-icons';
	import { createSchool } from '$lib/dlool/school/create';
	import { createClass } from '$lib/dlool/classes/create';
	import { joinClass } from '$lib/dlool/join';
	import { sendToast } from '$lib/components/layout/toasts';

	const { isLoggedIn } = useAuth();

	let schoolInput = '';
	let schools: School[] = [];

	let classInput = '';
	let classes: Class[] = [];

	let isDisabled = false;
</script>

<div
	class="flex w-[min(100%,28rem)] flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400"
>
	{#if $isLoggedIn}
		<h4 class="text-center">Join a class</h4>

		<Select
			allowCustomval
			icon={BuildingLibrary}
			on:userInput={async (e) => {
				isDisabled = false;
				schools = await listSchools({
					query: e.detail
				}).then((d) => d.data);
			}}
			placeholder={i('school')}
			options={schools.map((sch) => ({
				label: readable(sch.name),
				value: sch.name
			}))}
			bind:value={schoolInput}
			threshold={0.1}
		/>
		<Select
			allowCustomval
			icon={AcademicCap}
			placeholder={i('class')}
			options={classes.map(({ name }) => ({
				label: readable(name),
				value: name
			}))}
			on:userInput={async (e) => {
				isDisabled = false;
				classes = await listClasses({
					school: schoolInput,
					query: e.detail
				}).then((d) => d.data);
			}}
			bind:value={classInput}
			threshold={0.1}
		/>

		<PrimaryButton
			disabled={!(classInput && schoolInput) || isDisabled}
			on:click={async () => {
				try {
					isDisabled = true;
					await createSchool({
						name: schoolInput.trim()
					});
					await createClass({
						school: schoolInput.trim(),
						name: classInput.trim()
					});
					const res = await joinClass({
						school: schoolInput.trim(),
						class: classInput.trim()
					});

					if (res.status === 'error') {
						const content = {
							'Request already exists': i('toast.join.requestExists'),
							'User is already in class': i('toast.join.alreadyInClass')
						}[res.error];

						sendToast({
							content,
							type: 'error',
							timeout: 5_000
						});
						return;
					}

					const content = {
						'Join request created successfully!': i('toast.join.requested'),
						'Joined class successfully!': i('toast.join.joined')
					}[res.message];

					sendToast({
						content,
						type: 'success',
						timeout: 5_000
					});
				} catch (e) {
					isDisabled = false;
					sendToast({
						type: 'error',
						content: i('error'),
						timeout: 5_000
					});
				}
			}}
		>
			<Store store={i('join.joinClass')} />
		</PrimaryButton>
	{:else}
		You need to be logged in to join a class
		<div class="text-center">
			<a href="/login">Go to login</a>
		</div>
	{/if}
</div>
