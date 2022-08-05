function isInstalled (...names: string []): boolean {
    for (const name of names) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require(name);
        } catch {
            return false;
        }
    }

    return true;
}

export {
    isInstalled,
};