interface CustomMatchers<TResult = unknown> {
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
        interface Expect extends CustomMatchers {}
        interface Matchers<TResult> extends CustomMatchers<TResult> {}
        interface InverseAsymmetricMatchers extends CustomMatchers {}
    }
}

export {};