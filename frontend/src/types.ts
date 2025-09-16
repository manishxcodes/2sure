export type loginResponseType = {
    message: string,
    username: string, 
    isMfaActive: boolean
}

export type verify2FAResponseType = {
    message: string;
    token? : string;
}

export type reset2FAResponseType = {
    message: string;
}
