import { useContext } from "react";
import { ApplicationContext, ApplicationContextType } from "../App";

export const AlterToast = (title: string, message: string) => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  updateMessages([
    {
      title,
      message,
    },
    ...messages,
  ]);
};
