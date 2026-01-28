import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.MUSIC_API_URL || 'https://netease-cloud-music-api.vercel.app'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const response = await fetch(`${API_BASE_URL}/lyric?id=${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch lyrics')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Lyrics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lyrics' },
      { status: 500 }
    )
  }
}
