import { expect } from "@jest/globals";
// biome-ignore lint/correctness/noUndeclaredDependencies: Is installed with jest.
import type { SyncExpectationResult } from "expect";

interface SelectOptions {
	distinct?: boolean;
}

interface SqlStatementMatchers<TResult = unknown> {
	toSelectFromTable: (table: string, options?: SelectOptions) => TResult;
	toReplaceIntoTable: (table: string) => TResult;
	toInsertIntoTable: (table: string, options?: InsertOptions) => TResult;
	toUpdateTable: (table: string) => TResult;
	toDeleteFromTable: (table: string) => TResult;
	toJoinTable: (table: string) => TResult;
	toSelectAllPropertiesOf: (obj: unknown) => TResult;
	toSelectCount: () => TResult;
	toSetColumn: (column: string, value?: string) => TResult;
	toInsertValues: () => TResult;
	toUseColumnsInCorrectOrder: (...columns: string[]) => TResult;
	toUseWhereClause: (comparison: string) => TResult;
	toOrderBy: (column: string) => TResult;
	toGroupBy: (column: string) => TResult;
}

interface InsertOptions {
	or?: "ABORT" | "FAIL" | "IGNORE" | "REPLACE" | "ROLLBACK";
	columns?: string[];
	onConflict?: {
		keys: string[];
		updateSet?: boolean;
	};
}

declare module "expect" {
	// biome-ignore lint/style/useNamingConvention: This needs to be named this way.
	interface Matchers<R extends void | Promise<void>, T = unknown> extends SqlStatementMatchers<R> {}

	interface InverseAsymmetricMatchers extends SqlStatementMatchers {}
}

declare global {
	// biome-ignore lint/style/noNamespace: We want it to work the old way too.
	namespace jest {
		interface Expect extends SqlStatementMatchers {}

		// biome-ignore lint/style/useNamingConvention: This needs to be named this way.
		interface Matchers<R extends void | Promise<void>, T = unknown> extends SqlStatementMatchers<R> {}

		interface InverseAsymmetricMatchers extends SqlStatementMatchers {}
	}
}

