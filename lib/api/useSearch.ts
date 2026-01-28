import { useQuery } from '@tanstack/react-query'

interface SearchSong {
  id: number
  name: string
  artists: Array<{ id: number; name: string }>
  album: { id: number; name: string; picUrl: string }
  duration: number
}

interface SearchResponse {
  code: number
  result: {
    songs: SearchSong[]
    songCount: number
  }
}

export function useSearch(keywords: string, enabled: boolean = true) {
  return useQuery<SearchResponse>({
    queryKey: ['search', keywords],
    queryFn: async () => {
      const response = await fetch(
        `/api/search?keywords=${encodeURIComponent(keywords)}&limit=30&type=1`
      )
      if (!response.ok) {
        throw new Error('Failed to search')
      }
      return response.json()
    },
    enabled: enabled && keywords.length > 0,
    staleTime: 5 * 60 * 1000, // 5 分钟
  })
}
