<script lang="ts">
    import type { Port } from "../../types";
    import Fa from 'svelte-fa';
    import { faClose } from '@fortawesome/free-solid-svg-icons';

    export let port : Port;
    export let onRemove: any;

    const onRemoveClick = () => {
        onRemove(port);
    };
</script>

<div class="flex gap-2 py-2">
    <div class="form-control grow">
        <label class="label" for="host">Host Port</label>
        <input class="input" bind:value="{port.host}">
    </div>
    <div class="form-control grow">
        <label class="label" for="container">Container Port</label>
        <input class="input" bind:value="{port.container}">
    </div>
    <div class="form-control">
        <label class="label" for="mode">Type</label>
        <select class="select" bind:value={port.type}>
            <option>Tcp</option>
            <option>Udp</option>
        </select>
    </div>
    <div class="form-control text-error pl-6">
        <button class="pt-14" on:click={onRemoveClick}>
            <Fa icon={faClose}/>
        </button>
    </div>
</div>