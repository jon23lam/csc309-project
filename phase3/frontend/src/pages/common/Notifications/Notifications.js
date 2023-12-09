import { getNotifications, readNotification } from "../../../requests/notifications";
import { useEffect, useState } from "react";
import icon from "../../../assets/notification-bell.png";
import unreadIcon from "../../../assets/unread-notification-bell.png"
import { useNavigate } from "react-router-dom";

import "./Notifications.scss"
import { axiosGet } from "../../../requests/axiosRequests";

export function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [nextPage, setNextPage] = useState(null);


    useEffect(() => {
        getNotifications().then((response) => {
          setNotifications(response.data.results);
          setNextPage(response.data.next);
        }).finally();
    }, []);

    const getNextPage = async () => {
      const response = await axiosGet(nextPage);
      const {results, next} = response.data;

      setNotifications(notifications.concat(results));
      setNextPage(next);
    }

    const handleClick = async (notification) => {
      await readNotification(notification.id)

      if (notification.type === 'application' || notification.type === 'application_comment') {
        navigate(`/applications/${notification.associated_id}/messages`);
      } else {
        navigate(`/shelterDetail/${notification.associated_id}`)
      }
    }

    return (
      <div className="PageContainer">
        <div className="Main">
          <h1 className="HeaderText">Notifications</h1>
          <div className="NotificationsPage">
          {notifications.map((notification) => 
            <div class="NotificationsPage__item" onClick={() => handleClick(notification)}>
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