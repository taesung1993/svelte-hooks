
<script lang=ts context=module>
    import type { Load } from "@sveltejs/kit";
    import { initialFirebase } from "$lib/client/firebase";
    import { browser } from "$app/env";
    export const load: Load = async () => {
        if (browser) {
            initialFirebase();
        }
        return {};
    }
</script>

<script lang=ts>
    import Header from '$lib/components/UI/toast/header/Header.svelte';
    import ToastNavigator from '$lib/components/UI/toast/Navigator.svelte';
    import { session } from "$app/stores";
</script>


{JSON.stringify($session)}
<Header/>
<slot></slot>
<ToastNavigator/>

<style lang=scss>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(html) {
        font-size: 10px;
    }
</style>