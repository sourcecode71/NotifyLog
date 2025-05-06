import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any): Record<string, any> {
    try {
      const { error } = this.schema.validate(value, { abortEarly: false });
      if (error) {
        throw new BadRequestException({
          message: 'Validation failed',
          details: error.details.map((detail) => detail.message),
        });
      }
      return value as Record<string, any>;
    } catch {
      throw new BadRequestException({
        message: 'Joi validation error',
        level: 'error',
      });
    }
  }
}
