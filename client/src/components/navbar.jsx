/* eslint-disable react/prop-types */
import "./navbar.css";
import Notification from "./../img/notification.svg";
import Message from "./../img/message.svg";
import Settings from "./../img/settings.svg";
import { useEffect, useState } from "react";

export function NavBar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("server:getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === "like") {
      action = "liked";
    } else if (type === "comment") {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lame App</span>
      <div className="icons">
        <div className="icon" onClick={handleClick}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={handleClick}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={handleClick}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}
