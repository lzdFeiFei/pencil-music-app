import { Search } from 'lucide-react'

// 临时模拟数据
const mockPlaylists = [
  { id: '1', name: '每日推荐', playCount: 125000, coverGradient: 'from-orange-500 to-pink-500' },
  { id: '2', name: '流行热歌', playCount: 856000, coverGradient: 'from-blue-500 to-cyan-500' },
  { id: '3', name: '华语精选', playCount: 432000, coverGradient: 'from-purple-500 to-indigo-500' },
  { id: '4', name: '欧美经典', playCount: 678000, coverGradient: 'from-green-500 to-teal-500' },
  { id: '5', name: '轻音乐', playCount: 234000, coverGradient: 'from-yellow-500 to-orange-500' },
  { id: '6', name: 'R&B Soul', playCount: 345000, coverGradient: 'from-red-500 to-rose-500' },
  { id: '7', name: '摇滚乐', playCount: 567000, coverGradient: 'from-gray-600 to-gray-800' },
  { id: '8', name: '电子音乐', playCount: 789000, coverGradient: 'from-violet-500 to-purple-500' },
]

export default function Home() {
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

        {/* 歌单网格 */}
        <div className="grid grid-cols-4 gap-6">
          {mockPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group cursor-pointer"
            >
              {/* 封面 */}
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br hover:scale-[1.02] transition-transform duration-200">
                <div className={`absolute inset-0 bg-gradient-to-br ${playlist.coverGradient} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                  </div>
                </div>
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
      </section>
    </div>
  )
}
