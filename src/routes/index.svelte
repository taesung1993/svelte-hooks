<script lang=ts context=module>
    import type {Load} from "@sveltejs/kit";
    export const load:Load = ({session}) => {
        return {
            props: {
                session
            }
        };
    }
</script>

<script lang="ts">
    export let session: any;
</script>

<style>

</style>