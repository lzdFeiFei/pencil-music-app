import { NextResponse } from 'next/server'

// 测试接口 - 返回模拟数据
export async function GET() {
  return NextResponse.json({
    code: 200,
    playlists: [
      {
        id: 1,
        name: '测试歌单 1',
        coverImgUrl: 'https://picsum.photos/200',
        playCount: 125000,
        trackCount: 20,
      },
      {
        id: 2,
        name: '测试歌单 2',
        coverImgUrl: 'https://picsum.photos/200',
        playCount: 856000,
        trackCount: 30,
      },
    ],
  })
}
