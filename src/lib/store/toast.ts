import { writable } from "svelte/store";

function createToasts() {
    const {subscribe, set, update} = writable<any>([]);
    let index = 1;
    
    function openToast(message: string, type?: string) {
        return update((toasts: any) => {
            const id = `toast-${index++}`;
            toasts = [...toasts, {id, message, type}];
            return toasts;
        });
    }

    function closeToast(id: string) {
        return update((toasts: any) => {
            toasts = toasts.filter((toast: any) => toast.id !== id);
            return toasts;
        });
    }

    return {
      open: openToast,
      close: closeToast,
      subscribe
    };
}

export const toasts = createToasts();



