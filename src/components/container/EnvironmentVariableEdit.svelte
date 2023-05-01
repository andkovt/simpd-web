<script lang="ts">
    import type { EnvironmentVariable } from "../../types";
    import Fa from 'svelte-fa';
    import { faClose } from '@fortawesome/free-solid-svg-icons';

    export let variable: EnvironmentVariable;
    export let onRemove: any;

    export const onRemoveClick = () => {
        onRemove(variable);
    }
</script>

<div class="flex gap-2 py-2">
    <div class="form-control grow">
        <label class="label" for="host">Name</label>
        <input class="input" bind:value="{variable.name}">
    </div>
    <div class="form-control grow">
        <label class="label" for="container">Value</label>
        <input class="input" bind:value="{variable.value}">
    </div>
    <div class="form-control pl-6 text-error">
        <button class="pt-14" on:click={onRemoveClick}>
            <Fa icon={faClose}/>
        </button>
    </div>
</div>