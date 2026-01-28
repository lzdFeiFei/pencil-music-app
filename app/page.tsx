'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRecommendedPlaylists } from '@/lib/api/useRecommendedPlaylists'

export default function Home() {
  const { data, isLoading, error } = useRecommendedPlaylists(8)
  return (
    <div className="min-h-screen p-12">
      {/* 页面标题 */}
      <h1 className="font-serif text-[38px] font-normal text-textPrimary mb-8">
        发现音乐
      </h1>

      {/* 搜索栏 */}
      <div className="mb-12">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textTertiary" />
          <input
            type="text"
            placeholder="搜索歌曲、艺术家、专辑..."
            className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-lg text-sm text-textPrimary placeholder:text-textPlaceholder focus:outline-none focus:border-primary transition-colors"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded text-xs text-textTertiary font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* 推荐歌单 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-textPrimary">
            推荐歌单
          </h2>
          <button className="text-sm text-textSecondary hover:text-primary transition-colors">
            查看更多
          </button>
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square mb-4 rounded-xl bg-surface" />
                <div className="h-4 bg-surface rounded mb-2 w-3/4" />
                <div className="h-3 bg-surface rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="text-center py-12">
            <p className="text-textSecondary">加载失败，请稍后重试</p>
          </div>
        )}

        {/* 歌单网格 */}
        {data?.playlists && (
          <div className="grid grid-cols-4 gap-6">
            {data.playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group cursor-pointer"
              >
                {/* 封面 */}
                <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-surface hover:scale-[1.02] transition-transform duration-200">
                  <Image
                    src={playlist.coverImgUrl}
                    alt={playlist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* 悬停时的播放按钮 */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 歌单信息 */}
                <h3 className="text-sm font-medium text-textPrimary mb-1 truncate group-hover:text-primary transition-colors">
                  {playlist.name}
                </h3>
                <p className="text-xs text-textTertiary">
                  {(playlist.playCount / 10000).toFixed(1)}万次播放
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
