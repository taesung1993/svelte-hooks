import { writable } from "svelte/store";

export const user = writable<any>({});
export const isLoggedIn = writable<boolean>(false);