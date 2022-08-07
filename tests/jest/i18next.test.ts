import i18next from "i18next";

describe("i18next", () => {
    beforeAll(async () => i18next.init({
        resources: {
            translation: {
                de: {
                    Test: "Test",
                },
            },
        },
    }));

    it("works with simple translation", () => {
        // act
        const translation = i18next.t("Test");

        // assert
        expect(translation).toBe("Test");
    });

    it("works with options object", () => {
        // act
        const translation = i18next.t("Test", { value: 23 });

        // assert
        expect(translation).toBe(JSON.stringify({ key: "Test", options: { value: 23 } }));
        expect(translation).toBe(i18next.t("Test", { value: 23 }));
    });
});