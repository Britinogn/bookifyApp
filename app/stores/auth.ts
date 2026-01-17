import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(useCookie('auth_token').value || null)
    const user = ref<{email: string} | null>(null)
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value)

    const setToken = (newToken: string) => {
        token.value = newToken
        const tokenCookie = useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 7 
        })

        tokenCookie.value = newToken
    }


    const clearToken = () => {
        token.value = null
        user.value = null
        const tokenCookie = useCookie('auth_token')
        tokenCookie.value = null
    }


    return{
        token,
        user,
        loading,
        error,
        isAuthenticated,
        setToken,
        clearToken
    }
})