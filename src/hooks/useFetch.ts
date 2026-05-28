import { useEffect, useState } from 'react'

export interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export const useFetch = <T>(url: string | null): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!url) {
            setData(null)
            setLoading(false)
            setError(null)
            return
        }

        const controller = new AbortController()
        let isCancelled = false

        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, { signal: controller.signal })

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`)
                }

                const json = (await response.json()) as T

                if (!isCancelled) {
                    setData(json)
                }
            } catch (fetchError) {
                if (
                    !isCancelled &&
                    fetchError instanceof Error &&
                    fetchError.name !== 'AbortError'
                ) {
                    setError(fetchError.message)
                    setData(null)
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false)
                }
            }
        }

        void fetchData()

        return () => {
            isCancelled = true
            controller.abort()
        }
    }, [url])

    return { data, loading, error }
}
