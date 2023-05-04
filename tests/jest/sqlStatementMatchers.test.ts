describe("SqlStatementHelpers", () => {
    describe("toSelectFromTable", () => {
        const statement = "SELECT FROM table";

        it("positive", () => {
            // act
            expect(statement).toSelectFromTable("table");
            expect(statement).not.toSelectFromTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toSelectFromTable("wrong")).toThrow("expected statement to select from wrong.");
            expect(() => expect(statement).not.toSelectFromTable("table")).toThrow("expected statement not to select from table.");
        });
    });

    describe("toSelectDistinctFromTable", () => {
        const correctStatement = "SELECT DISTINCT FROM table";
        const incorrectStatement = "SELECT FROM table";

        it("positive", () => {
            // act
            expect(correctStatement).toSelectDistinctFromTable("table");
            expect(correctStatement).not.toSelectDistinctFromTable("wrong");
            expect(incorrectStatement).not.toSelectDistinctFromTable("table");
            expect(incorrectStatement).not.toSelectDistinctFromTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(correctStatement).toSelectDistinctFromTable("wrong")).toThrow("expected statement to select distinct from wrong.");
            expect(() => expect(correctStatement).not.toSelectDistinctFromTable("table")).toThrow("expected statement not to select distinct from table.");
            expect(() => expect(incorrectStatement).toSelectDistinctFromTable("wrong")).toThrow("expected statement to select distinct from wrong.");
            expect(() => expect(incorrectStatement).toSelectDistinctFromTable("table")).toThrow("expected statement to select distinct from table.");
        });
    });

    describe("toReplaceIntoTable", () => {
        const statement = "REPLACE INTO table";

        it("positive", () => {
            // act
            expect(statement).toReplaceIntoTable("table");
            expect(statement).not.toReplaceIntoTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toReplaceIntoTable("wrong")).toThrow("expected statement to replace into wrong.");
            expect(() => expect(statement).not.toReplaceIntoTable("table")).toThrow("expected statement not to replace into table.");
        });
    });

    describe("toInsertIntoTable", () => {
        const statement = "INSERT INTO table";

        it("positive", () => {
            // act
            expect(statement).toInsertIntoTable("table");
            expect(statement).not.toInsertIntoTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toInsertIntoTable("wrong")).toThrow("expected statement to insert into wrong.");
            expect(() => expect(statement).not.toInsertIntoTable("table")).toThrow("expected statement not to insert into table.");
        });
    });

    describe("toUpdateTable", () => {
        const statement = "UPDATE table";

        it("positive", () => {
            // act
            expect(statement).toUpdateTable("table");
            expect(statement).not.toUpdateTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toUpdateTable("wrong")).toThrow("expected statement to update wrong.");
            expect(() => expect(statement).not.toUpdateTable("table")).toThrow("expected statement not to update table.");
        });
    });

    describe("toDeleteFromTable", () => {
        const statement = "DELETE FROM table";

        it("positive", () => {
            // act
            expect(statement).toDeleteFromTable("table");
            expect(statement).not.toDeleteFromTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toDeleteFromTable("wrong")).toThrow("expected statement to delete from wrong.");
            expect(() => expect(statement).not.toDeleteFromTable("table")).toThrow("expected statement not to delete from table.");
        });
    });

    describe("toJoinTable", () => {
        const statement = "JOIN table";

        it("positive", () => {
            // act
            expect(statement).toJoinTable("table");
            expect(statement).not.toJoinTable("wrong");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toJoinTable("wrong")).toThrow("expected statement to join wrong.");
            expect(() => expect(statement).not.toJoinTable("table")).toThrow("expected statement not to join table.");
        });
    });

    describe("toSelectAllPropertiesOf", () => {
        const Schema = {
            id: "id",
            value: "value",
        };
        const positiveStatement = "SELECT id, value FROM table";
        const negativeStatement = "SELECT id FROM table";
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
            expect(() => expect(positiveStatement).not.toSelectAllPropertiesOf(Schema)).toThrow("expected to not select all fields of object.");
        });
    });

    describe("toSetColumn", () => {
        const statement = "UPDATE table SET value = ?";

        it("positive", () => {
            // act
            expect(statement).toSetColumn("value");
            expect(statement).not.toSetColumn("id");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toSetColumn("id")).toThrow("expected statement to set column id.");
            expect(() => expect(statement).not.toSetColumn("value")).toThrow("expected statement not to set column value.");
        });
    });

    describe("toUseColumnsInCorrectOrder", () => {
        const statement = "UPDATE table SET id = ?, value = ?";

        it("positive", () => {
            // act
            expect(statement).toUseColumnsInCorrectOrder("id", "value");
            expect(statement).not.toUseColumnsInCorrectOrder("value", "id");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toUseColumnsInCorrectOrder("value", "id")).toThrow("expected column id to be used in correct place.");
            expect(() => expect(statement).not.toUseColumnsInCorrectOrder("id", "value")).toThrow("expected columns not to be used in correct order.");
        });
    });

    describe("toUseWhereClause", () => {
        const statement = "SELECT id, value FROM table WHERE id = ?";

        it("positive", () => {
            // act
            expect(statement).toUseWhereClause("id = ?");
            expect(statement).not.toUseWhereClause("value = ?");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toUseWhereClause("value = ?")).toThrow("expected statement to use where clause value = ?.");
            expect(() => expect(statement).not.toUseWhereClause("id = ?")).toThrow("expected statement not use where clause id = ?.");
        });
    });

    describe("toOrderBy", () => {
        const statement = "SELECT id, value FROM table GROUP BY value ORDER BY id";

        it("positive", () => {
            // act
            expect(statement).toOrderBy("id");
            expect(statement).not.toOrderBy("value");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toOrderBy("value")).toThrow("expected statement to order by column value.");
            expect(() => expect(statement).not.toOrderBy("id")).toThrow("expected statement not to order by column id.");
        });
    });

    describe("toGroupBy", () => {
        const statement = "SELECT id, value FROM table GROUP BY id ORDER BY value";

        it("positive", () => {
            // act
            expect(statement).toGroupBy("id");
            expect(statement).not.toGroupBy("value");
        });

        it("negative", () => {
            // act
            expect(() => expect(statement).toGroupBy("value")).toThrow("expected statement to group by column value.");
            expect(() => expect(statement).not.toGroupBy("id")).toThrow("expected statement not to group by column id.");
        });
    });
});

// eslint-disable-next-line jest/no-export
export {};