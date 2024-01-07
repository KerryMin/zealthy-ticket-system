import { useToast } from "react-native-toast-notifications";

export function useToaster() {
    const toast = useToast();

    const toastOptions = {
        duration: 2000,
    };


    const successToast = (message = 'Success') => {
        toast.show(message, {
            type: 'success',
            placement: "bottom",
            animationType: "zoom-in",
            ...toastOptions,
        });
    };


    const errorToast = (message = 'Error') => {
        toast.show(message, {
            type: 'danger',
            placement: "bottom",
            animationType: "zoom-in",
            ...toastOptions,
        });
    };

    return {
        successToast,
        errorToast,
    };
}
