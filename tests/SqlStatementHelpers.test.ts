import "../src/SqlStatementHelpers";

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
});