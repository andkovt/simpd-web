<script lang="ts">
	import { onMount } from "svelte";
	import Toolbar from '../components/Toolbar.svelte';
	import type { Container } from "../types";
	import ContainerView from "../components/ContainerView.svelte";
	import { env } from '$env/dynamic/public';
	import flashManager from '$lib/flash-manager';
	
	let containers: Container[] = [];
	let error: string = '';

	onMount(async () => {
		try {
			const response = await fetch(`${env.PUBLIC_BACKEND}/containers`);
			const body = await response.json()
			containers = body;
		} catch(e) {
			error = 'Unable to connect to the backend';
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

			flashManager.add({message: 'Unknown error deleting the container', type: 'error'});
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
	{#if error}
		<div class="text-red-500">{error}</div>
	{:else}
		<Toolbar/>
		{#each containers as container}
			<ContainerView container={container} onDeleteClick={onDeleteClick} />
		{/each}
	{/if}
</section>