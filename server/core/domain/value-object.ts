import { Component } from '../component';
import { DomainObject } from './domain-object';

/**
 * ## ValueObject
 * 
 * In Domain-Driven Design (DDD), a **Value Object (VO)** is a central concept that represents an object defined 
 * primarily by its attributes rather than a distinct identity. Unlike an entity, which has a unique identity that 
 * persists over time and may change state, a Value Object is immutable and compared based on its attributes.
 *
 * ### Characteristics of a Value Object
 *
 * 1. **Immutability**: Once created, the state of a Value Object cannot be changed. If a change is needed, a new 
 * object is created with the modified values. This helps maintain consistency and avoids unexpected side effects.
 *
 * 2. **No Identity**: Value Objects do not have their own identity. They are considered equal if their attributes 
 *    are equal. In other words, two Value Objects with the same attribute values are indistinguishable.
 *
 * 3. **Composition of Entities**: Value Objects are often used to describe aspects of entities. For example, an 
 *    entity "Person" may have a Value Object "Address" that describes where the person lives.
 *
 * 4. **Self-validation**: Since Value Objects must always be in a consistent state, they often encapsulate business 
 *    rules and validation. For example, a Value Object "Email" should ensure that the email address is valid at 
 *    the time of creation.
 *
 * ### Practical Example
 *
 * Consider an e-commerce system:
 *
 * - **Entity**: `Order`
 *   - **Attributes**: `id`, `customer`, `items`, `total`
 *
 * The order is an entity because it has a unique identity (`id`). Now, consider the shipping address associated 
 * with the order:
 *
 * - **Value Object**: `Address`
 *   - **Attributes**: `street`, `city`, `state`, `zipcode`
 *
 * The address is a Value Object because it does not need a unique identity to be useful. Two orders can have the 
 * same shipping address, and this does not cause ambiguity because the address is compared by its content.
 *
 * ### Benefits of Using Value Objects
 *
 * 1. **Simplification of Models**: Separating data that has identity from data that does not helps simplify the 
 *    domain model.
 * 2. **Consistency and Safety**: The immutability and self-validation of Value Objects ensure they are always in 
 *    a valid state.
 * 3. **Reduction of Duplicate Code**: Business rules and validation logic encapsulated in Value Objects prevent 
 *    code duplication.
 *
 * Value Objects are a powerful tool for modeling aspects of the domain defined by their attributes and ensuring 
 * consistency and simplicity in software models.
 */


export abstract class ValueObject<T> extends Component implements DomainObject {
  protected readonly props: T

  constructor(props: T) {
    super()
    this.props = props
  }

  public equals(vo: ValueObject<T>): boolean { 
    return JSON.stringify(this.props) === JSON.stringify(vo.props) 
  }
}
