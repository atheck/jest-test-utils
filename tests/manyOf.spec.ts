import { manyOf } from "../src";

describe("manyOf", () => {
    it("calls creator function without a template", () => {
        // arrange
        const mockCreator = jest.fn();

        // act
        manyOf(mockCreator);

        // assert
        expect(mockCreator).toHaveBeenCalledTimes(3);
        expect(mockCreator).toHaveBeenCalledWith(undefined);
    });

    it("calls creator function with correct template", () => {
        // arrange
        const mockCreator = jest.fn();

        // act
        manyOf(mockCreator, index => ({ index }));

        // assert
        expect(mockCreator).toHaveBeenCalledTimes(3);
        expect(mockCreator).toHaveBeenNthCalledWith(1, { index: 0 });
        expect(mockCreator).toHaveBeenNthCalledWith(2, { index: 1 });
        expect(mockCreator).toHaveBeenNthCalledWith(3, { index: 2 });
    });

    it("returns correct result", () => {
        // arrange
        const mockCreator = (template?: Partial<{ index: number }>): { index: number } => ({ index: 0, ...template });

        // act
        const result = manyOf(mockCreator, index => ({ index }));

        // assert
        expect(result).toStrictEqual([
            { index: 0 },
            { index: 1 },
            { index: 2 },
        ]);
    });
});