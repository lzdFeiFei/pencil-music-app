# Pencil Music App - 实现计划

## 📊 进度跟踪

最后更新: 2026-01-28

### 阶段完成状态

- [x] **阶段 1: 项目初始化** (已完成 - 2026-01-28)
  - [x] 创建 Next.js 项目结构
  - [x] 配置 Tailwind CSS 自定义主题
  - [x] 创建 package.json 并定义所有依赖
  - [x] 设置项目目录结构 (app/, components/, lib/, store/, types/)
  - [x] 创建初始配置文件 (next.config.js, tsconfig.json, tailwind.config.ts)
  - [x] 提交并推送到 GitHub
  - [ ] 待用户执行: 运行 `pnpm install` 安装依赖

- [x] **阶段 2: 核心布局组件** (已完成 - 2026-01-28)
  - [x] 创建根布局 (app/layout.tsx) - 集成侧边栏和播放器栏
  - [x] 构建侧边栏组件 (Sidebar.tsx) - 240px 宽度，导航菜单
  - [x] 构建播放器栏组件 (PlayerBar.tsx) - 80px 高度，播放控制

- [x] **阶段 3: 音频播放器核心** (已完成 - 2026-01-28)
  - [x] 创建 Zustand Store (store/playerStore.ts) - 播放器状态管理
  - [x] 实现音频管理器 (lib/audio/audioManager.ts) - 封装 Howler.js
  - [x] 创建 useAudioPlayer Hook - 连接状态和音频管理器
  - [x] 更新 PlayerBar 连接到 store - 完整的播放控制

- [x] **阶段 4: 页面实现** (部分完成 - 2026-01-28)
  - [x] 主页 (app/page.tsx) - 发现音乐，搜索栏，推荐歌单
  - [x] 播客页面 (app/podcast/page.tsx) - 热门播客网格
  - [x] 视频页面 (app/video/page.tsx) - 推荐视频网格
  - [x] 正在播放页面 (app/now-playing/page.tsx) - 全屏播放，歌词面板
  - [ ] 歌单卡片组件优化
  - [ ] 集成真实 API 数据

- [ ] **阶段 5: API 集成**
- [ ] **阶段 6: 高级功能**
- [ ] **阶段 7: 视觉优化和动画**
- [ ] **阶段 8: 响应式设计**
- [ ] **阶段 9: 性能优化**
- [ ] **阶段 10: 测试和部署**

### 变更记录

| 日期 | 阶段 | 变更内容 |
|------|------|---------|
| 2026-01-28 | 阶段 1 | 项目初始化完成，配置文件创建，提交到 GitHub |
| 2026-01-28 | 阶段 2 | 核心布局组件完成：侧边栏、播放器栏、根布局 |
| 2026-01-28 | 阶段 3 | 音频播放器核心完成：Zustand store、audioManager、useAudioPlayer Hook |
| 2026-01-28 | 阶段 4 | 基础页面完成：主页、播客、视频、Now Playing 页面 |

---

## 项目概述

基于 Pencil 设计文件开发一个完整的音乐流媒体 Web 应用，包含音乐播放、播客、视频等功能。

## 技术栈

- **前端框架**: React 18 + Next.js 14 (App Router)
- **样式方案**: Tailwind CSS v4
- **状态管理**: Zustand (音频播放器状态)
- **数据获取**: React Query (TanStack Query)
- **音频播放**: Howler.js
- **动画**: Framer Motion
- **图标**: Lucide React
- **API**: 网易云音乐 API (NeteaseCloudMusicApi)

## 项目结构

