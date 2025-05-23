export const FILE_EXCEPTIONS = {
    FILE_FORMAT_NOT_VALID: {
        code: 'FILE_FORMAT_NOT_VALID',
        message: 'Not valid format. Only JPG, PNG, WEBP and PDF are allowed.',
    }
}
export const SIGNED_URL_EXPIRATION_TIME = 5 * 60; // 5 minutes
export const FILE_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
]