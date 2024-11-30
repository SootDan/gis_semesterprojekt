/**
 * Retrieves a cookie with the given name.
 */
export function getCookie(cookie: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + cookie + "=");
    if (parts.length == 2) {
        const part = parts.pop();
        return part? part.split(";").shift() : "";
    }
}

/**
 * Deletes a cookie with the given name by setting expiration to -1 days.
 */
export function deleteCookie(cookie: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = cookie + "=; expires = " + date.toUTCString()+ "; path=/";
}