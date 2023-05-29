<script lang="ts">
	import type { Container } from "../../types";
	import ContainerListItem from "./ContainerListItem.svelte";

    interface ContainerEventHandler {
        (container: Container): void;
    }

    export let containers: Container[];
    export let onDelete: ContainerEventHandler;
    export let onToggleState: ContainerEventHandler;
</script>

<table class="table w-full">
    <tr>
        <th>Name</th>
        <th>Mounts</th>
        <th>Ports</th>
        <th>Variables</th>
        <th>Status</th>
        <th></th>
    </tr>
    {#each containers as container}
        <ContainerListItem container={container} onDelete={onDelete} onToggleState={onToggleState} />
    {/each}
</table>