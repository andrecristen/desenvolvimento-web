import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const errorMessage = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    });
};

export const successMessage = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });
};

export const infoMessage = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER
    });
};