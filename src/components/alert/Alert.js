import { Button, notification, Space } from 'antd';

export default function showNotification(type, message, title) {
  notification[type]({
    message: title,
    description: message,
  });
}
