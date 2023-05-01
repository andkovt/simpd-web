<script lang="ts">
    import {page} from '$app/stores';
	import { onMount } from 'svelte';
	import type { Container } from '../../../types';
    import { env } from '$env/dynamic/public';
	import ContainerEdit from '../../../components/container/ContainerEdit.svelte';
	import Button from '../../../components/common/Button.svelte';
	import { goto } from '$app/navigation';
    import notificationManager from '$lib/notification-manager';

    const containerId = $page.params.id;
    let container: Container|null = null;

    let editComponent: ContainerEdit|null;

    onMount(async () => {
        const response = await fetch(`${env.PUBLIC_BACKEND}/containers/${containerId}`);

        if (!response.ok) {
            notificationManager.add('Error fetching container', 'error');
        };

        container = await response.json();
    });

    const onSaveClick = async () => {
        if (editComponent === null) {
            console.error('Edit componenent is null. Aborting');
            return;
        }

        const isValid = editComponent.validate();
        if (!isValid) {
            console.log('Component did not pass validation');
            return;
        }

        const response = await fetch(`${env.PUBLIC_BACKEND}/containers/${containerId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(container),
        });

        if (!response.ok) {
            notificationManager.add('Error updating container', 'error');
            return;
        }

        notificationManager.add('Container updated', 'success');
        goto('/');
    };
</script>
{#if container}
<div class="flex justify-between border-b border-base-300 p-2">
    <div class="flex gap-1">
        <Button name="Back" icon="faArrowLeft" onClick="{() => goto('/')}" />
    </div>
    <div class="flex gap-1">
        <Button name="Save" icon="faSave" type="primary" onClick={onSaveClick}/>
    </div>
</div>
    <ContainerEdit container="{container}" bind:this={editComponent} />
{/if}