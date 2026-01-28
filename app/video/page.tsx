import { Video as VideoIcon, Play } from 'lucide-react'

// 临时模拟数据
const mockVideos = [
  { id: '1', title: '音乐节现场精彩回顾', creator: '音乐频道', playCount: 1250000, duration: 245, coverGradient: 'from-red-500 to-orange-500' },
  { id: '2', title: 'MV首发：新歌发布', creator: '官方频道', playCount: 856000, duration: 198, coverGradient: 'from-blue-500 to-purple-500' },
  { id: '3', title: '幕后花絮：录音室记录', creator: '艺人工作室', playCount: 432000, duration: 312, coverGradient: 'from-green-500 to-teal-500' },
  { id: '4', title: '演唱会完整版', creator: '演出频道', playCount: 2340000, duration: 5400, coverGradient: 'from-purple-500 to-pink-500' },
  { id: '5', title: '音乐纪录片', creator: '纪录片频道', playCount: 678000, duration: 2700, coverGradient: 'from-amber-500 to-yellow-500' },
  { id: '6', title: '翻唱合集', creator: '音乐达人', playCount: 345000, duration: 420, coverGradient: 'from-cyan-500 to-blue-500' },
  { id: '7', title: '乐器教学', creator: '音乐教育', playCount: 234000, duration: 1800, coverGradient: 'from-indigo-500 to-violet-500' },
  { id: '8', title: '音乐访谈节目', creator: '访谈频道', playCount: 567000, duration: 3600, coverGradient: 'from-rose-500 to-red-500' },
]

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export default function VideoPage() {
  return (
    <div className="min-h-screen p-12">
      {/* 页面标题 */}
      <h1 className="font-serif text-[38px] font-normal text-textPrimary mb-8">
        视频
      </h1>

      {/* 推荐视频 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-textPrimary">
            推荐视频
          </h2>
          <button className="text-sm text-textSecondary hover:text-primary transition-colors">
            查看更多
          </button>
        </div>

        {/* 视频网格 */}
        <div className="grid grid-cols-4 gap-6">
          {mockVideos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
            >
              {/* 视频封面 */}
              <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br hover:scale-[1.02] transition-transform duration-200">
                <div className={`absolute inset-0 bg-gradient-to-br ${video.coverGradient} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <VideoIcon className="w-12 h-12 text-white/60" />
                </div>

                {/* 时长标签 */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-mono text-white">
                  {formatDuration(video.duration)}
                </div>

                {/* 悬停时的播放按钮 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* 视频信息 */}
              <h3 className="text-sm font-medium text-textPrimary mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-textTertiary mb-1">
                {video.creator}
              </p>
              <p className="text-xs text-textTertiary">
                {(video.playCount / 10000).toFixed(1)}万次播放
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
