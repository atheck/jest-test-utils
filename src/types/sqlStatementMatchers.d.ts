interface SqlStatementMatchers<TResult = unknown> {
    toSelectFromTable: (table: string) => TResult,
    toReplaceIntoTable: (table: string) => TResult,
    toInsertIntoTable: (table: string) => TResult,
    toUpdateTable: (table: string) => TResult,
    toDeleteFromTable: (table: string) => TResult,
    toSelectAllPropertiesOf: (obj: unknown) => TResult,
    toSetColumn: (column: string, value?: string) => TResult,
    toUseColumnsInCorrectOrder: (...columns: string []) => TResult,
    toUseWhereClause: (comparison: string) => TResult,
    toOrderBy: (column: string) => TResult,
}

declare global {
    namespace jest {
        interface Expect extends SqlStatementMatchers {}
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
        interface Matchers<R, T = {}> extends SqlStatementMatchers<R> {}
        interface InverseAsymmetricMatchers extends SqlStatementMatchers {}
    }
}

export {};