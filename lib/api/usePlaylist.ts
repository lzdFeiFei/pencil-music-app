import { useQuery } from '@tanstack/react-query'
import type { Song } from '@/types'

interface PlaylistTrack {
  id: number
  name: string
  ar: Array<{ id: number; name: string }>
  al: { id: number; name: string; picUrl: string }
  dt: number
}

interface PlaylistDetail {
  id: number
  name: string
  coverImgUrl: string
  description: string
  playCount: number
  trackCount: number
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
  tracks: PlaylistTrack[]
}

interface PlaylistResponse {
  code: number
  playlist: PlaylistDetail
}

export function usePlaylist(id: string | number) {
  return useQuery<PlaylistResponse>({
    queryKey: ['playlist', id],
    queryFn: async () => {
      const response = await fetch(`/api/playlist/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch playlist')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// 辅助函数：将网易云歌曲格式转换为应用内 Song 格式
export function transformTrackToSong(track: PlaylistTrack): Song {
  return {
    id: String(track.id),
    name: track.name,
    artist: track.ar.map((a) => a.name).join(', '),
    album: track.al.name,
    duration: Math.floor(track.dt / 1000), // 转换为秒
    coverUrl: track.al.picUrl,
    audioUrl: '', // 需要单独获取
  }
}
