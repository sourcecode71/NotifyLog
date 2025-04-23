export class Notification {
  constructor(
    public readonly recipient: string,
    public readonly subject: string,
    public readonly body: string,
    public readonly mediaType: string,
    public readonly sentAt?: Date,
    public readonly _id?: string,
  ) {}
}
