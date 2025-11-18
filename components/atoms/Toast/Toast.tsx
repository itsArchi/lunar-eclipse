import { toast, ToastContainer, ToastPosition, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Inject custom styles
const customStyles = `
    .custom-success-toast {
        background: white !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        margin-bottom: 16px !important;
        margin-left: 16px !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        min-height: auto !important;
        border-left: 4px solid #3b82f6 !important;
    }
    
    .custom-success-toast .Toastify__toast-body {
        color: #64748b !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    
    .custom-success-toast .Toastify__toast-icon {
        color: #3b82f6 !important;
        margin-right: 8px !important;
    }
    
    .custom-success-toast .Toastify__progress-bar {
        display: none !important;
    }
    
    .custom-success-toast .Toastify__close-button {
        display: none !important;
    }
`;

if (
    typeof window !== "undefined" &&
    !document.getElementById("custom-toast-styles")
) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "custom-toast-styles";
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);
}

export interface ToastConfig {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    position?: ToastPosition;
    autoClose?: number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    theme?: Theme;
}

export const showSuccessToast = (
    message: string,
    config?: Partial<ToastConfig>
) => {
    return toast.success(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        className: "custom-success-toast",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ color: "#3b82f6" }}
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        ...config,
    });
};

export const showErrorToast = (
    message: string,
    config?: Partial<ToastConfig>
) => {
    return toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        ...config,
    });
};

export const showInfoToast = (
    message: string,
    config?: Partial<ToastConfig>
) => {
    return toast.info(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        ...config,
    });
};

export const showWarningToast = (
    message: string,
    config?: Partial<ToastConfig>
) => {
    return toast.warning(message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        ...config,
    });
};

export const ToastProvider = () => {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
};

export default ToastProvider;
