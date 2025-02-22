import { Component } from '../component';
import { type UniqueEntityID } from '../domain/unique-entity-id';
import { DomainObject } from './domain-object';

/**
 * ## Entity
 * In Domain-Driven Design (DDD), an **Entity** is a fundamental concept that represents a uniquely identifiable object 
 * within the domain. Entities are distinguished by their unique identity, which persists over time even if their 
 * attributes or state change. Unlike Value Objects, Entities are defined more by their identity than by their 
 * attributes.
 *
 * ### Characteristics of an Entity
 *
 * 1. **Unique Identity**: Each Entity has a distinct identity, typically represented by an identifier like an ID 
 *    or a unique key. This identity is consistent over time, regardless of changes to the Entity's attributes.
 *
 * 2. **Mutability**: Entities can change their attributes or state over time while maintaining the same identity. 
 *    This mutability allows Entities to evolve as the underlying business processes and data change.
 *
 * 3. **Lifecycle**: Entities often have a lifecycle, which includes creation, modifications, and deletion. The 
 *    lifecycle management of Entities is crucial to maintaining the integrity of the domain model.
 *
 * 4. **Behavior and Logic**: Entities often encapsulate business logic and behaviors that are directly related 
 *    to their identity and state. This ensures that the business rules are consistently applied.
 *
 * ### Practical Example
 *
 * Consider a library management system:
 *
 * - **Entity**: `Book`
 *   - **Attributes**: `id`, `title`, `author`, `ISBN`, `availabilityStatus`
 *
 * The `Book` entity has a unique `id` that identifies each book record in the system. Even if the `title` or 
 * `availabilityStatus` changes, the `id` remains the same, ensuring the entity's identity is consistent.
 *
 * ### Importance of Entities in DDD
 *
 * 1. **Identity Consistency**: Entities ensure that important objects in the domain are consistently identified
 *    and tracked over time, which is critical for maintaining the integrity of the business processes.
 *
 * 2. **Rich Behavior**: Entities often contain rich behavior and business logic that are closely tied to their 
 *    state and identity, providing a clear and cohesive way to model complex domain interactions.
 *
 * 3. **Data Integrity**: The lifecycle management and mutability of Entities help ensure that the data within the 
 *    system is accurate and reflects the current state of the domain.
 *
 * Entities are crucial for modeling complex domains where the identity and lifecycle of objects play a significant 
 * role in the business processes.
 */

export abstract class Entity<Props> extends Component implements DomainObject {
  readonly #uniqueEntityId: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id: UniqueEntityID) {
    super()
    this.#uniqueEntityId = id
    this.props = props
  }
    
  get id(): UniqueEntityID { 
    return this.#uniqueEntityId 
  }
  
  public equals(entity: Entity<Props>): boolean { 
    return this.id.equals(entity.id) 
  }
}
