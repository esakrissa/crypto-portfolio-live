'use client'

import { useState, useEffect } from 'react'

export function useCryptoPrices(symbols = [], refreshInterval = 60000) {
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sources, setSources] = useState([])

  useEffect(() => {
    if (symbols.length === 0) return

    const fetchPrices = async () => {
      try {
        const symbolsParam = symbols.join(',')
        const response = await fetch(`/api/crypto/prices?symbols=${symbolsParam}`)

        if (!response.ok) {
          throw new Error('Failed to fetch prices')
        }

        const data = await response.json()
        setPrices(data.data)
        setSources(data.sources || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching crypto prices:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchPrices()

    // Set up polling
    const interval = setInterval(fetchPrices, refreshInterval)

    return () => clearInterval(interval)
  }, [symbols.join(','), refreshInterval])

  return { prices, loading, error, sources }
}
