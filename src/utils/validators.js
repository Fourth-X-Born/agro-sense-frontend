// ===================================================
// validators.js — Shared validation rules for AgroSense AI
// ===================================================

// Sri Lanka phone: local (0XXXXXXXXX) or international (+94XXXXXXXXX / 94XXXXXXXXX)
const SL_PHONE_REGEX = /^(?:\+94|94|0)[1-9]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a required text field.
 * @param {string} value
 * @param {string} label - Field name for error message
 * @param {number} minLength
 * @returns {string} error message or ""
 */
export function validateRequired(value, label = "This field", minLength = 1) {
    if (!value || !value.trim()) return `${label} is required.`;
    if (value.trim().length < minLength)
        return `${label} must be at least ${minLength} characters.`;
    return "";
}

/**
 * Validate email format.
 * @param {string} value
 * @returns {string} error message or ""
 */
export function validateEmail(value) {
    if (!value || !value.trim()) return "Email is required.";
    if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
    return "";
}

/**
 * Validate password strength.
 * Min 8 chars, at least 1 uppercase letter, at least 1 number.
 * @param {string} value
 * @returns {string} error message or ""
 */
export function validatePassword(value) {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number.";
    return "";
}

/**
 * Validate that confirmPassword matches newPassword.
 * @param {string} password
 * @param {string} confirm
 * @returns {string} error message or ""
 */
export function validateConfirmPassword(password, confirm) {
    if (!confirm) return "Please confirm your password.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
}

/**
 * Validate Sri Lanka phone number (optional field).
 * Only validates if a value is provided.
 * @param {string} value
 * @param {boolean} required
 * @returns {string} error message or ""
 */
export function validatePhone(value, required = false) {
    if (!value || !value.trim()) {
        if (required) return "Phone number is required.";
        return ""; // optional — no value is fine
    }
    if (!SL_PHONE_REGEX.test(value.trim()))
        return "Invalid phone number. Use format: 07XXXXXXXX or +94XXXXXXXXX";
    return "";
}

/**
 * Validate a positive number (e.g. price).
 * @param {string|number} value
 * @param {string} label
 * @returns {string} error message or ""
 */
export function validatePositiveNumber(value, label = "This field") {
    if (value === "" || value === null || value === undefined)
        return `${label} is required.`;
    const num = parseFloat(value);
    if (isNaN(num)) return `${label} must be a number.`;
    if (num <= 0) return `${label} must be greater than zero.`;
    return "";
}

/**
 * Validate a text message (min length).
 * @param {string} value
 * @param {number} minLength
 * @returns {string} error message or ""
 */
export function validateMessage(value, minLength = 10) {
    if (!value || !value.trim()) return "Message is required.";
    if (value.trim().length < minLength)
        return `Message must be at least ${minLength} characters.`;
    return "";
}

/**
 * Run multiple validators and return all field errors.
 * @param {Object} rules - { fieldName: errorString }
 * @returns {{ errors: Object, isValid: boolean }}
 */
export function runValidations(rules) {
    const errors = {};
    let isValid = true;
    for (const [field, error] of Object.entries(rules)) {
        if (error) {
            errors[field] = error;
            isValid = false;
        }
    }
    return { errors, isValid };
}
