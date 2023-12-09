import {axiosGet} from "./axiosRequests"
import {endpoint} from "../utils/endpoint";

const NOTIFICATIONS_ENDPOINT = endpoint("api/notifications/");

const READ_NOTIFICATION_ENDPOINT = (notification_id) => endpoint(`api/notifications/${notification_id}/`)

export async function getNotifications() {
    return await axiosGet(NOTIFICATIONS_ENDPOINT);
}

export async function readNotification(notification_id) {
    return await axiosGet(READ_NOTIFICATION_ENDPOINT(notification_id))
}