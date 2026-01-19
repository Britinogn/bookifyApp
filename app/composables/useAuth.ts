import type { AuthResponse } from '~/types'
import { useAuthStore } from "~/stores/auth"
import { apiClient } from '~/utils/api'

export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()

    const signup = async (email: string, password: string) => {
        const { data, error } = await useLazyFetch<AuthResponse>('/signup', {
            ...apiClient(),
            method: 'POST',
            body: { email, password }
        })

        if (error.value) {
            return { success: false, error: error.value.message }
        }
        
        return { success: true, data: data.value }
    }

    const login = async (email: string, password: string) => {
        const { data, error } = await useLazyFetch<AuthResponse>('/login', {
            ...apiClient(),
            method: 'POST',
            body: { email, password }
        })

        if (error.value) {
            return { success: false, error: error.value.message }
        }
        
        if (data.value?.token) {
            authStore.setToken(data.value.token)
            router.push('/')
        }

        return { success: true, data: data.value }
    }

    const logout = () => {
        authStore.clearToken()
        router.push('/auth/login')
    }

    return {
        signup,
        login,
        logout,
        isAuthenticated: computed(() => authStore.isAuthenticated)
    }
}