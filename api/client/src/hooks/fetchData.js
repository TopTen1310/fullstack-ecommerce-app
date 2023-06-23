import { useState, useEffect } from 'react'
import axios from 'axios'

export function useFetch(url) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const res = await axios.get(url)
            setData(res.data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    async function reFetch() {
        setIsLoading(true)
        const res = await axios.get(url)
        setData(res.data)
        setIsLoading(false)
    }

    return { data, isLoading, reFetch }
}