import { useQuery } from '@tanstack/react-query'

interface SongUrlData {
  id: number
  url: string | null
  br: number
  size: number
  type: string
}

interface SongUrlResponse {
  code: number
  data: SongUrlData[]
}

export function useSongUrl(id: string | number) {
  return useQuery<SongUrlResponse>({
    queryKey: ['songUrl', id],
    queryFn: async () => {
      const response = await fetch(`/api/song/url/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch song URL')
      }
      return response.json()
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 分钟
  })
}
