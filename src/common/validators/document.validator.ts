import { DocumentType } from '@common/enums/document-type.enum';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidDocumentNumber', async: false })
export class IsValidDocumentNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(documentNumber: string, args: ValidationArguments): boolean {
    const object = args.object as any;
    const type = object.typeOfDocument;

    if (!type || !documentNumber) return false;

    switch (type) {
      case DocumentType.CC:
        return isValidCC(documentNumber);
      case DocumentType.TI:
        isValidTI(documentNumber);
      case DocumentType.CE:
        return isValidCE(documentNumber);
      case DocumentType.PASSPORT:
        return isValidPassport(documentNumber);
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `$property is not valid for document type "${(args.object as any).typeOfDocument}"`;
  }
}

export function IsValidDocumentNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidDocumentNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidDocumentNumberConstraint,
    });
  };
}

function isValidCC(documentNumber: string): boolean {
  return /^\d{6,10}$/.test(documentNumber);
}

function isValidTI(documentNumber: string): boolean {
  return /^\d{6,10}$/.test(documentNumber);
}

function isValidCE(documentNumber: string): boolean {
  return /^[A-Za-z0-9]{6,15}$/.test(documentNumber);
}

function isValidPassport(documentNumber: string): boolean {
  return /^[A-Za-z0-9]{6,12}$/.test(documentNumber);
}
