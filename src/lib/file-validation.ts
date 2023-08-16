const fs = require('fs').promises;

/*
 * Checks if a filename is valid
 * Arguments:
 *   file: the filename to check (including extension)
 *   extension: the extension to check against (example: 'txt' or ['txt', 'md'])
 * Return: true if the filename is valid, throws respective error otherwise
 */
function isValidFilename(file: string, extension?: string | string[]): boolean {
    // Validate if file is a string
    const filenameRegex = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9]+)?$/;
    if (!filenameRegex.test(file)) {
        throw new Error(`Filename '${file}' is not valid`);
    }

    // Validate if file matches extension or extensions
    if (extension) {
        if (typeof extension === 'string') {
            if (file.split('.').pop() !== extension) {
                throw new Error(`Filename '${file}' does not match extension '.${extension}'`);
            }
        } else {
            if (!extension.includes(file.split('.').pop() as string)) {
                throw new Error(`Filename '${file}' does not match any of the extensions '${extension}'`);
            }
        }
    }

    return true;
}

async function isExistentFile(file: string): Promise<boolean> {
    // TODO - Check if works
    try {
        await fs.stat(file);
        return true;
    } catch (error) {
        return false;
    }
}

export { isValidFilename, isExistentFile };
