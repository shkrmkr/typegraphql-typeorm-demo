import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../User.entity';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyInUseConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await User.findOne({ where: { email } });
    return user ? false : true;
  }
}

export function IsEmailAlreadyInUse(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyInUseConstraint,
    });
  };
}
