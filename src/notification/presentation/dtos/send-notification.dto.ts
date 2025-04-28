import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from '../../../config/notification.config';

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

export class SendNotificationDto {
  @ApiProperty({
    description: 'Recipient email or phone number',
    example: 'test@example.com',
  })
  recipient: string;

  @ApiProperty({
    description: 'Subject of the notification',
    example: 'Your Admission User ID',
  })
  subject: string;

  @ApiProperty({
    description: 'Body of the notification',
    example: 'Your user ID for admission is USER123. Please use it to proceed.',
  })
  body: string;

  @ApiProperty({
    description: 'Type of notification channel',
    example: NotificationChannel.EMAIL,
    enum: NotificationChannel,
  })
  mediaType: NotificationChannel;

  @ApiProperty({
    description: 'Type of notification',
    example: NotificationType.ADMISSION_ID,
    enum: NotificationType,
  })
  notificationType: NotificationType;
}
