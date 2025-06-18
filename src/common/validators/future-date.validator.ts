import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsFutureDateTime(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isFutureDateTime',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const date = new Date(value);
                    return !isNaN(date.getTime()) && date > new Date();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} debe ser una fecha y hora futura válida`;
                },
            },
        });
    };
}
