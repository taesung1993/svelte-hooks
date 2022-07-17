<script lang=ts context=module>
    import type {Load} from '@sveltejs/kit';
    export const load: Load = async ({ stuff, url}) => {
        console.log('load function');
        return {};
    }
</script>

<script lang=ts>
    import ToastNavigator from '$lib/components/UI/toast/Navigator.svelte';
</script>

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