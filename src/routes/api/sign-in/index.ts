import type {RequestHandler} from '@sveltejs/kit';
import * as cookie from 'cookie';
import { createSession, getUserByEmail, registerUser } from '../_db';

export const post: RequestHandler = async (event) => {
    const body = await event.request.json();
    const {email, password} = body;
    const user = await getUserByEmail(email);

    if(!user || user.password !== password) {
        return {
            status: 401,
            body: {
                errors: 'Incorrect email or password'
            }
        }
    }

    const {id} = await createSession(email);
    const headers = {
        'Set-Cookie': [cookie.serialize('session_id', id, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        })]
    }

    return {
        status: 200,
        headers,
        body: {
            message: 'Successfully signed in'
        }
    }
}