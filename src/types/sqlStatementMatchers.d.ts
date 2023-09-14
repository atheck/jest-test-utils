interface SqlStatementMatchers<TResult = unknown> {
    toSelectFromTable: (table: string) => TResult,
    toSelectDistinctFromTable: (table: string) => TResult,
    toReplaceIntoTable: (table: string) => TResult,
    toInsertIntoTable: (table: string, options?: InsertOptions) => TResult,
    toUpdateTable: (table: string) => TResult,
    toDeleteFromTable: (table: string) => TResult,
    toJoinTable: (table: string) => TResult,
    toSelectAllPropertiesOf: (obj: unknown) => TResult,
    toSelectCount: () => TResult,
    toSetColumn: (column: string, value?: string) => TResult,
    toInsertValues: () => TResult,
    toUseColumnsInCorrectOrder: (...columns: string []) => TResult,
    toUseWhereClause: (comparison: string) => TResult,
    toOrderBy: (column: string) => TResult,
    toGroupBy: (column: string) => TResult,
}

interface InsertOptions {
    or: "ABORT" | "FAIL" | "IGNORE" | "REPLACE" | "ROLLBACK",
}

declare global {
    namespace jest {
        interface Expect extends SqlStatementMatchers {}

        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
        interface Matchers<R, T = {}> extends SqlStatementMatchers<R> {}

        interface InverseAsymmetricMatchers extends SqlStatementMatchers {}
    }
}

export type { InsertOptions };