import {axiosDelete, axiosGet} from "./axiosRequests"
import {endpoint} from "../utils/endpoint";

const NOTIFICATIONS_ENDPOINT = endpoint("api/notifications/");

const READ_DELETE_NOTIFICATION_ENDPOINT = (notification_id) => endpoint(`api/notifications/${notification_id}/`)

export async function getNotifications() {
    return await axiosGet(NOTIFICATIONS_ENDPOINT);
}

export async function readNotification(notification_id) {
    return await axiosGet(READ_DELETE_NOTIFICATION_ENDPOINT(notification_id))
}

export async function deleteNotification(notification_id) {
    return await axiosDelete(READ_DELETE_NOTIFICATION_ENDPOINT(notification_id))
}