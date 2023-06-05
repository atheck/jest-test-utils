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

If you want to mock the `i18next` module, you can also add this to your jest config:

```json
{
    "setupFilesAfterEnv": ["node_modules/jest-test-utils/dist/jest/mockI18next.js"]
}
```

After this mock is applied `i18next.t()` no longer returns the translation of the provided key but instead returns the key itself, or an object with the translation key and provided options. This way you can use the same function to test that the correct translation values were provided.

### SQL statement matchers

| function | description |
| --- | --- |
| `toSelectFromTable` | Verify that the sql statement selects from the specified table. |
| `toSelectDistinctFromTable` | Verify that the sql statement selects distinct values from the specified table. |
| `toReplaceIntoTable` | Verify that the sql statement replaces into the specified table. |
| `toInsertIntoTable` | Verify that the sql statement inserts into the specified table. |
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
