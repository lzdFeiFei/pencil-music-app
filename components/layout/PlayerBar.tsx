'use client'

import { useState } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  VolumeX,
  ListMusic,
  Shuffle,
  Repeat,
  Repeat1
} from 'lucide-react'
import type { Song, RepeatMode } from '@/types'

export default function PlayerBar() {
  // 临时状态 - 稍后会连接到 Zustand store
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(240) // 4 分钟
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<RepeatMode>('off')

  // 临时歌曲数据
  const currentSong: Song | null = {
    id: '1',
    name: '歌曲名称',
    artist: '艺术家',
    album: '专辑名称',
    duration: 240,
    coverUrl: '',
    audioUrl: ''
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) setIsMuted(false)
  }

  const toggleRepeat = () => {
    if (repeat === 'off') setRepeat('all')
    else if (repeat === 'all') setRepeat('one')
    else setRepeat('off')
  }

  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat

  return (
    <div className="fixed bottom-0 left-60 right-0 h-20 bg-surface border-t border-border">
      <div className="h-full px-6 flex items-center justify-between gap-6">
        {/* 左侧：歌曲信息 */}
        <div className="flex items-center gap-4 flex-shrink-0 w-80">
          {currentSong ? (
            <>
              {/* 封面 */}
              <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 rounded bg-primary/30" />
              </div>
              {/* 歌曲信息 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-textPrimary truncate">
                  {currentSong.name}
                </h3>
                <p className="text-xs text-textTertiary truncate">
                  {currentSong.artist}
                </p>
              </div>
              {/* 喜欢按钮 */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex-shrink-0 p-2 hover:bg-surfaceHover rounded-full transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isLiked ? 'fill-primary text-primary' : 'text-textSecondary'
                  }`}
                />
              </button>
            </>
          ) : (
            <p className="text-sm text-textTertiary">暂无播放</p>
          )}
        </div>

        {/* 中间：播放控制 */}
        <div className="flex-1 flex flex-col items-center gap-2 max-w-2xl">
          {/* 控制按钮 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-2 hover:bg-surfaceHover rounded-full transition-colors ${
                shuffle ? 'text-primary' : 'text-textSecondary'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button className="p-2 hover:bg-surfaceHover rounded-full transition-colors text-textPrimary">
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-primary hover:bg-primaryLight rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </button>

            <button className="p-2 hover:bg-surfaceHover rounded-full transition-colors text-textPrimary">
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={toggleRepeat}
              className={`p-2 hover:bg-surfaceHover rounded-full transition-colors ${
                repeat !== 'off' ? 'text-primary' : 'text-textSecondary'
              }`}
            >
              <RepeatIcon className="w-4 h-4" />
            </button>
          </div>

          {/* 进度条 */}
          <div className="w-full flex items-center gap-3">
            <span className="text-xs font-mono text-textTertiary tabular-nums">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:opacity-0
                hover:[&::-webkit-slider-thumb]:opacity-100
                [&::-webkit-slider-thumb]:transition-opacity
              "
              style={{
                background: `linear-gradient(to right, #FF5C00 0%, #FF5C00 ${(currentTime / duration) * 100}%, #1F1F23 ${(currentTime / duration) * 100}%, #1F1F23 100%)`
              }}
            />
            <span className="text-xs font-mono text-textTertiary tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* 右侧：音量和播放列表 */}
        <div className="flex items-center gap-4 flex-shrink-0 w-48">
          {/* 音量控制 */}
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-surfaceHover rounded-full transition-colors text-textSecondary hover:text-textPrimary"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:cursor-pointer
              "
              style={{
                background: `linear-gradient(to right, #FF5C00 0%, #FF5C00 ${(isMuted ? 0 : volume) * 100}%, #1F1F23 ${(isMuted ? 0 : volume) * 100}%, #1F1F23 100%)`
              }}
            />
          </div>

          {/* 播放列表按钮 */}
          <button className="p-2 hover:bg-surfaceHover rounded-full transition-colors text-textSecondary hover:text-textPrimary">
            <ListMusic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
