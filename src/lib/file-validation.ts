/**
 * Checks if a filename is valid and matches the given extension or extensions
 * @param file the filename to check (including extension)
 * @param extension the extension to check against (example: 'txt' or ['txt', 'md'])
 * @returns true if the filename is valid, false otherwise
 */
function isValidFilename(file: string, extension?: string | string[]): boolean {
    // Validate if file is a string
    const filenameRegex = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9]+)?$/;
    if (!filenameRegex.test(file)) {
        console.error(
            `Invalid filename: '${file}'. It should only contain letters, numbers, underscores, hyphens, and a valid extension.`,
        );
        return false;
    }

    // Validate if file matches extension or extensions
    if (extension) {
        const fileExtension = file.split('.').pop();

        if (typeof extension === 'string') {
            if (fileExtension !== extension) {
                console.error(`Filename '${file}' does not match the required extension '.${extension}'`);
                return false;
            }
        } else if (Array.isArray(extension) && extension.length > 0) {
            if (!extension.includes(fileExtension as string)) {
                console.error(
                    `Filename '${file}' does not match any of the required extensions: ${extension
                        .map((ext) => `'.${ext}'`)
                        .join(', ')}`,
                );
                return false;
            }
        } else {
            console.error('Invalid extension parameter. It should be a string or an array of strings.');
            return false;
        }
    }

    return true;
}

// TODO - Check if file exists

export { isValidFilename };
