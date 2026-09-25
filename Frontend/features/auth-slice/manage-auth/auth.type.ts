
export type RegisterUser = {
    username : string,
    email : string,
    password : string,
    role: string
}

export type LoginUser = {
    email : string,
    password: string
}

export type GoogleLogin = {
    email : string,
    username: string,
    role : string
}