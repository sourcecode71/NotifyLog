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

export enum NotificationType {
  ADMISSION_ID = 'admission-id',
  EMAIL_VERIFICATION = 'email-verification',
  FORM_PAYMENT = 'form-payment',
  ADMISSION_REFERENCE = 'admission-reference',
  REGISTRATION_DATE = 'registration-date',
  REGISTRATION_COMPLETED = 'registration-completed',
  PAYMENT_REMINDER = 'payment-reminder',
  ATTENDANCE_ABSENCE = 'attendance-absence',
  COURSE_WITHDRAWAL_OTP = 'course-withdrawal-otp',
}
