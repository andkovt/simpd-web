<script lang="ts">
    import type { Mount } from "../../types";
    import Fa from 'svelte-fa';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
	import PathInput from "../PathInput.svelte";

    export let mount : Mount;
    export let onRemove: any;

    const onRemoveClick = () => {
        onRemove(mount);
    };
</script>

<div class="flex gap-2 py-2">
    <div class="form-control grow">
        <label class="label" for="source">Source</label>
        <PathInput value={mount.source}/>
    </div>
    <div class="form-control grow">
        <label class="label" for="destintation">Destination</label>
        <input class="input" bind:value="{mount.destination}">
    </div>
    <div class="form-control">
        <label class="label" for="mode">Mode</label>
        <select class="select" bind:value={mount.mode}>
            <option>ReadOnly</option>
            <option>ReadWrite</option>
        </select>
    </div>
    <div class="form-control pl-6">
        <button class="pt-14 text-error" on:click={onRemoveClick}>
            <Fa icon={faClose}/>
        </button>
    </div>
</div>