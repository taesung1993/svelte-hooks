import type { GetSession, Handle } from "@sveltejs/kit"
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import * as cookie from 'cookie';
import { decodeToken } from "$lib/server/firebase";

export const handle: Handle = async ({event, resolve}) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const locals: any = event.locals;
    locals.user = cookies;


    if(!cookies['token']) {
        locals.user.authenticated = false;
    } else {
        locals.user.authenticated = true;
    }

    const response = await resolve(event);
    return response;
}; 

export const getSession: GetSession = async (request) => {
    const user = (request.locals as any).user;
    
    if(!user.token) {
        return {};
    }
    
    return {}
}