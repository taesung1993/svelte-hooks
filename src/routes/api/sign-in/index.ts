import type {RequestHandler} from '@sveltejs/kit';
import * as cookie from 'cookie';
import {v4 as uuidv4} from 'uuid';

export const post: RequestHandler = async (event) => {
    const body = await event.request.json();
    const {username, password} = body;
    console.log(event.request.headers);

    if(
        username !== 'mason@gollala.com' ||
        password !== '123123a@'
    ) {
        return {
            status: 401,
            body: {
                message: 'fail to login',
                user: {
                    username,
                    password
                }
            }
        };
    }

    const sessionId = uuidv4();
    
    const headers = {
        'Set-Cookie': [cookie.serialize('session_id', sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })]
    }

    return {
        status: 200,
        headers,
        body: {
            message: 'successfully login'
        }
    }
}