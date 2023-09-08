import { isInstalled } from "../internal/isInstalled";

function mockCreateI18nValue (key: string, options?: unknown): string {
    if (options && typeof options === "object") {
        const cleanedOptions = { ...options, interpolation: undefined };

        delete cleanedOptions.interpolation;

        return JSON.stringify({ key, options: cleanedOptions });
    }

    return key;
}

if (isInstalled("jest", "i18next")) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    jest.mock("i18next", () => ({
        ...jest.requireActual("i18next"),
        async init (): Promise<void> {
            return undefined;
        },
        // eslint-disable-next-line id-length
        t: mockCreateI18nValue,
    }));
}