```
d:\my-project\pencil-test\
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # 根布局（侧边栏 + 播放器）
│   │   ├── page.tsx                # 主页（发现音乐）
│   │   ├── podcast/page.tsx        # 播客页面
│   │   ├── video/page.tsx          # 视频页面
│   │   ├── now-playing/page.tsx    # 全屏播放页面
│   │   └── api/                    # API 路由（代理音乐 API）
│   │
│   ├── components/
│   │   ├── layout/                 # 布局组件
│   │   │   ├── Sidebar.tsx         # 左侧边栏（240px）
│   │   │   ├── PlayerBar.tsx       # 底部播放器（80px）
│   │   │   └── MainLayout.tsx      # 主布局包装器
│   │   ├── player/                 # 播放器组件
│   │   │   ├── AudioPlayer.tsx     # 音频播放核心
│   │   │   ├── PlayerControls.tsx  # 播放控制按钮
│   │   │   ├── ProgressBar.tsx     # 进度条
│   │   │   └── VolumeControl.tsx   # 音量控制
│   │   ├── cards/                  # 卡片组件
│   │   │   ├── PlaylistCard.tsx    # 歌单卡片
│   │   │   ├── PodcastCard.tsx     # 播客卡片
│   │   │   └── VideoCard.tsx       # 视频卡片
│   │   ├── ui/                     # UI 组件
│   │   │   ├── SearchBar.tsx       # 搜索栏
│   │   │   └── Button.tsx          # 按钮组件
│   │   └── lyrics/
│   │       └── LyricsPanel.tsx     # 歌词面板
│   │
│   ├── store/
│   │   └── playerStore.ts          # Zustand 播放器状态
│   │
│   ├── lib/
│   │   ├── api/                    # API 客户端
│   │   ├── audio/                  # 音频管理
│   │   └── utils/                  # 工具函数
│   │
│   └── types/                      # TypeScript 类型定义
│
├── public/
│   └── fonts/                      # 自定义字体
├── tailwind.config.ts              # Tailwind 配置
├── next.config.js                  # Next.js 配置
└── package.json
```

## 实现阶段

### 阶段 1: 项目初始化（第 1 天）

**1.1 初始化 Next.js 项目**
```bash
cd d:\my-project\pencil-test
npx create-next-app@latest . --typescript --tailwind --app
```

**1.2 安装核心依赖**
```bash
npm install zustand @tanstack/react-query axios
npm install howler @types/howler
npm install framer-motion lucide-react
npm install clsx tailwind-merge react-hot-toast
```

**1.3 配置 Tailwind CSS**
- 自定义颜色主题（深色背景 #0A0A0B，橙色品牌色 #FF5C00）
- 配置字体（Instrument Serif, DM Mono, Inter）
- 设置圆角、间距等设计令牌

**1.4 设置字体加载**
- 下载并配置自定义字体
- 使用 `next/font` 优化字体加载

### 阶段 2: 核心布局组件（第 2-3 天）

**2.1 创建根布局 (app/layout.tsx)**
- 字体加载
- 全局 Provider（React Query, Toaster）
- 持久化播放器栏
- 左侧边栏

**2.2 构建侧边栏组件 (Sidebar.tsx)**
- Logo 区域（"CLOUDMUSIC" 品牌）
- 导航菜单（发现音乐、播客、视频、朋友、直播）
- 激活状态样式（橙色强调、背景）
- "我的音乐"部分
- 底部用户信息
- 240px 固定宽度，3px 橙色左边框

**2.3 构建播放器栏组件 (PlayerBar.tsx)**
- 固定 80px 高度在底部
- 三个区域：左（歌曲信息）、中（控制 + 进度）、右（音量 + 播放列表）
- 歌曲封面（56x56px，渐变背景）
- 播放/暂停/跳过控制
- 进度条（DM Mono 字体显示时间）
- 喜欢按钮、音量、播放列表图标

### 阶段 3: 音频播放器核心（第 4-5 天）

**3.1 设置 Zustand Store (store/playerStore.ts)**
```typescript
interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Song[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  // Actions...
}
```

**3.2 实现音频管理器 (lib/audio/audioManager.ts)**
- 封装 Howler.js
- 处理播放/暂停/跳转操作
- 事件监听器（timeupdate, ended, error）
- 预加载下一首歌曲

**3.3 创建 useAudioPlayer Hook**
- 连接 Zustand store 和音频管理器
- 同步音频状态与 UI
- 处理键盘快捷键

**3.4 构建播放器控制组件**
- 播放/暂停按钮
- 上一首/下一首按钮
- 随机和循环按钮
- 可点击跳转的进度条
- 时间显示（当前/总时长）

### 阶段 4: 页面实现（第 6-8 天）

**4.1 主页 (app/page.tsx)**
- 页面标题"发现音乐"（Instrument Serif, 38px）
- 搜索栏（带键盘快捷键 ⌘K）
- "推荐歌单"部分
- 4 列网格布局
- 从 API 获取歌单数据

**4.2 歌单卡片组件 (PlaylistCard.tsx)**
- 200px 高度封面，渐变背景
- 居中图标（唱片图标，48px）
- 标题和播放次数
- 悬停效果（缩放、阴影）
- 点击查看歌单详情

**4.3 播客页面 (app/podcast/page.tsx)**
- 类似主页布局
- 播客特定内容

**4.4 视频页面 (app/video/page.tsx)**
- 类似布局结构
- 视频缩略图卡片

