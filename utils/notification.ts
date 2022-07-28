// Component
import { notification } from 'antd';

/** [Function] 에러 알림 */
export const errorNotification = (title: string, message?: string): any => {
  notification.error({
    description: message,
    message: title
  });
}
/** [Function] 성공 알림 */
export const successNotification = (title: string, message?: string): any => {
  notification.success({
    description: message,
    message: title
  });
}
/** [Function] 경고 알림 */
export const warningNotification = (title: string, message?: string): any => {
  notification.warning({
    description: message,
    message: title
  });
}