<script lang=ts context=module>
    import type {Load} from '@sveltejs/kit';
    export const load: Load = async (event) => {
        const {session, url: {pathname}}: any = event;
        const isAuthenticated = session.user && session.user.authenticated;

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
            redirect: '/sign-in'
        }
    }
</script>

<script lang=ts>
    import { beforeNavigate } from '$app/navigation';
    import Header from '$lib/components/UI/toast/header/Header.svelte';
    import ToastNavigator from '$lib/components/UI/toast/Navigator.svelte';

    beforeNavigate((event) => {
        const { to, from } = event;
        window.location.href = to?.pathname || '/';
    });
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