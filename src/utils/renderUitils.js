import { useContext } from "react";
import { ApplicationContext } from "../App";
export const AlterToast = (title, message) => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    updateMessages([
        {
            title,
            message,
        },
        ...messages,
    ]);
};
