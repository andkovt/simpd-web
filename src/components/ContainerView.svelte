<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Container } from "../types";
	import Button from "./Button.svelte";

    export let container: Container;
    export let onDeleteClick: any;

    const deleteClicked = () => {
        onDeleteClick(container);
    }

    const editClicked = () => {
        goto(`/edit-container/${container.id}`);
    }

</script>

<div class="p-2 border-b flex justify-between items-center">
    <div class="flex flex-col">
        <span>{container.name}</span>
        <span class="text-sm">{container.image}</span>
    </div>
    <div>
        <!-- Mounts -->
    </div>
    <div>
        <Button name="Edit" small={true} icon="faEdit" onClick="{editClicked}"/>
        <Button name="Delete" small={true} type="error" icon="faTrash" onClick="{deleteClicked}" />
    </div>
</div>