import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Song, RepeatMode } from '@/types'

interface PlayerState {
  // 播放状态
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  isMuted: boolean
  currentTime: number
  duration: number

  // 播放列表
  playlist: Song[]
  currentIndex: number
  shuffle: boolean
  repeat: RepeatMode

  // Actions
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setIsMuted: (isMuted: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void

  setPlaylist: (playlist: Song[]) => void
  setCurrentIndex: (index: number) => void
  setShuffle: (shuffle: boolean) => void
  setRepeat: (repeat: RepeatMode) => void

  // 播放控制
  play: () => void
  pause: () => void
  togglePlay: () => void
  playNext: () => void
  playPrevious: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  toggleMute: () => void

  // 播放列表操作
  addToPlaylist: (song: Song) => void
  removeFromPlaylist: (index: number) => void
  clearPlaylist: () => void
  playFromPlaylist: (index: number) => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentSong: null,
      isPlaying: false,
      volume: 0.7,
      isMuted: false,
      currentTime: 0,
      duration: 0,

      playlist: [],
      currentIndex: -1,
      shuffle: false,
      repeat: 'off',

      // Setters
      setCurrentSong: (song) => set({ currentSong: song }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      setIsMuted: (isMuted) => set({ isMuted }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),

      setPlaylist: (playlist) => set({ playlist }),
      setCurrentIndex: (index) => set({ currentIndex: index }),
      setShuffle: (shuffle) => set({ shuffle }),
      setRepeat: (repeat) => set({ repeat }),

      // 播放控制
      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      playNext: () => {
        const { playlist, currentIndex, repeat, shuffle } = get()
        if (playlist.length === 0) return

        let nextIndex = currentIndex

        if (repeat === 'one') {
          // 单曲循环，保持当前索引
          set({ currentTime: 0 })
          return
        }

        if (shuffle) {
          // 随机播放
          nextIndex = Math.floor(Math.random() * playlist.length)
        } else {
          // 顺序播放
          nextIndex = currentIndex + 1
          if (nextIndex >= playlist.length) {
            if (repeat === 'all') {
              nextIndex = 0
            } else {
              // 播放完毕
              set({ isPlaying: false })
              return
            }
          }
        }

        set({
          currentIndex: nextIndex,
          currentSong: playlist[nextIndex],
          currentTime: 0,
          isPlaying: true,
        })
      },

      playPrevious: () => {
        const { playlist, currentIndex, currentTime } = get()
        if (playlist.length === 0) return

        // 如果当前播放时间超过 3 秒，重新播放当前歌曲
        if (currentTime > 3) {
          set({ currentTime: 0 })
          return
        }

        // 否则播放上一首
        let prevIndex = currentIndex - 1
        if (prevIndex < 0) {
          prevIndex = playlist.length - 1
        }

        set({
          currentIndex: prevIndex,
          currentSong: playlist[prevIndex],
          currentTime: 0,
          isPlaying: true,
        })
      },

      toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),

      toggleRepeat: () => {
        const { repeat } = get()
        let newRepeat: RepeatMode = 'off'
        if (repeat === 'off') newRepeat = 'all'
        else if (repeat === 'all') newRepeat = 'one'
        set({ repeat: newRepeat })
      },

      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      // 播放列表操作
      addToPlaylist: (song) => {
        const { playlist } = get()
        set({ playlist: [...playlist, song] })
      },

      removeFromPlaylist: (index) => {
        const { playlist, currentIndex } = get()
        const newPlaylist = playlist.filter((_, i) => i !== index)

        let newCurrentIndex = currentIndex
        if (index < currentIndex) {
          newCurrentIndex = currentIndex - 1
        } else if (index === currentIndex) {
          newCurrentIndex = -1
          set({ currentSong: null, isPlaying: false })
        }

        set({
          playlist: newPlaylist,
          currentIndex: newCurrentIndex,
        })
      },

      clearPlaylist: () => {
        set({
          playlist: [],
          currentIndex: -1,
          currentSong: null,
          isPlaying: false,
        })
      },

      playFromPlaylist: (index) => {
        const { playlist } = get()
        if (index >= 0 && index < playlist.length) {
          set({
            currentIndex: index,
            currentSong: playlist[index],
            currentTime: 0,
            isPlaying: true,
          })
        }
      },
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        shuffle: state.shuffle,
        repeat: state.repeat,
        playlist: state.playlist,
        currentIndex: state.currentIndex,
      }),
    }
  )
)
