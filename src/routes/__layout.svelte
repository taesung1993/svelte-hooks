

<script lang=ts>
    import Header from '$lib/components/UI/toast/header/Header.svelte';
    import ToastNavigator from '$lib/components/UI/toast/Navigator.svelte';
</script>
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