import type { RequestHandler } from "@sveltejs/kit";
import { createSession, getUserByEmail, registerUser } from "../_db";
import { serialize } from "cookie";

export const post: RequestHandler = async (event) => {
    const body = await event.request.json();
    const {email, password} = body;
    const user = await getUserByEmail(email);

    if(user) {
        return {
            status: 409,
            body: {
                message: 'User already registered'
            }
        }
    }

    const newUser = {email, password};
    await registerUser(newUser);

    const {id} = await createSession(email);
    return {
        status: 201,
        headers: {
            'Set-Cookie': serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7
            })
        },
        body: {
            message: 'Successfully signed up'
        }
    }
}