<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { userStore } from "$lib/stores";
    import type { User, Story } from "$lib/types";

    export let data;
    let user: User = data.user;
    let likes: Story = data.likes;
    let saved: Story = data.saved;
</script>

<div class="container mx-auto">
    <div class="flex justify-start gap-10">
        <Avatar src={PUBLIC_BACKEND_URL + user.avatar}></Avatar>
        <h3>{user.username}</h3>
    </div>
</div>