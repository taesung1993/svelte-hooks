<script lang=ts context=module>
    import type {Load} from '@sveltejs/kit';
    export const load: Load = async (event) => {
        const {session, url: {pathname}}: any = event;
        const isAuthenticated = session.user && session.user.authenticated;

        console.log(pathname);

        if(isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
            return {
                status: 302,
                redirect: '/'
            }
        }

        if (isAuthenticated || (pathname === '/sign-in' || pathname === '/sign-up')) {
            return {};
        }

        return {
            status: 302,
            redirect: '/sign-up'
        }
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