export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Add space between camelCase text.
 */
export const unCamelCase = (str: string, caps: boolean = false) => {
    const spacedString = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');

    if (caps) {
        return spacedString;
    }

    const lowercasedString = spacedString.toLowerCase(); // add space between camelCase text
    return lowercasedString;
};

/**
 * Parses name out of email and set proper casing
 */
export const getName = (email: string): string => {
    if (email && email.includes('@')) {
        const splitName = email.split('@')[0];
        if (splitName.includes('.')) {
            const fullName = splitName.split('.');
            const mappedName = fullName.map((n: string) => capitalize(n));
            return mappedName.join(' ');
        }

        return splitName;
    }

    return '';
};

/**
 * SnakeCase
 */

export function snakeCase(str: string): string {
    return str.toLowerCase().replace(' ', '_');
}
