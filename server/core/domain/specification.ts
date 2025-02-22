import { EitherResult } from "../either";

/**
 * ## Specification
 * 
 * In Domain-Driven Design (DDD), the **Specification** pattern is a design pattern used to encapsulate business 
 * rules or criteria for selecting or validating domain objects. Specifications provide a way to define and 
 * encapsulate complex queries, validation rules, or conditions that an object or a set of objects must satisfy 
 * without cluttering the domain model or business logic.
 *
 * ### Key Concepts of the Specification Pattern
 *
 * 1. **Encapsulation of Criteria**: 
 *    - Specifications encapsulate the criteria or rules used to filter or validate domain objects. This allows 
 *      complex conditions to be expressed in a single, reusable component rather than scattered throughout the 
 *      domain model.
 *
 * 2. **Reusability**: 
 *    - Specifications can be reused across different parts of the application or combined to form more complex 
 *      conditions. This promotes code reuse and consistency in how domain rules are applied.
 *
 * 3. **Composability**: 
 *    - Specifications can be combined using logical operators such as AND, OR, and NOT to create more complex 
 *      criteria. This composability allows for flexible and expressive definitions of domain rules.
 *
 * 4. **Separation of Concerns**: 
 *    - By encapsulating business rules and criteria in Specification objects, the domain model remains clean and 
 *      focused on its primary responsibilities. This separation helps in maintaining and evolving the domain model 
 *      without impacting other parts of the system.
 *
 * ### Practical Example
 *
 * In an e-commerce system, consider the following Specifications:
 *
 * - **Specification**: `CustomerIsEligibleForDiscount`
 *   - **Criteria**: A customer is eligible for a discount if they have made more than 10 purchases and have not 
 *     received a discount in the past month.
 *   - **Methods**:
 *     - `isSatisfiedBy(customer: Customer): boolean` - Checks if the customer meets the criteria for the discount.
 *
 * - **Specification**: `OrderTotalExceedsAmount`
 *   - **Criteria**: An order is eligible for free shipping if its total amount exceeds $100.
 *   - **Methods**:
 *     - `isSatisfiedBy(order: Order): boolean` - Checks if the order total exceeds the specified amount.
 *
 * **Combining Specifications**:
 *
 * - **Combined Specification**: `EligibleForFreeShipping`
 *   - **Combination**: The order must meet both `OrderTotalExceedsAmount` and `CustomerIsEligibleForDiscount`.
 *   - **Methods**:
 *     - `isSatisfiedBy(order: Order, customer: Customer): boolean` - Checks if both criteria are satisfied.
 *
 * In this example, each Specification encapsulates a specific rule or criterion. The `EligibleForFreeShipping` 
 * combines multiple Specifications to determine if an order qualifies for free shipping based on both the order 
 * total and the customer's eligibility.
 *
 * ### Benefits of Using the Specification Pattern
 *
 * 1. **Encapsulation of Business Rules**: Specifications encapsulate complex business rules, making them easier 
 *    to manage and understand.
 *
 * 2. **Flexibility and Composability**: Specifications can be combined and reused in different contexts, providing 
 *    flexibility in how domain rules are applied.
 *
 * 3. **Clean Domain Model**: By separating business rules into Specifications, the domain model remains focused 
 *    on its core responsibilities and is less cluttered with validation or filtering logic.
 *
 * 4. **Improved Testability**: Specifications can be tested independently, ensuring that the criteria they encapsulate 
 *    are correctly enforced.
 *
 * The Specification pattern is a powerful tool in DDD for defining and managing business rules and criteria, 
 * providing a clean and flexible approach to handling complex conditions in the domain model.
 */

export interface Specification<T> {
  isSatisfiedBy(entity: T): EitherResult<T>
}