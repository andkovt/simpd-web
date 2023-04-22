<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../../components/Button.svelte";
    import ContainerEdit from "../../components/ContainerEdit.svelte";
    import type { Container } from "../../types";
    import { v4 as uuidv4 } from 'uuid';

    let container: Container = {
        id: uuidv4(),
        name: '',
        image: '',
        
        mounts: [],
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
        console.log(response);
        containerEditElement.setBackendErrors(response.errors);
    };
</script>
<section>
    <ContainerEdit bind:container={container} bind:this={containerEditElement}/>
    <div class="flex justify-end p-5">
        <Button name="Save" icon="faSave" type="primary" onClick={onSaveClick} />
    </div>
</section>