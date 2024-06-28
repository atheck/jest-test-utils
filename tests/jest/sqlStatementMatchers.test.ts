/* eslint-disable jest/require-hook */
import { describe, expect, it } from "@jest/globals";

describe("SqlStatementHelpers", () => {
	describe("toSelectFromTable", () => {
		const statement = "SELECT FROM table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toSelectFromTable("table");
			expect(casedStatement).not.toSelectFromTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toSelectFromTable("wrong")).toThrow("expected statement to select from wrong.");
			expect(() => expect(casedStatement).not.toSelectFromTable("table")).toThrow("expected statement not to select from table.");
		});
	});

	describe("toSelectDistinctFromTable", () => {
		const correctStatement = "SELECT DISTINCT FROM table";
		const incorrectStatement = "SELECT FROM table";

		itCasing(correctStatement, "correct positive", (casedStatement) => {
			// act
			expect(casedStatement).toSelectDistinctFromTable("table");
			expect(casedStatement).not.toSelectDistinctFromTable("wrong");
		});

		itCasing(incorrectStatement, "incorrect positive", (casedStatement) => {
			// act
			expect(casedStatement).not.toSelectDistinctFromTable("table");
			expect(casedStatement).not.toSelectDistinctFromTable("wrong");
		});

		itCasing(correctStatement, "correct negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toSelectDistinctFromTable("wrong")).toThrow(
				"expected statement to select distinct from wrong.",
			);
			expect(() => expect(casedStatement).not.toSelectDistinctFromTable("table")).toThrow(
				"expected statement not to select distinct from table.",
			);
		});

		itCasing(incorrectStatement, "incorrect negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toSelectDistinctFromTable("wrong")).toThrow(
				"expected statement to select distinct from wrong.",
			);
			expect(() => expect(casedStatement).toSelectDistinctFromTable("table")).toThrow(
				"expected statement to select distinct from table.",
			);
		});
	});

	describe("toReplaceIntoTable", () => {
		const statement = "REPLACE INTO table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toReplaceIntoTable("table");
			expect(casedStatement).not.toReplaceIntoTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toReplaceIntoTable("wrong")).toThrow("expected statement to replace into wrong.");
			expect(() => expect(casedStatement).not.toReplaceIntoTable("table")).toThrow(
				"expected statement not to replace into table.",
			);
		});
	});

	describe("toInsertIntoTable", () => {
		const statement = "INSERT INTO table";
		const replaceStatement = "INSERT OR REPLACE INTO table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toInsertIntoTable("table");
			expect(casedStatement).not.toInsertIntoTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toInsertIntoTable("wrong")).toThrow("expected statement to insert into wrong.");
			expect(() => expect(casedStatement).not.toInsertIntoTable("table")).toThrow("expected statement not to insert into table.");
		});

		itCasing(replaceStatement, "positive with or option", (casedStatement) => {
			// act
			expect(casedStatement).toInsertIntoTable("table", { or: "REPLACE" });
			expect(casedStatement).not.toInsertIntoTable("table", { or: "FAIL" });
		});

		itCasing(replaceStatement, "negative with or option", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toInsertIntoTable("table")).toThrow("expected statement to insert into table.");
			expect(() => expect(casedStatement).not.toInsertIntoTable("table", { or: "REPLACE" })).toThrow(
				"expected statement not to insert or replace into table.",
			);
		});
	});

	describe("toUpdateTable", () => {
		const statement = "UPDATE table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toUpdateTable("table");
			expect(casedStatement).not.toUpdateTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toUpdateTable("wrong")).toThrow("expected statement to update wrong.");
			expect(() => expect(casedStatement).not.toUpdateTable("table")).toThrow("expected statement not to update table.");
		});
	});

	describe("toDeleteFromTable", () => {
		const statement = "DELETE FROM table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toDeleteFromTable("table");
			expect(casedStatement).not.toDeleteFromTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toDeleteFromTable("wrong")).toThrow("expected statement to delete from wrong.");
			expect(() => expect(casedStatement).not.toDeleteFromTable("table")).toThrow("expected statement not to delete from table.");
		});
	});

	describe("toJoinTable", () => {
		const statement = "JOIN table";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toJoinTable("table");
			expect(casedStatement).not.toJoinTable("wrong");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toJoinTable("wrong")).toThrow("expected statement to join wrong.");
			expect(() => expect(casedStatement).not.toJoinTable("table")).toThrow("expected statement not to join table.");
		});
	});

	describe("toSelectAllPropertiesOf", () => {
		const Schema = {
			id: "id",
			value: "value",
		};
		const positiveStatement = "SELECT id, value FROM\ntable";
		const negativeStatement = "SELECT id FROM table";
		const negativeStatementCase = "select ID, VALUE from table";
		const negativeStatementWhere = "SELECT id FROM table WHERE value = ?";

		it("positive", () => {
			// act
			expect(positiveStatement).toSelectAllPropertiesOf(Schema);
			expect(negativeStatement).not.toSelectAllPropertiesOf(Schema);
			expect(negativeStatementWhere).not.toSelectAllPropertiesOf(Schema);
		});

		it("negative", () => {
			// act
			expect(() => expect(negativeStatement).toSelectAllPropertiesOf(Schema)).toThrow("expected column value to be selected.");
			expect(() => expect(negativeStatementCase).toSelectAllPropertiesOf(Schema)).toThrow("expected column id to be selected.");
			expect(() => expect(positiveStatement).not.toSelectAllPropertiesOf(Schema)).toThrow(
				"expected to not select all fields of object.",
			);
		});
	});

	describe("toSelectCount", () => {
		const positiveStatement = "SELECT COUNT(*) FROM table";
		const positiveStatementMultiline = "SELECT\nCOUNT(*)\nFROM table";
		const negativeStatement = "SELECT id FROM table";

		itCasing(positiveStatement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toSelectCount();
		});

		itCasing(positiveStatementMultiline, "positive multiline", (casedStatement) => {
			// act
			expect(casedStatement).toSelectCount();
		});

		itCasing(negativeStatement, "negative positive", (casedStatement) => {
			// act
			expect(casedStatement).not.toSelectCount();
		});

		itCasing(negativeStatement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toSelectCount()).toThrow("expected statement to select COUNT(*).");
			expect(() => expect(positiveStatement).not.toSelectCount()).toThrow("expected statement not to select COUNT(*).");
		});

		itCasing(positiveStatement, "positive negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).not.toSelectCount()).toThrow("expected statement not to select COUNT(*).");
		});
	});

	describe("toSetColumn", () => {
		const statement = "UPDATE table SET value = ?";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toSetColumn("value");
			expect(casedStatement).not.toSetColumn("id");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toSetColumn("id")).toThrow("expected statement to set column id.");
			expect(() => expect(casedStatement).not.toSetColumn("value")).toThrow("expected statement not to set column value.");
		});
	});

	describe("toInsertValues", () => {
		const positiveStatement = "INSERT INTO table (id) VALUES (1)";
		const negativeStatement = "SELECT id FROM table";

		itCasing(positiveStatement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toInsertValues();
		});

		itCasing(negativeStatement, "negative positive", (casedStatement) => {
			// act
			expect(casedStatement).not.toInsertValues();
		});

		itCasing(negativeStatement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toInsertValues()).toThrow("expected statement to insert values.");
		});

		itCasing(positiveStatement, "positive negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).not.toInsertValues()).toThrow("expected statement not to insert values.");
		});
	});

	describe("toUseColumnsInCorrectOrder", () => {
		const statement = "UPDATE table SET id = ?, value = ?";
		const statementCasing = "update table set ID = ?, VALUE = ?";

		it("positive", () => {
			// act
			expect(statement).toUseColumnsInCorrectOrder("id", "value");
			expect(statement).not.toUseColumnsInCorrectOrder("value", "id");
		});

		it("negative", () => {
			// act
			expect(() => expect(statement).toUseColumnsInCorrectOrder("value", "id")).toThrow(
				"expected column id to be used in correct place.",
			);
			expect(() => expect(statementCasing).toUseColumnsInCorrectOrder("id", "value")).toThrow(
				"expected column id to be used in correct place.",
			);
			expect(() => expect(statement).not.toUseColumnsInCorrectOrder("id", "value")).toThrow(
				"expected columns not to be used in correct order.",
			);
		});
	});

	describe("toUseWhereClause", () => {
		const statement = "SELECT id, value FROM table WHERE id = ?";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toUseWhereClause("id = ?");
			expect(casedStatement).not.toUseWhereClause("value = ?");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toUseWhereClause("value = ?")).toThrow(
				"expected statement to use where clause value = ?.",
			);
			expect(() => expect(casedStatement).not.toUseWhereClause("id = ?")).toThrow(
				"expected statement not use where clause id = ?.",
			);
		});
	});

	describe("toOrderBy", () => {
		const statement = "SELECT id, value FROM table GROUP BY value ORDER BY id";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toOrderBy("id");
			expect(casedStatement).not.toOrderBy("value");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toOrderBy("value")).toThrow("expected statement to order by column value.");
			expect(() => expect(casedStatement).not.toOrderBy("id")).toThrow("expected statement not to order by column id.");
		});
	});

	describe("toGroupBy", () => {
		const statement = "SELECT id, value FROM table GROUP BY id ORDER BY value";

		itCasing(statement, "positive", (casedStatement) => {
			// act
			expect(casedStatement).toGroupBy("id");
			expect(casedStatement).not.toGroupBy("value");
		});

		itCasing(statement, "negative", (casedStatement) => {
			// act
			expect(() => expect(casedStatement).toGroupBy("value")).toThrow("expected statement to group by column value.");
			expect(() => expect(casedStatement).not.toGroupBy("id")).toThrow("expected statement not to group by column id.");
		});
	});
});

function itCasing(statement: string, name: string, callback: (statement: string) => void): void {
	// eslint-disable-next-line jest/consistent-test-it, jest/require-top-level-describe, jest/expect-expect, jest/valid-title
	it.each([statement, statement.toUpperCase(), statement.toLowerCase()])(name, callback);
}
