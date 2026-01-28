import { NextRequest, NextResponse } from 'next/server'

// 备用 API 地址（如果都不可用，需要自己部署）
const API_BASE_URL = process.env.MUSIC_API_URL || 'https://netease-api.vercel.app'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || '10'

    const apiUrl = `${API_BASE_URL}/top/playlist?limit=${limit}&order=hot`
    console.log('Fetching from:', apiUrl)

    // 使用热门歌单接口，不需要登录
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', errorText)
      throw new Error(`API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log('API response data keys:', Object.keys(data))
    return NextResponse.json(data)
  } catch (error) {
    console.error('Recommended API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch recommended playlists',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
