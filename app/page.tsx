export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Cloud Music
        </h1>
        <p className="text-textSecondary">
          音乐应用正在开发中...
        </p>
        <p className="text-textTertiary mt-2 text-sm">
          请运行 <code className="bg-surface px-2 py-1 rounded">pnpm install</code> 安装依赖
        </p>
      </div>
    </main>
  )
}
