import { useQuery } from '@tanstack/react-query'

interface RecommendedPlaylist {
  id: number
  name: string
  coverImgUrl: string  // 注意：top/playlist 使用 coverImgUrl 而不是 picUrl
  playCount: number
  trackCount: number
  description?: string
}

interface RecommendedResponse {
  playlists: RecommendedPlaylist[]  // 注意：top/playlist 使用 playlists 而不是 result
  code: number
  total?: number
}

export function useRecommendedPlaylists(limit: number = 8) {
  return useQuery<RecommendedResponse>({
    queryKey: ['recommended', limit],
    queryFn: async () => {
      const response = await fetch(`/api/recommended?limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recommended playlists')
      }
      return response.json()
    },
  })
}
