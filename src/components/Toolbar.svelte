<script>
	import ToolbarButton from "./ToolbarButton.svelte";
    import { goto } from '$app/navigation';

    const addContainer = () => {
        goto('/create-container');
    };
</script>

<div class="flex justify-between border-b p-2">
    <div class="flex gap-1">
        <ToolbarButton name="Add" icon="faPlus" type="primary" onClick={addContainer}/>
    </div>
    <div class="flex gap-1">
        <ToolbarButton name="Remove" icon="faTrash" type="disabled"/>
    </div>
</div>