**4.5 正在播放页面 (app/now-playing/page.tsx)**
- 全屏布局（无侧边栏）
- 动画渐变背景（彩色光晕）
- 左侧：大封面（400x400px）、歌曲信息、进度条、大型播放控制
- 右侧：歌词面板（400px 宽）、自动滚动、高亮当前行
- 返回按钮

### 阶段 5: API 集成（第 9-10 天）

**5.1 设置 API 代理**
创建 Next.js API 路由代理到网易云音乐 API：
- `/api/playlist/[id]` - 获取歌单详情
- `/api/search?q=query` - 搜索歌曲
- `/api/song/[id]` - 获取歌曲 URL
- `/api/lyrics/[id]` - 获取歌词

**5.2 配置 React Query**
- 设置缓存策略
- 错误处理
- 重试逻辑

**5.3 创建 API 客户端函数**
- 类型安全的 API 调用
- 响应转换
- 错误处理

**5.4 实现数据获取 Hooks**
- `usePlaylist(id)` - 获取歌单
- `useSearch(query)` - 搜索功能
- `useSongUrl(id)` - 获取流媒体 URL
- `useLyrics(id)` - 获取并解析歌词

### 阶段 6: 高级功能（第 11-12 天）

**6.1 歌词同步**
- 解析 LRC 格式歌词
- 与播放时间同步
- 自动滚动到当前行
- 高亮激活行
- 点击跳转到特定行

**6.2 搜索功能**
- 全局键盘快捷键（Cmd/Ctrl + K）
- 防抖搜索输入
- 搜索结果下拉框
- 箭头键导航

**6.3 播放列表管理**
- 添加到播放列表
- 创建自定义播放列表
- 重新排序歌曲
- 从播放列表移除

**6.4 喜欢/收藏系统**
- 心形图标切换
- 本地存储持久化
- "我的收藏"页面

**6.5 音量控制**
- 播放器栏中的音量滑块
- 静音/取消静音切换
- 持久化音量偏好

### 阶段 7: 视觉优化和动画（第 13-14 天）

**7.1 渐变背景**
- 卡片的径向渐变
- 正在播放页面的动画渐变背景
- 使用 Framer Motion 的彩色光晕动画
- 模糊效果

**7.2 悬停效果**
- 卡片悬停：scale(1.02) + 阴影
- 按钮悬停状态
- 平滑过渡（200-300ms）
- 导航激活状态

**7.3 加载状态**
- 卡片骨架加载器
- 播放器加载旋转器
- 闪烁效果
- 错误状态和重试

**7.4 页面过渡**
- 页面间平滑导航
- 淡入/淡出动画
- 正在播放页面的滑动过渡

### 阶段 8: 响应式设计（第 15 天）

**8.1 移动端布局**
- 可折叠侧边栏（汉堡菜单）
- 底部导航栏
- 全宽播放器栏
- 单列卡片网格

**8.2 平板布局**
- 2 列卡片网格
- 调整侧边栏宽度

**8.3 桌面端优化**
- 4 列网格（如设计）
- 悬停交互
- 键盘导航

### 阶段 9: 性能优化（第 16 天）

**9.1 代码分割**
- 重型组件的动态导入
- 基于路由的代码分割
- 懒加载正在播放页面

**9.2 图片优化**
- 使用 Next.js Image 组件
- 模糊占位符
- 响应式图片
- WebP 格式

**9.3 音频优化**
- 预加载下一首歌曲
- 高效缓冲管理

**9.4 包优化**
- Tree shaking
- 移除未使用的依赖
- 分析包大小
- 优化字体加载

### 阶段 10: 测试和部署（第 17-18 天）

**10.1 测试**
- 跨浏览器测试音频播放
- 测试键盘快捷键
- 测试响应式布局
- 测试 API 错误处理

**10.2 部署设置**
- 配置环境变量
- 设置 Vercel 部署
- 配置 API 代理
- 设置自定义域名（可选）

**10.3 文档**
- README 包含设置说明
- API 文档
- 组件文档
- 部署指南

## 关键文件

### 最关键的 5 个文件（优先实现）

1. **src/app/layout.tsx**
   - 根布局，建立核心结构
   - 包含侧边栏、播放器栏和全局 Provider
   - 所有其他组件的基础

2. **src/store/playerStore.ts**
   - Zustand store 管理所有音频播放器状态
   - 应用的中央神经系统
   - 控制当前歌曲、播放列表、播放控制

3. **src/components/layout/PlayerBar.tsx**
   - 持久化底部播放器栏
   - 在所有页面显示
   - 维护跨导航的播放连续性

