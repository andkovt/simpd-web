<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../../components/common/Button.svelte";
    import ContainerEdit from "../../components/container/ContainerEdit.svelte";
    import type { Container } from "../../types";
    import { v4 as uuidv4 } from 'uuid';

    let container: Container = {
        id: uuidv4(),
        name: '',
        image: '',
        
        mounts: [],
        ports: [],
        environmentVariables: [],
    };

    let containerEditElement: ContainerEdit;

    const onSaveClick = async () => {
        var isValid = containerEditElement.validate();
        
        if (!isValid) {
            return;
        }

        const result = await fetch('http://localhost:5051/containers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(container),
        });
        
        const response = await result.json();

        if (result.ok) {
            goto('/');
            return;
        }
        
        containerEditElement.setBackendErrors(response.errors);
    };
</script>
<section>
    <div class="flex justify-between border-b border-base-300 p-2">
        <div class="flex gap-1">
            <Button name="Back" icon="faArrowLeft" onClick="{() => goto('/')}" />
        </div>
        <div class="flex gap-1">
            <Button name="Create" icon="faPlus" type="primary" onClick={onSaveClick}/>
        </div>
    </div>
    <ContainerEdit bind:container={container} bind:this={containerEditElement}/>
</section>