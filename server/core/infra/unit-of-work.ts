import {InfraService} from "./infra-service";

/**
 * The **Unit of Work (UoW)** is a design pattern that groups persistence operations 
 * (inserts, updates, and deletes) into a single transaction. It ensures that if one operation fails, 
 * all other changes made within that unit are rolled back, maintaining data integrity.
 * 
 * ### Main objective:
 * - Avoid database inconsistencies.
 * - Rollback all changes if one operation fails.
 * 
 * This pattern is useful in systems that deal with multiple persistence operations 
 * that need to be treated transitionally, meaning either all or none of the operations should be applied.
 * 
 * ### How does this fit into the provided example?
 * 
 * The example below illustrates a UoW implementation with database transactions. 
 * Here, **BookTransactionUow** orchestrates various write operations related to the financial transaction, 
 * all within a single SQL transaction.
 * 
 * @example
 * ```typescript
 * 
 * interface Props {
 *   sql: PostgresAdapter;
 *   journalEntryRepo: JournalEntryRepo;
 *   financialInstitutionRepo: FinancialInstitutionRepo;
 *   chartOfAccountsRepo: ChartOfAccountsRepo;
 * }
 * 
 * interface BookTransactionUowInputDTO {
 *   journalEntry: JournalEntry;
 *   financialTransaction: FinancialTransaction;
 *   generalLedgerAccounts: Map<string, GeneralLedgerAccount>;
 *   bookedBy: string;
 * }
 * 
 * interface BookTransactionUowOutputDTO {
 *   journalEntry: JournalEntryRaw;
 *   financialTransaction: FinancialTransactionRaw;
 * }
 * 
 * export class BookTransactionUow extends UnitOfWork {
 *   readonly #sql: PostgresAdapter;
 *   readonly #journalEntryRepo: JournalEntryRepo;
 *   readonly #financialInstitution: FinancialInstitutionRepo;
 *   readonly #chartOfAccountsRepo: ChartOfAccountsRepo;
* 
*   constructor(props: Props) {
*     super();
*     this.#sql = props.sql;
*     this.#journalEntryRepo = props.journalEntryRepo;
*     this.#financialInstitution = props.financialInstitutionRepo;
*     this.#chartOfAccountsRepo = props.chartOfAccountsRepo;
*   }
* 
*   async execute(input: BookTransactionUowInputDTO): Promise<EitherResult<BookTransactionUowOutputDTO>> {
*     // Start a transaction
*     const begin = await this.#sql.query({ query: `BEGIN;` });
*     if (begin.isLeft()) return this.either.left(begin.value);
* 
*     // Persist the journal entry
*     const addJournalEntry = await this.#journalEntryRepo.addJournalEntry(input.journalEntry);
*     if (addJournalEntry.isLeft()) {
*       await this.#sql.query({ query: `ROLLBACK;` });
*       return this.either.left(addJournalEntry.value);
*     }
* 
*     // Persist journal entry lines
*     for (const line of input.journalEntry.raw.lines) {
*       const addJournalEntryLine = await this.#journalEntryRepo.addJournalEntryLine({
*         journalEntry: input.journalEntry,
*         lineNumber: line.line_number
*       });
*       if (addJournalEntryLine.isLeft()) {
*         await this.#sql.query({ query: `ROLLBACK;` });
*         return this.either.left(addJournalEntryLine.value);
*       }
*     }
* 
*     // Persist financial transaction
*     const bookTransactionRepo = await this.#financialInstitution.bookFinancialTransaction(input.financialTransaction);
*     if (bookTransactionRepo.isLeft()) {
*       await this.#sql.query({ query: `ROLLBACK;` });
*       return this.either.left(bookTransactionRepo.value);
*     }
* 
*     // Persist general ledger accounts
*     for (const generalLedgerAccount of input.generalLedgerAccounts.values()) {
*       const postTransaction = await this.#chartOfAccountsRepo.postTransaction(generalLedgerAccount);
*       if (postTransaction.isLeft()) {
*         await this.#sql.query({ query: `ROLLBACK;` });
*         return this.either.left(postTransaction.value);
*       }
*     }
* 
*     // Commit the transaction
*     const commit = await this.#sql.query({ query: `COMMIT;` });
*     if (commit.isLeft()) return this.either.left(commit.value);
* 
*     return this.either.right({
*       journalEntry: input.journalEntry.raw,
*       financialTransaction: input.financialTransaction.raw,
*     });
*   }
* }
  ```
* 
* ### Key Points:
* 
* 1. **Transaction**: The execution of multiple persistence operations (adding journal entry, lines, financial transactions, and general ledger accounts) is grouped within a SQL transaction. If any operation fails, a rollback is executed to undo all changes.
* 
* 2. **Rollback**: If an error occurs, the `ROLLBACK;` is triggered, reverting any changes made during the UoW execution.
* 
* 3. **Commit**: If all operations succeed, the `COMMIT;` confirms the transaction, persisting all changes to the database.
* 
* This pattern is very useful to maintain data consistency in scenarios where multiple persistence operations need to be treated as a single unit.
*/

export abstract class UnitOfWork extends InfraService {}