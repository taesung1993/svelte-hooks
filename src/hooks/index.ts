import type { GetSession, Handle } from "@sveltejs/kit"
import * as cookie from 'cookie';

export const handle: Handle = async ({event, resolve}) => {
    const response = await resolve(event); // create response
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    // console.log(response);
    console.log(cookies);
    return response;
}; 

export const getSession: GetSession = (request) => {
    return {
        user: {
            id: "@##SJDAS",
            name: "Sharath",
            access: "admin"
        }
    }
}