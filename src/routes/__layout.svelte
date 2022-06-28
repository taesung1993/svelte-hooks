<script lang=ts context=module>
    import type {Load} from '@sveltejs/kit';
    export const load: Load = async ({ stuff
, url}) => {
        return {}
    }
</script>

<script lang=ts>

</script>

<slot></slot>

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