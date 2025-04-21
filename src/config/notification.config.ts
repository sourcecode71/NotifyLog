export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'PHONE',
  PUSH = 'PUSH',
  WEBHOOK = 'WEBHOOK',
  IN_APP = 'IN_APP',
  AWS = 'AWS',
}
export const AppNotificationConfig = {
  defaultChannel:
    (process.env.NOTIFY_CHANNEL as NotificationChannel) ||
    NotificationChannel.AWS,
};
