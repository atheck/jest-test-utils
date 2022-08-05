import { createI18nValue } from "./createI18nValue";
import { isInstalled } from "./isInstalled";

function mockCreateI18nValue (key: string, options?: unknown): string {
    return createI18nValue(key, options);
}

if (isInstalled("jest", "i18next")) {
    jest.mock("i18next", () => ({
        async init (): Promise<void> {
            return undefined;
        },
        // eslint-disable-next-line id-length
        t: mockCreateI18nValue,
    }));
}