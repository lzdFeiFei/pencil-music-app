// 歌曲类型
export interface Song {
  id: string
  name: string
  artist: string
  album: string
  duration: number // 秒
  coverUrl: string
  audioUrl: string
}

// 歌单类型
export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  playCount: number
  songs: Song[]
  creator: {
    id: string
    name: string
    avatarUrl: string
  }
}

// 播客类型
export interface Podcast {
  id: string
  title: string
  description: string
  coverUrl: string
  author: string
  episodeCount: number
}

// 视频类型
export interface Video {
  id: string
  title: string
  description: string
  coverUrl: string
  creator: string
  playCount: number
  duration: number
}

// 歌词行类型
export interface LyricLine {
  time: number // 毫秒
  text: string
}

// 播放器重复模式
export type RepeatMode = 'off' | 'one' | 'all'

// 导航菜单项类型
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
}
