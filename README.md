# jest-test-utils

![Build](https://github.com/atheck/jest-test-utils/actions/workflows/release.yml/badge.svg)
![npm](https://img.shields.io/npm/v/jest-test-utils)

Utility functions for use in tests using jest.

## Installation

`npm install --save-dev jest-test-utils`

## Usage

### jest expect extensions

#### Setup jest

Add this to your jest config to setup SQL statement matchers:

```json
{
    "setupFilesAfterEnv": ["node_modules/jest-test-utils/dist/jest/setup.js"]
}
```

#### SQL statement matchers

| function | description |
| --- | --- |
| `toSelectFromTable` | Verify that a sql statement selects from the specified table. |
| `toReplaceIntoTable` | Verify that  |
| `toInsertIntoTable` | Verify that  |
| `toUpdateTable` | Verify that  |
| `toDeleteFromTable` | Verify that  |
| `toSelectAllPropertiesOf` | Verify that  |
| `toSetColumn` | Verify that  |
| `toUseColumnsInCorrectOrder` | Verify that  |
| `toUseWhereClause` | Verify that  |
| `toOrderBy` | Verify that  |

### manyOf

...
