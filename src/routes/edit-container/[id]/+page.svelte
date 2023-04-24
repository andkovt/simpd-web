<script lang="ts">
    import {page} from '$app/stores';
	import { onMount } from 'svelte';
	import type { Container } from '../../../types';
    import { env } from '$env/dynamic/public';
    import flashManager from '$lib/flash-manager';
	import ContainerEdit from '../../../components/ContainerEdit.svelte';

    console.log($page.params);

    const containerId = $page.params.id;
    let container: Container|null = null;

    onMount(async () => {
        const response = await fetch(`${env.PUBLIC_BACKEND}/containers/${containerId}`);

        if (!response.ok) {
            flashManager.add({message: 'Error editing container', type: 'error'});
        };

        container = await response.json();
    })
</script>
{#if container}
    <ContainerEdit container="{container}" />
{/if}