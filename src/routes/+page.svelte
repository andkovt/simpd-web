<script lang="ts">
	import { onMount } from "svelte";
	import type { Container } from "../types";
	import ContainerView from "../components/container/ContainerView.svelte";
	import { env } from '$env/dynamic/public';
	import Button from "../components/common/Button.svelte";
	import { goto } from "$app/navigation";
	import notificationManager from "$lib/notification-manager";
	
	let containers: Container[] = [];
	let loaded: boolean = false;

	onMount(async () => {
		try {
			const response = await fetch(`${env.PUBLIC_BACKEND}/containers`);
			const body = await response.json()
			containers = body;
			loaded = true;
		} catch(e) {
			notificationManager.add('Unable to connect to the backend', 'error');
		}
	});

	const onDeleteClick = async (container: Container) => {
		try {
			console.log('what');
			const response = await fetch(`${env.PUBLIC_BACKEND}/containers/${container.id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				var indexOf = containers.indexOf(container);
				containers.splice(indexOf, 1);
				containers = containers;

				return;
			}

			notificationManager.add('Unknown error deleting container', 'error');
		} catch (e) {
			console.log(e);
		}
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if loaded}
		<div class="flex justify-between border-b border-base-300 p-2">
			<div class="flex gap-1">
				<Button name="Add" icon="faPlus" type="primary" onClick="{() => goto('/create-container')}" />
			</div>
		</div>
		{#each containers as container}
			<ContainerView container={container} onDeleteClick={onDeleteClick} />
		{/each}
	{/if}
</section>