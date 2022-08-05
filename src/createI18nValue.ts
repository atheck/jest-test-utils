function createI18nValue (key: string, options?: unknown): string {
    if (options && typeof options === "object") {
        const cleanedOptions = { ...options, interpolation: undefined };

        delete cleanedOptions.interpolation;

        return JSON.stringify({ key, options: cleanedOptions });
    }

    return key;
}

export {
    createI18nValue,
};