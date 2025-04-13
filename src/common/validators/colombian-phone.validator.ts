import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsColombianPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: string): boolean {
    return /^3\d{9}$/.test(phone);
  }
}

export function IsColombianPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isColombianPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsColombianPhoneConstraint,
    });
  };
}
