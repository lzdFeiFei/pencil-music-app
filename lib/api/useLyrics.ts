import { useQuery } from '@tanstack/react-query'
import type { LyricLine } from '@/types'

interface LyricResponse {
  code: number
  lrc?: {
    lyric: string
  }
  tlyric?: {
    lyric: string
  }
}

export function useLyrics(id: string | number) {
  return useQuery<LyricResponse>({
    queryKey: ['lyrics', id],
    queryFn: async () => {
      const response = await fetch(`/api/lyric/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch lyrics')
      }
      return response.json()
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 分钟
  })
}

/**
 * 解析 LRC 格式歌词
 * @param lrcString LRC 格式字符串
 * @returns 解析后的歌词行数组
 */
export function parseLyric(lrcString: string): LyricLine[] {
  if (!lrcString) return []

  const lines = lrcString.split('\n')
  const result: LyricLine[] = []

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g

  for (const line of lines) {
    const matches = [...line.matchAll(timeRegex)]
    if (matches.length === 0) continue

    // 移除时间标签，获取歌词文本
    const text = line.replace(timeRegex, '').trim()
    if (!text) continue

    // 一行可能有多个时间标签
    for (const match of matches) {
      const minutes = parseInt(match[1], 10)
      const seconds = parseInt(match[2], 10)
      const milliseconds = parseInt(match[3].padEnd(3, '0'), 10)

      const time = minutes * 60 + seconds + milliseconds / 1000

      result.push({ time, text })
    }
  }

  // 按时间排序
  return result.sort((a, b) => a.time - b.time)
}
