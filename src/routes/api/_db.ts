import {v4 as uuid4} from 'uuid';
import type { IUser } from 'src/lib/models/interfaces/user';
import type { ISession } from 'src/lib/models/interfaces/session';

const users: IUser[] = [
    {
        email: 'mason@gollala.com',
        password: 'gollala1!'
    }
];

const sessions: ISession[] = [];

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const existingUser = await users.find((user) => user.email === email);
    if(!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
};

export const registerUser = async (user: IUser): Promise<IUser> => {
    const existingUser = await users.find((u) => u.email === user.email);
    if(!!existingUser) return Promise.reject(new Error('User already registered'));
    users.push(user);
    return Promise.resolve(user);
};

export const createSession = (email: string): Promise<ISession> => {
    const session: ISession = {
        id: uuid4(),
        email
    };
    sessions.push(session);
    return Promise.resolve(session);
}

export const getSession = (id: string): Promise<ISession> => {
    const session = sessions.find((s) => s.id === id);
    if(!session) return Promise.reject(new Error('Session not found'));
    
    return Promise.resolve(session);
}

export const removeSession = (id: string): Promise<ISession> => {
    const session = sessions.find((s) => s.id === id);

    if(!session) return Promise.reject(new Error('Session not found'));
    const index = sessions.findIndex((s) => s.id === session.id);
    sessions.splice(index, 1);
    
    return Promise.resolve(session);
}