import { useContext } from "react";
import { NotificationContext } from "../contexts/Notifications/NotificationContext";

export const useNotification = () => useContext(NotificationContext);
