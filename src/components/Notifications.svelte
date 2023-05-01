<script lang="ts">
	import Notification from "./Notification.svelte";
    import { notifications } from "$lib/stores";
    import notificationManager from "$lib/notification-manager";

    const onCloseHandler = (id: string) => {
        notificationManager.remove(id);
    };
</script>

<div class="absolute right-0 bottom-0 flex flex-col gap-2 p-2">
    {#each $notifications as notification}
        <Notification onClose={onCloseHandler} id={notification.id} type={notification.type}>{notification.message}</Notification>
    {/each}
</div>