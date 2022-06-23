import type { GetSession, Handle } from "@sveltejs/kit"
import * as cookie from 'cookie';

export const handle: Handle = async ({event, resolve}) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const locals: any = event.locals;
    locals.user = cookies;

    if(!cookies['session_id']) {
        locals.user.authenticated = false;
    } else {
        locals.user.authenticated = true;
    }

    const response = await resolve(event); // create responst

    return response;
}; 

export const getSession: GetSession = (request) => {
    const user = (request.locals as any).user;

    if(!user.session_id) {
        return {};
    }

    return {
        user
    }
}