4. **src/lib/audio/audioManager.ts**
   - 核心音频播放逻辑
   - 封装 Howler.js
   - 处理所有底层音频操作和事件管理

5. **tailwind.config.ts**
   - Tailwind 配置
   - 自定义主题匹配 Pencil 设计系统
   - 颜色、字体、间距
   - 保持所有组件的设计一致性

## 技术难点和解决方案

### 难点 1: 音频播放可靠性
**问题**: HTML5 Audio API 存在浏览器不一致性
**解决方案**:
- 使用 Howler.js 实现跨浏览器兼容
- 实现不支持格式的回退
- 处理自动播放限制
- 预加载音频实现平滑过渡

### 难点 2: 状态同步
**问题**: 播放器状态必须在所有页面同步
**解决方案**:
- 使用 Zustand 进行全局状态管理
- 在 localStorage 中持久化播放器状态
- 使用 effects 同步音频元素和 store
- 处理页面导航而不中断播放

### 难点 3: 歌词同步
**问题**: 歌词与播放的精确时间同步
**解决方案**:
- 使用正则表达式解析 LRC 格式
- 使用 requestAnimationFrame 实现平滑更新
- 实现二分查找以高效查找行
- 添加偏移调整以修正时间

### 难点 4: API 速率限制
**问题**: 音乐 API 可能有速率限制
**解决方案**:
- 实现 React Query 缓存
- 使用 stale-while-revalidate 策略
- 为搜索添加请求防抖
- 实现指数退避重试

### 难点 5: 大型播放列表性能
**问题**: 渲染数百首歌曲可能很慢
**解决方案**:
- 实现虚拟滚动（react-window）
- 分页加载播放列表
- 懒加载图片
- 记忆化昂贵的组件

## 环境配置

### .env.local
```env
# 音乐 API 配置
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
MUSIC_API_URL=https://netease-cloud-music-api.vercel.app

# 可选：认证
NEXT_PUBLIC_ENABLE_AUTH=false

# 开发环境
NODE_ENV=development
```

## 键盘快捷键

- `Space`: 播放/暂停
- `→`: 下一首
- `←`: 上一首
- `↑`: 音量增加
- `↓`: 音量减少
- `Cmd/Ctrl + K`: 搜索
- `L`: 切换歌词
- `S`: 切换随机播放
- `R`: 切换循环播放

## 性能目标

- **首次内容绘制**: < 1.5s
- **可交互时间**: < 3s
- **最大内容绘制**: < 2.5s
- **累积布局偏移**: < 0.1
- **音频延迟**: < 100ms

## 验证步骤

### 端到端测试清单

1. **音频播放**
   - [ ] 音频播放无中断
   - [ ] 播放器控制正常工作
   - [ ] 进度条可跳转
   - [ ] 音量控制功能正常
   - [ ] 播放列表导航工作

2. **UI 功能**
   - [ ] 歌词与音频同步
   - [ ] 搜索返回结果
   - [ ] 键盘快捷键工作
   - [ ] 移动端响应式正常
   - [ ] 在 Chrome、Firefox、Safari 中工作

3. **性能**
   - [ ] 首次加载 < 3s
   - [ ] 页面导航流畅
   - [ ] 无明显卡顿
   - [ ] 图片加载优化

4. **API 集成**
   - [ ] 歌单数据正确加载
   - [ ] 搜索功能正常
   - [ ] 歌曲 URL 正确获取
   - [ ] 歌词正确显示
   - [ ] 错误处理正常

## 实现优先级

### 关键路径（必须首先实现）
1. 项目设置 → Tailwind 配置 → 字体加载
2. 布局结构 → 侧边栏 → 播放器栏骨架
3. 音频核心 → Zustand store → 音频管理器 → 基本控制
4. 主页 → API 集成 → 歌单卡片
5. 播放器功能 → 播放/暂停 → 进度条 → 音量

### 次要功能（可并行实现）
- 搜索功能
- 歌词面板
- 正在播放页面
- 播客/视频页面
- 播放列表管理

### 优化（最后实现）
- 动画
- 悬停效果
- 加载状态
- 错误处理
- 响应式设计

## 未来增强功能（MVP 后）

- 用户认证
- 个人播放列表
- 社交功能（分享、评论）
- 离线模式（PWA）
- 桌面应用（Electron）
- 均衡器
- 歌曲间淡入淡出
- 无缝播放
- 播客订阅
- 视频播放
- 在线电台
- 音乐推荐
- 深色/浅色主题切换
