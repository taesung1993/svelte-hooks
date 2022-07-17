import { writable } from "svelte/store";

function createToasts() {
    const {subscribe, set, update} = writable<any>([]);
    
    function openToast(message: string, type: string) {
        return update((toast: any) => {
            toast = [...toast, {message, type}];
            console.log(toast);
            return toast;
        });
    }

    return {
      open: openToast,
      subscribe
    };
}

export const toasts = createToasts();



