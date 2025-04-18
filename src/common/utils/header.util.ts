function getHeaderStringValue(header: string | string[] | undefined, fallback = ''): string {
    if (!header) return fallback;
    return Array.isArray(header) ? header.join(', ') : header;
}

export const HeaderUtil = {
    getHeaderStringValue
};

