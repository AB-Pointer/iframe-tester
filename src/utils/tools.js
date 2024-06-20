import { Buffer } from 'buffer';
import { DateTime } from 'luxon';

// --- string tools ---
/**
 * Replacing the first letter with lower or upper case.
 * @param {String} str - string.
 * @param {Boolean} upperCase - true | false.
 * @default upperCase true.
 * @returns {String} str - starting with upper or lower case base on upperCase param.
 */
export const toFirstLetterCase = (str, upperCase = true) => {
    const letter = str?.trim?.()[0];
    if (typeof letter === 'string') {
        const letterCase = upperCase ? letter.toUpperCase() : letter.toLowerCase();
        if (letter !== letterCase) {
            return str.replace(letter, letterCase);
        }
    }
    return str;
};

// --- object tools ---
/**
 * Replacing the first letter of all property names with lower case.
 * @param {Object} obj - object.
 * @returns {Object} obj - with property names that starting with lower case.
 */
export const objToFirstLowerCase = (obj = {}) => {
    const properties = {};
    Object.entries(obj).forEach(([property, value]) => {
        const name = toFirstLetterCase(property, false);
        properties[name] = value;
    });
    return properties;
};

export const queryFromObj = (obj) => {
    let query = '';
    Object.entries(obj).forEach(([key, value]) => {
        if (value) {
            if (!query) {
                query = '?';
            } else {
                query += '&';
            }
            query += `${key}=${value}`;
        }
    });
    return query;
};

// --- JWT token tools ---
const b64DecodeUnicode = (str) => decodeURIComponent([...atob(str)].map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
/**
 * Parsing JWT token (using atob).
 * @param {String} token - JWT token.
 * @returns {Object} The parsed token.
 */
export const parseJwt = (token) => token && JSON.parse(b64DecodeUnicode(token.split('.')[1]?.replace('-', '+')?.replace('_', '/')));

/**
 * Parsing JWT token (using Buffer).
 * @param {String} token - JWT token.
 * @returns {Object} The parsed token.
 */
export const parseJwt2 = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export const tryParseJwt = (token) => {
    let decoded;
    try {
        decoded = objToFirstLowerCase(parseJwt2(token))
    } catch (error) {
        // console.log('tryParseJwt', error)
    }
    return decoded;
}

export const getTokenClaim = (token, claim) => {
    const data = tryParseJwt(token) ?? {}
    return data[claim];
};

export const getTokenExpireStr = (token) => {
    const exp = getTokenClaim(token, 'exp');
    if (typeof exp === 'number') {
        const date = DateTime.fromJSDate(new Date(exp * 1000)).toString();
        return date;
    }
};