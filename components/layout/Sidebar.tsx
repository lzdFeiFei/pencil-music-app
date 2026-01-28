'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Mic2,
  Video,
  Users,
  Radio,
  Music,
  ListMusic,
  Heart,
  Clock,
  User
} from 'lucide-react'

const mainNav = [
  { id: 'discover', label: '发现音乐', href: '/', icon: Home },
  { id: 'podcast', label: '播客', href: '/podcast', icon: Mic2 },
  { id: 'video', label: '视频', href: '/video', icon: Video },
  { id: 'friends', label: '朋友', href: '/friends', icon: Users },
  { id: 'live', label: '直播', href: '/live', icon: Radio },
]

const myMusic = [
  { id: 'collection', label: '我的收藏', href: '/my/collection', icon: Heart },
  { id: 'recent', label: '最近播放', href: '/my/recent', icon: Clock },
  { id: 'playlists', label: '创建的歌单', href: '/my/playlists', icon: ListMusic },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-background border-l-[3px] border-primary flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold tracking-wider text-primary">
            CLOUDMUSIC
          </h1>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
                  ${active
                    ? 'bg-primary/10 text-primary'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceHover'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* My Music Section */}
        <div className="mt-8">
          <h2 className="px-3 mb-3 text-xs font-semibold text-textTertiary uppercase tracking-wider">
            我的音乐
          </h2>
          <div className="space-y-1">
            {myMusic.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
                    ${active
                      ? 'bg-primary/10 text-primary'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceHover'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-surfaceHover transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primaryLight flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-textPrimary truncate">
              用户名
            </p>
            <p className="text-xs text-textTertiary truncate">
              免费会员
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