const selectRegex = /\bSELECT\b/iu;
const selectDistinctRegex = /\bSELECT\s+DISTINCT\b/iu;
const onConflictRegex = /\bON\s+CONFLICT\b/iu;
const doUpdateSetRegex = /\bDO\s+UPDATE\s+SET\b/iu;
const selectCountRegex = /\bSELECT(?<space>\s|\n)+COUNT\(\*\)/iu;
const valuesRegex = /\bVALUES\s+\(/iu;
const fromRegex = /\bFROM\b/u;

expect.extend({
	toSelectFromTable(statement: string, table: string, options?: SelectOptions) {
		const useDistinct = options?.distinct === true;
		const pass =
			(useDistinct ? selectDistinctRegex : selectRegex).test(statement) &&
			new RegExp(String.raw`\bFROM\s+${escapeRegExp(table)}\b`, "ui").test(statement);
		const distinctPart = useDistinct ? " distinct" : "";

		return createMatchResult(
			pass,
			`expected statement to select${distinctPart} from ${table}.`,
			`expected statement not to select${distinctPart} from ${table}.`,
		);
	},

	toReplaceIntoTable(statement: string, table: string) {
		const pass = new RegExp(String.raw`\bREPLACE\s+INTO\s+${escapeRegExp(table)}\b`, "iu").test(statement);

		return createMatchResult(
			pass,
			`expected statement to replace into ${table}.`,
			`expected statement not to replace into ${table}.`,
		);
	},

	toInsertIntoTable(statement: string, table: string, options?: InsertOptions) {
		let orStatement = "";
		let orMessage = "";
		let columnsMessage = "";
		let conflictMessage = "";

		if (options?.or) {
			orStatement = String.raw`\s+OR\s+${options.or}`;
			orMessage = ` or ${options.or.toLowerCase()}`;
		}

		let pass = new RegExp(String.raw`\bINSERT${orStatement}\s+INTO\s+${escapeRegExp(table)}\b`, "iu").test(statement);

		const onConflictIndex = statement.search(onConflictRegex);

		if (options?.onConflict) {
			conflictMessage = `, using conflict clause with columns ${options.onConflict.keys.join(", ")}`;

			if (onConflictIndex === -1) {
				pass = false;
			}

			let statementPart = statement.slice(onConflictIndex);

			for (const column of options.onConflict.keys) {
				const matches = findColumn(statementPart, column);

				if (!matches) {
					pass = false;

					continue;
				}

				statementPart = statementPart.slice(Math.max(0, matches.index + matches.length));
			}

			if (options.onConflict.updateSet) {
				if (!doUpdateSetRegex.test(statement.slice(onConflictIndex))) {
					pass = false;
				}

				const remainingColumns = new Set(options.columns);

				for (const column of options.onConflict.keys) {
					remainingColumns.delete(column);
				}

				for (const column of remainingColumns) {
					const matches = findColumn(statementPart, column);

					if (!matches) {
						pass = false;

						continue;
					}

					statementPart = statementPart.slice(Math.max(0, matches.index + matches.length));
				}
			}
		}

		if (options?.columns) {
			columnsMessage = `, using columns ${options.columns.join(", ")}`;

			let statementPart = statement;

			if (options.onConflict) {
				statementPart = statementPart.slice(0, onConflictIndex);
			}

			for (const column of options.columns) {
				const matches = findColumn(statementPart, column);

				if (!matches) {
					pass = false;

					continue;
				}

				statementPart = statementPart.slice(Math.max(0, matches.index + matches.length));
			}
		}

		return createMatchResult(
			pass,
			`expected statement to insert${orMessage} into ${table}${columnsMessage}${conflictMessage}.`,
			`expected statement not to insert${orMessage} into ${table}${columnsMessage}${conflictMessage}.`,
		);
	},

	toUpdateTable(statement: string, table: string) {
		const pass = new RegExp(String.raw`\bUPDATE\s+${escapeRegExp(table)}\b`, "iu").test(statement);

		return createMatchResult(pass, `expected statement to update ${table}.`, `expected statement not to update ${table}.`);
	},

	toDeleteFromTable(statement: string, table: string) {
		const pass = new RegExp(String.raw`\bDELETE\s+FROM\s+${escapeRegExp(table)}\b`, "iu").test(statement);

		return createMatchResult(
			pass,
			`expected statement to delete from ${table}.`,
			`expected statement not to delete from ${table}.`,
		);
	},

	toJoinTable(statement: string, table: string) {
		const pass = new RegExp(String.raw`\bJOIN\s+${escapeRegExp(table)}\b`, "iu").test(statement);

		return createMatchResult(pass, `expected statement to join ${table}.`, `expected statement not to join ${table}.`);
	},

	toSelectAllPropertiesOf(statement: string, obj: unknown) {
		const field = verifySelectsAllColumns(statement, ...Object.getOwnPropertyNames(obj));

		if (field) {
			return createMatchResult(false, `expected column ${field} to be selected.`, `expected field ${field} not to be selected.`);
		}

		return createMatchResult(true, "expected to select all columns of object.", "expected to not select all fields of object.");
	},

	toSelectCount(statement: string) {
		const pass = selectCountRegex.test(statement);

		return createMatchResult(pass, "expected statement to select COUNT(*).", "expected statement not to select COUNT(*).");
	},

	toSetColumn(statement: string, column: string, value?: string) {
		const pass = new RegExp(String.raw`\bSET\b(.|\n)+${escapeRegExp(column)}\s*=\s*${escapeRegExp(value ?? "?")}`, "iu").test(
			statement,
		);

		return createMatchResult(
			pass,
			`expected statement to set column ${column}.`,
			`expected statement not to set column ${column}.`,
		);
	},

	toInsertValues(statement: string) {
		const pass = valuesRegex.test(statement);

		return createMatchResult(pass, "expected statement to insert values.", "expected statement not to insert values.");
	},

	toUseColumnsInCorrectOrder(statement: string, ...columns: string[]) {
		let statementPart = statement;

		for (const column of columns) {
			const matches = findColumn(statementPart, column);

			if (!matches) {
				return createMatchResult(
					false,
					`expected column ${column} to be used in correct place.`,
					`expected column ${column} not to be used in correct place.`,
				);
			}

			statementPart = statementPart.slice(Math.max(0, matches.index + matches.length));
		}

		return createMatchResult(
			true,
			"expected columns to be used in correct order.",
			"expected columns not to be used in correct order.",
		);
	},

	toUseWhereClause(statement: string, comparison: string) {
		const pass = new RegExp(String.raw`\bWHERE\b(.|\n)+${escapeRegExp(comparison)}`, "iu").test(statement);

		return createMatchResult(
			pass,
			`expected statement to use where clause ${comparison}.`,
			`expected statement not use where clause ${comparison}.`,
		);
	},

	toOrderBy(statement: string, column: string) {
		const pass = new RegExp(String.raw`\bORDER\s+BY\b(\s|,|\n)+${escapeRegExp(column)}`, "iu").test(statement);

		return createMatchResult(
			pass,
			`expected statement to order by column ${column}.`,
			`expected statement not to order by column ${column}.`,
		);
	},

	toGroupBy(statement: string, column: string) {
		const pass = new RegExp(String.raw`\bGROUP\s+BY\b(\s|,|\n)+${escapeRegExp(column)}`, "iu").test(statement);

		return createMatchResult(
			pass,
			`expected statement to group by column ${column}.`,
			`expected statement not to group by column ${column}.`,
		);
	},
});

function verifySelectsAllColumns(statement: string, ...fields: string[]): string | null {
	const fromIndex = statement.search(fromRegex);

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

function escapeRegExp(value: string): string {
	return value.replaceAll(/[.*+?^${}()|[\]\\]/giu, String.raw`\$&`);
}

function findColumn(statement: string, field: string): RegExpExecArray | null {
	const fieldRegex = new RegExp(String.raw`\b${escapeRegExp(field)}\b`, "iu");
	const matches = fieldRegex.exec(statement);

	return matches;
}

function createMatchResult(pass: boolean, positiveMessage: string, negativeMessage: string): SyncExpectationResult {
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
