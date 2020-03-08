import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from "class-validator"

interface UniqueProperty<T> {
  field: string
  repository: T
}

export default function Unique<T>(
  property: UniqueProperty<T>,
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "unique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      async: true,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { field, repository } = args.constraints[0]

          return repository
            .findOne({ [field]: value })
            .then((result) => !result)
        }
      }
    })
  }
}
