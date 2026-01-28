'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Repeat1 } from 'lucide-react'
import { usePlayerStore } from '@/store/playerStore'
import { useAudioPlayer } from '@/lib/audio/useAudioPlayer'
import { useState } from 'react'

// 临时歌词数据
const mockLyrics = [
  { time: 0, text: '歌词第一行' },
  { time: 5, text: '歌词第二行' },
  { time: 10, text: '歌词第三行' },
  { time: 15, text: '歌词第四行' },
  { time: 20, text: '歌词第五行' },
  { time: 25, text: '歌词第六行' },
  { time: 30, text: '歌词第七行' },
]

export default function NowPlayingPage() {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    togglePlay,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore()

  const { seekTo } = useAudioPlayer()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    seekTo(newTime)
  }

  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat

  // 如果没有当前歌曲，返回主页
  if (!currentSong) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-textSecondary mb-4">暂无播放的歌曲</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryLight transition-colors"
          >
            返回主页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* 动画渐变背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 彩色光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col">
        {/* 返回按钮 */}
        <div className="absolute top-8 left-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm rounded-lg hover:bg-surface transition-colors text-textPrimary"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex items-center justify-center px-16 py-20">
          <div className="w-full max-w-7xl flex gap-16">
            {/* 左侧：封面和控制 */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* 封面 */}
              <div className="w-[400px] h-[400px] mb-12 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 rounded-xl bg-primary/20" />
              </div>

              {/* 歌曲信息 */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-textPrimary mb-3">
                  {currentSong.name}
                </h1>
                <p className="text-xl text-textSecondary">
                  {currentSong.artist}
                </p>
              </div>

              {/* 进度条 */}
              <div className="w-full max-w-2xl mb-8">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg
                  "
                  style={{
                    background: `linear-gradient(to right, #FF5C00 0%, #FF5C00 ${(currentTime / duration) * 100}%, #1F1F23 ${(currentTime / duration) * 100}%, #1F1F23 100%)`
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-mono text-textTertiary">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-sm font-mono text-textTertiary">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* 播放控制 */}
              <div className="flex items-center gap-6 mb-6">
                <button
                  onClick={toggleShuffle}
                  className={`p-3 hover:bg-surfaceHover rounded-full transition-colors ${
                    shuffle ? 'text-primary' : 'text-textSecondary'
                  }`}
                >
                  <Shuffle className="w-6 h-6" />
                </button>

                <button
                  onClick={playPrevious}
                  className="p-3 hover:bg-surfaceHover rounded-full transition-colors text-textPrimary"
                >
                  <SkipBack className="w-7 h-7" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-primary hover:bg-primaryLight rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white fill-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  )}
                </button>

                <button
                  onClick={playNext}
                  className="p-3 hover:bg-surfaceHover rounded-full transition-colors text-textPrimary"
                >
                  <SkipForward className="w-7 h-7" />
                </button>

                <button
                  onClick={toggleRepeat}
                  className={`p-3 hover:bg-surfaceHover rounded-full transition-colors ${
                    repeat !== 'off' ? 'text-primary' : 'text-textSecondary'
                  }`}
                >
                  <RepeatIcon className="w-6 h-6" />
                </button>
              </div>

              {/* 喜欢按钮 */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-3 hover:bg-surfaceHover rounded-full transition-colors"
              >
                <Heart
                  className={`w-7 h-7 transition-colors ${
                    isLiked ? 'fill-primary text-primary' : 'text-textSecondary'
                  }`}
                />
              </button>
            </div>

            {/* 右侧：歌词面板 */}
            <div className="w-[400px] flex flex-col">
              <div className="bg-surface/60 backdrop-blur-md rounded-2xl p-8 h-full overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold text-textPrimary mb-6">
                  歌词
                </h2>
                <div className="flex-1 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                  {mockLyrics.map((line, index) => {
                    const isActive = currentTime >= line.time &&
                      (index === mockLyrics.length - 1 || currentTime < mockLyrics[index + 1].time)

                    return (
                      <p
                        key={index}
                        className={`text-lg transition-all duration-300 cursor-pointer hover:text-textPrimary ${
                          isActive
                            ? 'text-textPrimary font-medium scale-105'
                            : 'text-textTertiary'
                        }`}
                        onClick={() => seekTo(line.time)}
                      >
                        {line.text}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
