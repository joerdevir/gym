import { Component } from "../component";
import { Environment } from "../enum/env.enum";

/**
 * ## Domain Service
 * 
 * In Domain-Driven Design (DDD), a **Domain Service** is a design pattern that encapsulates domain logic not 
 * naturally fitting within an Entity or a Value Object. Domain Services represent operations and behaviors 
 * that are essential to the domain but don't belong to a specific object. They are used to model business 
 * processes or actions that involve multiple objects or require complex logic that doesn't naturally belong 
 * to a single Entity or Value Object.
 *
 * ### Characteristics of a Domain Service
 *
 * 1. **Statelessness**: Domain Services are typically stateless, meaning they do not hold or manage state. 
 *    They act on the state provided to them through method parameters. This design choice promotes reuse 
 *    and simplifies the management of the service.
 *
 * 2. **Focus on Business Logic**: The primary purpose of a Domain Service is to encapsulate domain-specific 
 *    business logic. This could include calculations, validations, or operations that involve multiple 
 *    entities or aggregates.
 *
 * 3. **No Responsibility for Persistence**: Unlike Repositories, Domain Services are not responsible for 
 *    managing the persistence of entities or aggregates. They may, however, interact with Repositories to 
 *    retrieve or store data as part of their operations.
 *
 * 4. **Intermediary Role**: Domain Services often act as intermediaries, coordinating operations across 
 *    multiple entities or aggregates. For example, a service might manage a transaction that involves 
 *    debiting one account and crediting another.
 *
 * ### Practical Example
 *
 * Consider a financial application with the following service:
 *
 * - **Domain Service**: `TransferService`
 *   - **Methods**:
 *     - `transferFunds(sourceAccount: Account, destinationAccount: Account, amount: Money): void` - Handles 
 *       the business logic for transferring funds between accounts, including validation, debiting, and crediting.
 *
 * In this example, the `TransferService` encapsulates the logic for transferring funds, which involves 
 * operations on multiple `Account` entities. The service handles the validation (e.g., ensuring sufficient 
 * funds are available) and coordinates the transfer process.
 *
 * ### Benefits of Using Domain Services
 *
 * 1. **Encapsulation of Complex Logic**: Domain Services provide a way to encapsulate complex domain logic 
 *    that doesn't naturally fit within a single Entity or Value Object, keeping these objects focused on their 
 *    core responsibilities.
 *
 * 2. **Separation of Concerns**: By isolating specific business processes into Domain Services, the domain 
 *    model becomes more modular and easier to maintain. Each service has a well-defined responsibility.
 *
 * 3. **Reusability**: Domain Services can be reused across different parts of the application or even across 
 *    different applications if the business logic is general enough.
 *
 * 4. **Testability**: Since Domain Services are often stateless and focused on specific business logic, they 
 *    are easier to test in isolation compared to more complex objects with multiple responsibilities.
 *
 * Domain Services are a vital part of the DDD toolkit, providing a means to organize and encapsulate domain 
 * logic that spans multiple entities or requires specific operations not tied to any one object. They help 
 * ensure that the domain model remains clean, modular, and focused on accurately representing the business domain.
 */

export abstract class DomainService extends Component {
  protected readonly dbSchema = process.env.NODE_ENV === Environment.TEST ? `"${process.env.LOCAL_POSTGRES_SCHEMA}".` : ''
}