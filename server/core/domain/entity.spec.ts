import { EitherResult } from '../either';
import { describe, test, expect } from "vitest";
import { Entity } from "./entity";
import { UniqueEntityID } from './unique-entity-id';

interface PersonProps {
  firstName: string
  lastName: string
  fullName: string
}

interface PersonCreateProps {
  fullName: string
}

interface PersonRaw {
  person_id: string
  first_name: string
  last_name: string
  full_name: string
}

const PersonCreateSchema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' }
  },
  required: ['fullName']
}

class Person extends Entity<PersonProps> {
  // factory method for creating a new instance of an entity in valid state
  static create(props: PersonCreateProps, id: UniqueEntityID): EitherResult<Person> {
    // validate
    const validation = this.validator.validate(PersonCreateSchema, props)
    // if validation fails return an error
    if (validation.isLeft()) return this.either.left(validation.value)
    // creation logic
    const fullName = props.fullName.split(' ')
    const firstName = fullName[0]
    const lastName = fullName[fullName.length - 1]
    // return a new instance of the entity
    return this.either.right(new Person({ 
      ...props,
      firstName,
      lastName
    }, id))
  }

  // An entity should be able to restore itself from a raw version of itself
  static restore(raw: PersonRaw): Person {
    return new Person({
      firstName: raw.first_name,
      lastName: raw.last_name,
      fullName: raw.full_name
    }, UniqueEntityID.restore(raw.person_id))
  }

  // An entity should be able to return a raw version of itself
  get raw(): PersonRaw {
    return Object.freeze({
      person_id: this.id.toString(),
      first_name: this.props.firstName,
      last_name: this.props.lastName,
      full_name: this.props.fullName
    })
  }
}

describe('Entity', () => {
  test('should be able to create a new instance in valid state', () => {
    const personCreate = Person.create({ fullName: 'John Doe' }, UniqueEntityID.UUIDv7())
    if (personCreate.isLeft()) throw new Error(personCreate.value.message)

    const person = personCreate.value

    expect(person.raw.full_name).toBe('John Doe')
    expect(person.raw.first_name).toBe('John')
    expect(person.raw.last_name).toBe('Doe')
  })

  test('should be able to restore a new instance from raw', () => {
    const personRestored01 = Person.restore({
      person_id: 'uuid',
      first_name: 'John',
      last_name: 'Doe',
      full_name: 'John Doe'
    })

    expect(personRestored01.raw.person_id).toBe('uuid')
    expect(personRestored01.raw.full_name).toBe('John Doe')
    expect(personRestored01.raw.first_name).toBe('John')
    expect(personRestored01.raw.last_name).toBe('Doe')

    const personCreate = Person.create({ fullName: 'John Doe' }, UniqueEntityID.UUIDv7())
    if (personCreate.isLeft()) throw new Error(personCreate.value.message)
    const person = personCreate.value

    const personRestored02 = Person.restore(person.raw)

    expect(personRestored02.raw.person_id).toBe(person.id.toString())
    expect(personRestored02.raw.full_name).toBe('John Doe')
    expect(personRestored02.raw.first_name).toBe('John')
    expect(personRestored02.raw.last_name).toBe('Doe')

    expect(person.id.isUUIDv7()).toBe(true)
  })
})