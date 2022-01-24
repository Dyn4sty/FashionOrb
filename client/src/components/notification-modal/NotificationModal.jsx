import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { subscribeToNotifications } from "../../firebase/firebase.utils";
import "./Notification.css";
import "./style.css";

const NotificationModal = () => {
  useEffect(() => {
    const showModal = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(showModal);
  }, []);

  const [show, setShow] = useState(false);

  const lastUserDate = localStorage.getItem("NotificationDate")
    ? new Date(localStorage.getItem("NotificationDate"))
    : null;

  const UserDateExpired =
    lastUserDate?.getTime() < new Date().getTime() || true;

  const handleClose = () => {
    setShow(false);
    if (!lastUserDate) {
      const NotificationDate = new Date();
      NotificationDate.setHours(NotificationDate.getHours() + 1);
      localStorage.setItem("NotificationDate", NotificationDate);
    }
  };

  if (UserDateExpired) {
    localStorage.removeItem("NotificationDate");
  }

  if (Notification.permission === "granted" || !UserDateExpired) {
    return <></>;
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <p className="heading">Be always up to date</p>
        </Modal.Header>
        <Modal.Body>
          <i id="bell" className="fa fa-bell"></i>
          <p className="r3 px-md-5 px-sm-1">
            Recieve push notifications to be updated to latest news.
          </p>
          <div className="text-center mb-3">
            <button
              className="btn btn-primary w-50 rounded-pill b1"
              onClick={() => {
                subscribeToNotifications().then((permission) => {
                  handleClose();
                });
              }}
            >
              Subscribe
            </button>
          </div>
          <a href="#z" onClick={handleClose}>
            Not now
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NotificationModal;
