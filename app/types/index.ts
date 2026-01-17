
export interface Event {
    id: number
    Name:string
    Description: string
    Location : string
    dateTime : string
    user_id: number
}

export interface User {
    email : string
    password : string
}

export interface AuthResponse {
    message: string 
    token: string 
}

export interface EventResponse {
    message: string
    event : Event
}