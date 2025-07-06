import { toast } from "sonner";

interface toastProps {
    msg: string;
    des?: string;
    type?: "success" | "error" | "warning" | "info";
}

export const showToast = ({ msg, des = "", type = "success" }: toastProps) => {
    switch (type) {
        case "success":
            toast.success(msg, { description: des });
            break;
        case "error":
            toast.error(msg, { description: des });
            break;
        case "warning":
            toast.warning(msg, { description: des });
            break;
        default:
            toast(msg, { description: des });
    }
};
