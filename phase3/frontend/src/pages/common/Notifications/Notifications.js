import { getNotifications } from "../../../requests/notifications";
import { useEffect, useState } from "react";
import icon from "../../../assets/notification-bell.png";
import unreadIcon from "../../../assets/notification-bell.png"

import "./Notifications.scss"
import { axiosGet } from "../../../requests/axiosRequests";

export function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [nextPage, setNextPage] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications().then((response) => {
          setNotifications(response.data.results);
          setNextPage(response.data.next);
        }).finally(() => setLoading(false));
    }, []);

    const getNextPage = async () => {
      const response = await axiosGet(nextPage);
      const {results, next} = response.data;

      setNotifications(notifications.concat(results));
      setNextPage(next);
    }

    const handleClick = (notificationId) => {
      
    }

    return (
      <div className="PageContainer">
        <div className="Main">
          <h1 className="HeaderText">Notifications</h1>
          <div className="NotificationsPage">
          {notifications.map((notification) => 
            <div class="NotificationsPage__item" onClick={() => handleClick(notification.id)}>
              {notification.read ? <img
                src={icon}
                alt="Notification Icon"
                class="NotificationsPage__photo"
              /> : 
              <img
                src={unreadIcon}
                alt="Notification Icon"
                class="NotificationsPage__photo"
              />}
              <div class="Notification__text">
                {notification.title}: {notification.body_text}
              </div>
            </div>
          )}
          {nextPage &&
              <div
                className="Notifications__pagination"
                onClick={() => getNextPage()}
              >
                <h1 className="BoldPurpleText">Load More</h1>
              </div> }
          </div>
        </div>
      </div>
    )
}
