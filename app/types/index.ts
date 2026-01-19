
export interface Event {
    id: number
    name:string
    description: string
    location : string
    date_time : string
    user_id: number
    // category: string
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