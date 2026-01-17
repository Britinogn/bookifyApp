import type { Event, EventResponse } from '~/types'
//import { useAuthStore } from "~/stores/auth"
import {apiClient} from '~/utils/api'


// export const useEvents = () => {
// const getAllEvents = async () => {
//     const { data, error } = await useFetch<Event[]>('/events', apiClient())
//     return { data: data.value, error: error.value }
//   }
// }

export function useEvents()  {
    async function getAllEvents() {
        const {data , error} = await useFetch<Event[]>('/events', {
            ...apiClient(),
        })
        return {
            data: data.value,
            error: error.value
        }
    }

    async function getEventById(id: number) {
        const {data , error} = await useFetch<Event[]>(`/events/${id}`, {
            ...apiClient(),
        })
        return {
            data: data.value,
            error: error.value
        }
    }

    async function createEvent(event: Omit<Event, 'id' | 'user_id'>) {
        const {data, error} = await useFetch<EventResponse>('/events', {
            ...apiClient(),
            method: 'POST',
            body: event
        })
        return { data: data.value, error: error.value }
    }

    async function updateEvent(id: number, event: Omit<Event, 'id' | 'user_id'>) {
        const { data, error } = await useFetch<EventResponse>(`/events/${id}`, {
            ...apiClient(),
            method: 'PUT',
            body: event
        })
        return { data: data.value, error: error.value }
    }

    async function deleteEvent(id: number) {
        const { data, error } = await useFetch(`/events/${id}`, {
            ...apiClient(),
            method: 'DELETE'
            })
        return { data: data.value, error: error.value }
    }

    async function registerForEvent(id: number) {
        const { data, error } = await useFetch(`/events/${id}/register`, {
            ...apiClient(),
            method: 'POST'
        })
        return { data: data.value, error: error.value }
    }

    async function cancelRegistration(id: number) {
        const { data, error } = await useFetch(`/events/${id}/register`, {
            ...apiClient(),
            method: 'DELETE'
            })
        return { data: data.value, error: error.value }
    }

    return {
        getAllEvents,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        cancelRegistration
    }
}