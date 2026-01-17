import type { AuthResponse } from '~/types'
import { useAuthStore } from "~/stores/auth"
import {apiClient} from '~/utils/api'



export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()

    const signup = async (email: string, password: string) => {
        try {
            const { data, error } = await useFetch<AuthResponse>('/signup', {
                ...apiClient(),
                method: 'POST',
                body: { email, password }
            })

            if (error.value) throw error.value
            return { success: true, data: data.value }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await useFetch<AuthResponse>('/login', {
                ...apiClient(),
                method: 'POST',
                body: { email, password }
            })

            if (error.value) throw error.value
            
            if (data.value?.token) {
                authStore.setToken(data.value.token)
                router.push('/')
            }

            return { success: true, data: data.value }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    const logout = () => {
        authStore.clearToken()
        router.push('/login')
    }

    return {
        signup,
        login,
        logout,
        isAuthenticated: computed(() => authStore.isAuthenticated)
    }
}