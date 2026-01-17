//import { baseURL } from "process"

export const apiClient = () => {
    const config = useRuntimeConfig() 
    const token = useCookie('auth_token')

    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    if (token.value) {
        headers['Authorization'] = token.value
    }

    return {
        baseURL: config.public.apiBase,
        headers
    }
}