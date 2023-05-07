<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Container } from "../../types";
	import Button from "../common/Button.svelte";

    export let container: Container;

    interface ContainerEventHandler {
        (container: Container): void;
    }

    export let onDelete: ContainerEventHandler;
    export let onToggleState: ContainerEventHandler;

    const editClicked = () => {
        goto(`/edit-container/${container.id}`);
    }
</script>

<tr>
    <td class="flex flex-col">
        <span>{container.name}</span>
        <span class="text-sm">{container.image}</span>
    </td>

    <td>
        <ul>
            {#each container.mounts as mount}
                <li><span class="text-sm">{mount.source}:{mount.destination}</span></li>
            {/each}
        </ul>
    </td>

    <td>
        <ul>
            {#each container.ports as port}
                <li><span class="text-sm">{port.host}:{port.container}</span></li>
            {/each}
        </ul>
    </td>

    <td>
        <ul>
            {#each container.environmentVariables as variable}
                <li><span class="text-sm">{variable.name}-{variable.value}</span></li>
            {/each}
        </ul>
    </td>

    <td class="flex flex-col">
        <span>{container.state}</span>
        <span class="text-sm">{container.status}</span>
    </td>

    <td class="text-right">
        {#if container.state === 'running'}
            <Button name="Stop" small={true} type="error" icon="faStop" onClick={() => onToggleState(container)} />
        {:else}
            <Button name="Start" small={true} type="success" icon="faPlay" onClick={() => onToggleState(container)}/>
        {/if}
        <Button name="Edit" small={true} icon="faEdit" onClick="{editClicked}"/>
        <Button name="Delete" small={true} type="error" icon="faTrash" onClick="{() => onDelete(container)}" />
    </td>
</tr>