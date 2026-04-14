# jest-test-utils

![Build](https://github.com/atheck/jest-test-utils/actions/workflows/release.yml/badge.svg)
![npm](https://img.shields.io/npm/v/jest-test-utils)

Utility functions for use in tests using jest.

## Installation

`npm install --save-dev jest-test-utils`

## Usage

### Setup jest

Add this to your jest config to extend jest `expect` with [SQL statement matchers](#sql-statement-matchers):

```json
{
    "setupFilesAfterEnv": ["node_modules/jest-test-utils/dist/jest/sqlStatementMatchers.js"]
}
```

### SQL statement matchers

| function | description |
| --- | --- |
| `toSelectFromTable` | Verify that the sql statement selects from the specified table. |
| `toSelectDistinctFromTable` | Verify that the sql statement selects distinct values from the specified table. |
| `toReplaceIntoTable` | Verify that the sql statement replaces into the specified table. |
| `toInsertIntoTable` | Verify that the sql statement inserts into the specified table. In the optional options object you can specify an `OR` action, the columns in the correct order to be set, and columns used in an `ON CONFLICT` clause. |
| `toUpdateTable` | Verify that the sql statement updates the specified table. |
| `toDeleteFromTable` | Verify that the sql statement deletes from the specified table. |
| `toJoinTable` | Verify that the sql statement joins another table. |
| `toSelectAllPropertiesOf` | Verify that the sql statement selects all the columns of the specified DTO object. |
| `toSetColumn` | Verify that the sql statement sets the value of the specified column. |
| `toInsertValues` | Verify that the sql statement inserts values into a table. |
| `toUseColumnsInCorrectOrder` | Verify that the sql statement uses all specified columns in the correct order. |
| `toUseWhereClause` | Verify that the sql statement uses the specified where clause. |
| `toOrderBy` | Verify that the sql statement orders by the specified column. |
| `toGroupBy` | Verify that the sql statement groups the result by the specified column. |

#### toInsertIntoTable

This function can be used to verify that an SQL statement inserts into a table. The following example checks if the SQL statement inserts into the table `table` setting the columns `column1` and `column2` in the correct order and uses the `column1` in an `ON CONFLICT` clause and still setting `column2`.

```ts
expect(`
    INSERT INTO table (
        column1
        , column2
    )
    VALUES (value1, value2)
    ON CONFLICT (column1) DO UPDATE SET
        column2 = excluded.column2
`).toInsertIntoTable('table', {
    columns: ['column1', 'column2'],
    onConflict: {
        keys: ['column1'],
        updateSet: true,
    },
});
```

### manyOf

This function can be used to create multiple (exactly three) test objects.

```ts
interface MyObject {
    id: string,
    value: number,
}

// Function to create an instance of MyObject with random values
function createMyObject (template?: Partial<MyObject>): MyObject {
    return {
        id: getRandomId(),
        value: getRandomValue(),
        ...template,
    };
}

// In a test:
const myObjects = manyOf(createMyObject);

// Or setting fix values
const myObject = manyOf(() => createMyObject({ value: 42 }));

// Or setting values by index
const myObject = manyOf(createMyObject, index => ({ id: `${index}` }));
```
