'use client'

import { useEffect, useCallback } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { audioManager } from '@/lib/audio/audioManager'

export function useAudioPlayer() {
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    playNext,
  } = usePlayerStore()

  // 同步音量
  useEffect(() => {
    audioManager.setVolume(volume)
  }, [volume])

  // 同步静音状态
  useEffect(() => {
    audioManager.mute(isMuted)
  }, [isMuted])

  // 当歌曲改变时加载新音频
  useEffect(() => {
    if (currentSong?.audioUrl) {
      audioManager.load(currentSong.audioUrl, isPlaying)
      setDuration(audioManager.getDuration())
    }
  }, [currentSong?.id]) // 只在歌曲 ID 改变时触发

  // 同步播放/暂停状态
  useEffect(() => {
    if (!currentSong) return

    if (isPlaying) {
      audioManager.play()
    } else {
      audioManager.pause()
    }
  }, [isPlaying, currentSong])

  // 设置音频事件监听器
  useEffect(() => {
    // 播放事件
    audioManager.onPlay(() => {
      setIsPlaying(true)
    })

    // 暂停事件
    audioManager.onPause(() => {
      setIsPlaying(false)
    })

    // 播放结束事件
    audioManager.onEnd(() => {
      playNext()
    })

    // 加载完成事件
    audioManager.onLoad(() => {
      const duration = audioManager.getDuration()
      setDuration(duration)
    })

    // 时间更新事件
    audioManager.onTimeUpdate((time) => {
      setCurrentTime(time)
    })

    // 错误事件
    audioManager.onError((error) => {
      console.error('Audio playback error:', error)
      setIsPlaying(false)
    })

    // 清理
    return () => {
      audioManager.cleanup()
    }
  }, [setIsPlaying, setCurrentTime, setDuration, playNext])

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 如果焦点在输入框，不处理快捷键
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      const { togglePlay, playNext: next, playPrevious: prev } = usePlayerStore.getState()

      switch (e.key) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            next()
          }
          break
        case 'ArrowLeft':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            prev()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // 跳转到指定时间
  const seekTo = useCallback((time: number) => {
    audioManager.seek(time)
    setCurrentTime(time)
  }, [setCurrentTime])

  return {
    seekTo,
  }
}
