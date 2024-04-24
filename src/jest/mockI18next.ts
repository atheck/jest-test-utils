import { jest } from "@jest/globals";
import { isInstalled } from "../internal/isInstalled";

function mockCreateI18nValue(key: string, options?: unknown): string {
	if (options && typeof options === "object") {
		const cleanedOptions = { ...options, interpolation: undefined };

		// biome-ignore lint/performance/noDelete: Used in tests only.
		delete cleanedOptions.interpolation;

		return JSON.stringify({ key, options: cleanedOptions });
	}

	return key;
}

if (isInstalled("jest", "i18next")) {
	jest.mock("i18next", () => ({
		...jest.requireActual<typeof import("i18next")>("i18next"),
		async init(): Promise<void> {
			return undefined;
		},
		// eslint-disable-next-line id-length
		t: mockCreateI18nValue,
	}));
}
