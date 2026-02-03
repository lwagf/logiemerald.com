import { useState, useMemo, useCallback } from 'react'

interface UseSearchOptions<T> {
  items: T[]
  searchFields: (keyof T)[]
  filterFn?: (item: T, filters: Record<string, string>) => boolean
  itemsPerPage?: number
}

interface UseSearchResult<T> {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: Record<string, string>
  setFilter: (key: string, value: string) => void
  filteredItems: T[]
  paginatedItems: T[]
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  totalItems: number
}

export function useSearch<T>({
  items,
  searchFields,
  filterFn,
  itemsPerPage = 50,
}: UseSearchOptions<T>): UseSearchResult<T> {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)

  const setFilter = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }, [])

  const handleSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const filteredItems = useMemo(() => {
    let result = items

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query)
          }
          if (Array.isArray(value)) {
            return value.some(v => typeof v === 'string' && v.toLowerCase().includes(query))
          }
          return false
        })
      )
    }

    // Apply filters
    if (filterFn) {
      result = result.filter(item => filterFn(item, filters))
    }

    return result
  }, [items, searchQuery, searchFields, filterFn, filters])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const totalItems = filteredItems.length

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.slice(start, end)
  }, [filteredItems, currentPage, itemsPerPage])

  return {
    searchQuery,
    setSearchQuery: handleSearchQuery,
    filters,
    setFilter,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  }
}
