import { message } from "antd";

export const successNotification = (text: string) => {
  return message.success(text);
};

export const warningNotification = (text: string) => {
  return message.warning(text);
};

export const errorNotification = (text: string) => {
  return message.error(text);
};
