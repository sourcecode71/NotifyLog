export class ApplicantCreateNotifyDto {
  media: string;
  mediaType: string;
  message: string;
}
export class AdmissionPaidNotifyDto {
  applicationNo: string;
  name: string;
  email: string;
  phone: string;
  paidAmount: number;
  major: string;
}
export class AdmissionPaidNotifyResponseDto {
  status: string;
  message: string;
}
