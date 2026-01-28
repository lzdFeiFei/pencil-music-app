# Pencil Music App - 网易云音乐风格应用

基于 Pencil 设计文件开发的现代音乐流媒体 Web 应用。

## 技术栈

- **前端框架**: React 18 + Next.js 14 (App Router)
- **样式方案**: Tailwind CSS
- **状态管理**: Zustand
- **数据获取**: React Query (TanStack Query)
- **音频播放**: Howler.js
- **动画**: Framer Motion
- **图标**: Lucide React
- **包管理器**: pnpm

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 3. 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目结构

```
pencil-test/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页
│   ├── podcast/            # 播客页面
│   ├── video/              # 视频页面
│   ├── now-playing/        # 全屏播放页面
│   └── api/                # API 路由
├── components/
│   ├── layout/             # 布局组件（侧边栏、播放器栏）
│   ├── player/             # 播放器组件
│   ├── cards/              # 卡片组件
│   ├── ui/                 # UI 组件
│   └── lyrics/             # 歌词组件
├── store/                  # Zustand 状态管理
├── lib/                    # 工具库
│   ├── api/                # API 客户端
│   ├── audio/              # 音频管理
│   └── utils/              # 工具函数
├── types/                  # TypeScript 类型定义
└── public/                 # 静态资源
```

## 功能特性

### 已实现
- ✅ 项目初始化和配置
- ✅ Tailwind CSS 自定义主题
- ✅ TypeScript 配置
- ✅ 基础项目结构

### 开发中
- 🔄 侧边栏导航组件
- 🔄 底部播放器栏
- 🔄 音频播放核心功能
- 🔄 主页（发现音乐）
- 🔄 播客页面
- 🔄 视频页面
- 🔄 全屏播放页面

### 计划中
- ⏳ 歌词同步显示
- ⏳ 搜索功能
- ⏳ 播放列表管理
- ⏳ 喜欢/收藏功能
- ⏳ 响应式设计
- ⏳ 性能优化

## 设计系统

### 颜色
- **背景色**: #0A0A0B (深黑色)
- **表面色**: #111113 (深灰色)
- **品牌色**: #FF5C00 (橙色)
- **文本色**: #FFFFFF (白色)

### 字体
- **标题**: Instrument Serif
- **数据**: DM Mono
- **界面**: Inter

### 圆角
- 小: 6px
- 中: 8px
- 大: 12px

## 开发指南

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件
3. 使用 Tailwind CSS 类名进行样式设计

### 添加新组件

1. 在 `components/` 相应目录下创建组件文件
2. 使用 TypeScript 定义 props 类型
3. 导出组件供其他文件使用

### 状态管理

使用 Zustand 进行全局状态管理，主要用于：
- 音频播放器状态
- 播放列表
- UI 状态

## API 集成

计划集成网易云音乐 API (NeteaseCloudMusicApi)：
- 歌单获取
- 歌曲搜索
- 歌词获取
- 音频流媒体

## 部署

推荐使用 Vercel 进行部署：

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 部署
vercel
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

## 相关链接

- [设计文件](./pencil-new.pen)
- [GitHub 仓库](https://github.com/lzdFeiFei/pencil-music-app)
- [实现计划](C:\Users\pc\.claude\plans\parallel-hatching-backus.md)
