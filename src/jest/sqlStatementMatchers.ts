expect.extend({
    toSelectFromTable (statement: string, table: string) {
        const pass = (/\bSELECT\b/u).test(statement) && new RegExp(`\\bFROM\\s+${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to select from ${table}.`, `expected statement not to select from ${table}.`);
    },

    toSelectDistinctFromTable (statement: string, table: string) {
        const pass = (/\bSELECT\s+DISTINCT\b/u).test(statement) && new RegExp(`\\bFROM\\s+${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to select distinct from ${table}.`, `expected statement not to select distinct from ${table}.`);
    },

    toReplaceIntoTable (statement: string, table: string) {
        const pass = new RegExp(`\\bREPLACE INTO ${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to replace into ${table}.`, `expected statement not to replace into ${table}.`);
    },

    toInsertIntoTable (statement: string, table: string) {
        const pass = new RegExp(`\\bINSERT INTO ${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to insert into ${table}.`, `expected statement not to insert into ${table}.`);
    },

    toUpdateTable (statement: string, table: string) {
        const pass = new RegExp(`\\bUPDATE ${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to update ${table}.`, `expected statement not to update ${table}.`);
    },

    toDeleteFromTable (statement: string, table: string) {
        const pass = new RegExp(`\\bDELETE FROM ${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to delete from ${table}.`, `expected statement not to delete from ${table}.`);
    },

    toSelectAllPropertiesOf (statement: string, obj: unknown) {
        const field = verifySelectsAllColumns(statement, ...Object.getOwnPropertyNames(obj));

        if (field) {
            return createMatchResult(false, `expected column ${field} to be selected.`, `expected field ${field} not to be selected.`);
        }

        return createMatchResult(true, "expected to select all columns of object.", "expected to not select all fields of object.");
    },

    toSetColumn (statement: string, column: string, value?: string) {
        const pass = new RegExp(`\\bSET\\b(.|\\n)+${escapeRegExp(column)}\\s*=\\s*${escapeRegExp(value ?? "?")}`, "u").test(statement);

        return createMatchResult(pass, `expected statement to set column ${column}.`, `expected statement not to set column ${column}.`);
    },

    toUseColumnsInCorrectOrder (statement: string, ...columns: string []) {
        let statementPart = statement;

        for (const column of columns) {
            const matches = findColumn(statementPart, column);

            if (!matches) {
                return createMatchResult(false, `expected column ${column} to be used in correct place.`, `expected column ${column} not to be used in correct place.`);
            }

            statementPart = statementPart.slice(Math.max(0, matches.index + matches.length));
        }

        return createMatchResult(true, "expected columns to be used in correct order.", "expected columns not to be used in correct order.");
    },

    toUseWhereClause (statement: string, comparison: string) {
        const pass = new RegExp(`\\bWHERE\\b(.|\\n)+${escapeRegExp(comparison)}`, "u").test(statement);

        return createMatchResult(pass, `expected statement to use where clause ${comparison}.`, `expected statement not use where clause ${comparison}.`);
    },

    toOrderBy (statement: string, column: string) {
        const pass = new RegExp(`\\bORDER BY\\b(\\s|,|\\n)+${escapeRegExp(column)}`, "u").test(statement);

        return createMatchResult(pass, `expected statement to order by column ${column}.`, `expected statement not to order by column ${column}.`);
    },

    toGroupBy (statement: string, column: string) {
        const pass = new RegExp(`\\bGROUP BY\\b(\\s|,|\\n)+${escapeRegExp(column)}`, "u").test(statement);

        return createMatchResult(pass, `expected statement to group by column ${column}.`, `expected statement not to group by column ${column}.`);
    },
});

function verifySelectsAllColumns (statement: string, ...fields: string []): string | null {
    const fromIndex = statement.indexOf("FROM ");

    for (const field of fields) {
        const match = findColumn(statement, field);

        if (!match) {
            return field;
        }
        if (match.index > fromIndex) {
            return field;
        }
    }

    return null;
}

function escapeRegExp (value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/ug, "\\$&");
}

function findColumn (statement: string, field: string): RegExpExecArray | null {
    const fieldRegex = new RegExp(`\\b${escapeRegExp(field)}\\b`, "u");
    const matches = fieldRegex.exec(statement);

    return matches;
}

function createMatchResult (pass: boolean, positiveMessage: string, negativeMessage: string): jest.CustomMatcherResult {
    if (pass) {
        return {
            pass: true,
            message: () => negativeMessage,
        };
    }

    return {
        pass: false,
        message: () => positiveMessage,
    };
}

export {};