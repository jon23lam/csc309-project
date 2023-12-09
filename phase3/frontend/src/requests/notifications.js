import {axiosGet} from "./axiosRequests"
import {endpoint} from "../utils/endpoint";

const NOTIFICATIONS_ENDPOINT = endpoint("api/notifications/");

export async function getNotifications() {
    return await axiosGet(NOTIFICATIONS_ENDPOINT);
}
