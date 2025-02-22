import { EitherResult } from '../either';
import { describe, test, expect } from "vitest";
import { ValueObject } from './value-object';

/**
 * 
 * A Value Object is an object that is defined not by its identity but by its attributes. 
 * They are immutable and are used to describe aspects or characteristics 
 * of an entity. 
 * 
 * Here are some key points about Value Objects:
 * 
 * [Immutability]: Value Objects are immutable. Once created, their values cannot be changed. 
 * If you need an object with different values, you must create a new Value Object.
 * 
 * [No Identity]: Unlike entities, Value Objects do not have a unique identity. 
 * Two Value Objects with the same values are considered equal. 
 * 
 * [Attribute-Based Comparison]: Value Objects are compared based on their attributes. 
 * If all the attributes of two Value Objects are the same, they are considered equal.
 * 
 * [Property Designation]: They are often used to group attributes that logically belong together. 
 * For example, instead of having several loose fields for an address (street, city, ZIP code), 
 * you can have a Value Object called Address.
 * 
 * [Reusability and Composition]: Value Objects can be composed and reused in various parts of the domain.
 * 
 * For example, imagine an accounting system where you have an Address as a Value Object. 
 * This Address might have attributes like Street, City, State, and ZIP Code. 
 * If two addresses have the same values for all these attributes, they are considered equal, 
 * regardless of where they are used.
 * 
 * Value Objects help keep the code clean and expressive, encapsulating concepts 
 * that are important in the domain but do not require a unique identity.
 */

interface EmailProps {
  domain: string
  email: string
}

interface EmailCreateProps {
  email: string,
}

interface EmailRaw {
  domain: string
  email: string
}

const EmailCreateSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' }
  },
  required: ['email']
}

class Email extends ValueObject<EmailProps> {
  // factory method for creating a new instance of an value object in valid state
  static create(props: EmailCreateProps): EitherResult<Email> {
    // validate
    const validation = this.validator.validate(EmailCreateSchema, props)
    // if validation fails return an error
    if (validation.isLeft()) return this.either.left(validation.value)
    // creation logic
    const domain = props.email.split('@')[1]
    // return a new instance of the entity
    return this.either.right(new Email({ email: props.email, domain }))
  }

  // An value object should be able to restore itself from a raw version of itself
  static restore(raw: EmailRaw): Email {
    return new Email(raw)
  }
  // An value object should be able to return a raw version of itself
  get raw(): EmailRaw {
    return Object.freeze<Readonly<EmailRaw>>({
      domain: this.props.domain,
      email: this.props.email
    })
  }
}

describe('Entity', () => {
  test('should be able to create a new instance in valid state', () => {
    const email = Email.create({ email: 'john@doe.com' })
    if (email.isLeft()) throw new Error(email.value.message)

    expect(email.value.raw.email).toBe('john@doe.com')
    expect(email.value.raw.domain).toBe('doe.com')
  })
})