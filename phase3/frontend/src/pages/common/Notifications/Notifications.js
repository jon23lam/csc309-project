import { getNotifications } from "../../../requests/notifications";
import { useEffect, useState } from "react";
import icon from "../../../assets/notification-bell.png";

import "./Notifications.scss"

export function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications().then((response) => {
          setNotifications(response.data.results);
        }).finally(() => setLoading(false));
    }, []);

    return (
      <div className="PageContainer">
        <div className="Main">
          <h1 className="HeaderText">Notifications</h1>
          <div className="NotificationsPage">
          {notifications.map((notification) => 
            <div class="NotificationsPage__item">
              <img
                src={icon}
                alt="Notification Icon"
                class="NotificationsPage__photo"
              />
              <div class="Notification__text">
                {notification.title}: {notification.body_text}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    )
}