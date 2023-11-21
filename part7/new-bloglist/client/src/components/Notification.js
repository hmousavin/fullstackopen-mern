import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((store) => store.notificationSlice);

  if (notification === null) return null;

  const styles = {
    info: {
      color: 'green',
      background: 'lightgray',
      borderStyle: 'solid',
      borderRadius: 4,
      padding: 10,
      margin_bottom: 10,
    },
    error: {
      color: 'red',
      background: 'lightgreay',
      borderStyle: 'solid',
      borderRadius: 4,
      padding: 10,
      margin_bottom: 10,
    },
  };

  const { type, caption } = notification;
  return (
    <div id="notification" style={styles[type]}>
      {caption}
    </div>
  );
};

export default Notification;
