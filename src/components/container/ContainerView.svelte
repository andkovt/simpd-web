<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Container } from "../../types";
	import Button from "../common/Button.svelte";

    export let container: Container;
    export let onDeleteClick: any;

    const deleteClicked = () => {
        onDeleteClick(container);
    }

    const editClicked = () => {
        goto(`/edit-container/${container.id}`);
    }

</script>

<div class="p-2 border-b border-base-300 flex justify-between items-center">
    <div class="flex flex-col w-20">
        <span>{container.name}</span>
        <span class="text-sm">{container.image}</span>
    </div>
    <div class="w-20 text-sm">
        <ul>
            {#each container.mounts as mount}
                <li>{mount.source}:{mount.destination}</li>
            {/each}
        </ul>
    </div>
    <div class="w-20 text-sm">
        <ul>
            {#each container.ports as port}
                <li>{port.host}:{port.container}</li>
            {/each}
        </ul>
    </div>
    <div class="w-20 text-sm">
        <ul>
            {#each container.environmentVariables as variable}
                <li>{variable.name}={variable.value}</li>
            {/each}
        </ul>
    </div>
    <div>
        Status
    </div>
    <div>
        <Button name="Edit" small={true} icon="faEdit" onClick="{editClicked}"/>
        <Button name="Delete" small={true} type="error" icon="faTrash" onClick="{deleteClicked}" />
    </div>
</div>