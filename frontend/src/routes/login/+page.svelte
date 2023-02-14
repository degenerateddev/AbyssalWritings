<script lang="ts">
    import { focusTrap } from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
</script>

<div class="container h-full mx-auto flex justify-center items-center" use:focusTrap={true}>
	<div class="space-y-10">
		<h2 class="font-bold">Login</h2>

        <form method="POST" action="?/login" class="space-y-5">
            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-divider"><Icon icon="mdi:user-circle"></Icon></div>
                <input type="text" name="username" placeholder="Username" />
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-divider"><Icon icon="mdi:password"></Icon></div>
                <input type="password" name="password" placeholder="Password" />
            </div>

            <div class="input-group">
                <button class="btn variant-ringed-primary w-full">
                    <span>Login</span>
                    <span><Icon icon="ri:login-circle-line"></Icon></span>
                </button>
            </div>
        </form>
	</div>
</div>