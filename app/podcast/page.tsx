import { Mic2 } from 'lucide-react'

// 临时模拟数据
const mockPodcasts = [
  { id: '1', title: '科技前沿', author: '科技播客', episodeCount: 156, coverGradient: 'from-cyan-500 to-blue-500' },
  { id: '2', title: '商业洞察', author: '商业观察', episodeCount: 89, coverGradient: 'from-green-500 to-emerald-500' },
  { id: '3', title: '文化漫谈', author: '文化频道', episodeCount: 234, coverGradient: 'from-purple-500 to-pink-500' },
  { id: '4', title: '历史故事', author: '历史讲堂', episodeCount: 178, coverGradient: 'from-amber-500 to-orange-500' },
  { id: '5', title: '健康生活', author: '健康之声', episodeCount: 112, coverGradient: 'from-teal-500 to-cyan-500' },
  { id: '6', title: '音乐赏析', author: '音乐频道', episodeCount: 203, coverGradient: 'from-rose-500 to-red-500' },
  { id: '7', title: '电影评论', author: '影视评论', episodeCount: 145, coverGradient: 'from-indigo-500 to-purple-500' },
  { id: '8', title: '旅行见闻', author: '旅行者', episodeCount: 98, coverGradient: 'from-lime-500 to-green-500' },
]

export default function PodcastPage() {
  return (
    <div className="min-h-screen p-12">
      {/* 页面标题 */}
      <h1 className="font-serif text-[38px] font-normal text-textPrimary mb-8">
        播客
      </h1>

      {/* 热门播客 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-textPrimary">
            热门播客
          </h2>
          <button className="text-sm text-textSecondary hover:text-primary transition-colors">
            查看更多
          </button>
        </div>

        {/* 播客网格 */}
        <div className="grid grid-cols-4 gap-6">
          {mockPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="group cursor-pointer"
            >
              {/* 封面 */}
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br hover:scale-[1.02] transition-transform duration-200">
                <div className={`absolute inset-0 bg-gradient-to-br ${podcast.coverGradient} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic2 className="w-16 h-16 text-white/80" />
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

              {/* 播客信息 */}
              <h3 className="text-sm font-medium text-textPrimary mb-1 truncate group-hover:text-primary transition-colors">
                {podcast.title}
              </h3>
              <p className="text-xs text-textTertiary mb-1">
                {podcast.author}
              </p>
              <p className="text-xs text-textTertiary">
                {podcast.episodeCount} 集
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
