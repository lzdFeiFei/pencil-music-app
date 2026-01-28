import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.MUSIC_API_URL || 'https://netease-cloud-music-api.vercel.app'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const keywords = searchParams.get('keywords') || ''
    const limit = searchParams.get('limit') || '30'
    const type = searchParams.get('type') || '1' // 1: 单曲, 1000: 歌单

    if (!keywords) {
      return NextResponse.json(
        { error: 'Keywords parameter is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${API_BASE_URL}/search?keywords=${encodeURIComponent(keywords)}&limit=${limit}&type=${type}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to search')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    )
  }
}
