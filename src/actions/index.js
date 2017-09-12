export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"


export function login() {
    return {
        type: LOGIN_USER
    }
}

export function logout() {
    return {
        type: LOGOUT_USER
    }
}

