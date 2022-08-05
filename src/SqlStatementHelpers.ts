expect.extend({
    toSelectFromTable (statement: string, table: string) {
        const pass = (/\bSELECT\b/u).test(statement) && new RegExp(`\\bFROM ${escapeRegExp(table)}\\b`, "u").test(statement);

        return createMatchResult(pass, `expected statement to select from ${table}.`, `expected statement not to select from ${table}.`);
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
});

function escapeRegExp (value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/ug, "\\$&");
}

function createMatchResult (pass: boolean, positiveMessage: string, negativeMessage: string): jest.CustomMatcherResult {
    if (pass) {
        return {
            pass,
            message: () => negativeMessage,
        };
    }

    return {
        pass,
        message: () => positiveMessage,
    };
}

export {};