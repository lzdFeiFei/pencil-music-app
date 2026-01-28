import { Howl, Howler } from 'howler'

type AudioEventCallback = () => void
type TimeUpdateCallback = (time: number) => void

class AudioManager {
  private howl: Howl | null = null
  private currentUrl: string | null = null

  // 事件回调
  private onPlayCallback: AudioEventCallback | null = null
  private onPauseCallback: AudioEventCallback | null = null
  private onEndCallback: AudioEventCallback | null = null
  private onLoadCallback: AudioEventCallback | null = null
  private onErrorCallback: ((error: any) => void) | null = null
  private onTimeUpdateCallback: TimeUpdateCallback | null = null

  private timeUpdateInterval: NodeJS.Timeout | null = null

  constructor() {
    // 设置全局音量
    Howler.volume(0.7)
  }

  /**
   * 加载并播放音频
   */
  load(url: string, autoplay: boolean = false): void {
    // 如果是同一个 URL，不重新加载
    if (this.currentUrl === url && this.howl) {
      if (autoplay) {
        this.play()
      }
      return
    }

    // 停止并清理当前音频
    this.stop()
    this.cleanup()

    this.currentUrl = url

    // 创建新的 Howl 实例
    this.howl = new Howl({
      src: [url],
      html5: true, // 使用 HTML5 Audio 以支持流媒体
      preload: true,
      autoplay,
      onload: () => {
        if (this.onLoadCallback) {
          this.onLoadCallback()
        }
      },
      onplay: () => {
        this.startTimeUpdate()
        if (this.onPlayCallback) {
          this.onPlayCallback()
        }
      },
      onpause: () => {
        this.stopTimeUpdate()
        if (this.onPauseCallback) {
          this.onPauseCallback()
        }
      },
      onend: () => {
        this.stopTimeUpdate()
        if (this.onEndCallback) {
          this.onEndCallback()
        }
      },
      onerror: (id, error) => {
        console.error('Audio error:', error)
        if (this.onErrorCallback) {
          this.onErrorCallback(error)
        }
      },
    })
  }

  /**
   * 播放
   */
  play(): void {
    if (this.howl) {
      this.howl.play()
    }
  }

  /**
   * 暂停
   */
  pause(): void {
    if (this.howl) {
      this.howl.pause()
    }
  }

  /**
   * 停止
   */
  stop(): void {
    if (this.howl) {
      this.howl.stop()
    }
    this.stopTimeUpdate()
  }

  /**
   * 跳转到指定时间（秒）
   */
  seek(time: number): void {
    if (this.howl) {
      this.howl.seek(time)
    }
  }

  /**
   * 获取当前播放时间（秒）
   */
  getCurrentTime(): number {
    if (this.howl) {
      return this.howl.seek() as number
    }
    return 0
  }

  /**
   * 获取音频总时长（秒）
   */
  getDuration(): number {
    if (this.howl) {
      return this.howl.duration()
    }
    return 0
  }

  /**
   * 设置音量（0-1）
   */
  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    Howler.volume(clampedVolume)
  }

  /**
   * 获取当前音量
   */
  getVolume(): number {
    return Howler.volume()
  }

  /**
   * 静音/取消静音
   */
  mute(muted: boolean): void {
    Howler.mute(muted)
  }

  /**
   * 检查是否正在播放
   */
  isPlaying(): boolean {
    if (this.howl) {
      return this.howl.playing()
    }
    return false
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    this.stopTimeUpdate()
    if (this.howl) {
      this.howl.unload()
      this.howl = null
    }
    this.currentUrl = null
  }

  /**
   * 开始时间更新循环
   */
  private startTimeUpdate(): void {
    this.stopTimeUpdate()
    this.timeUpdateInterval = setInterval(() => {
      if (this.howl && this.howl.playing() && this.onTimeUpdateCallback) {
        const currentTime = this.getCurrentTime()
        this.onTimeUpdateCallback(currentTime)
      }
    }, 100) // 每 100ms 更新一次
  }

  /**
   * 停止时间更新循环
   */
  private stopTimeUpdate(): void {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval)
      this.timeUpdateInterval = null
    }
  }

  // 事件监听器设置
  onPlay(callback: AudioEventCallback): void {
    this.onPlayCallback = callback
  }

  onPause(callback: AudioEventCallback): void {
    this.onPauseCallback = callback
  }

  onEnd(callback: AudioEventCallback): void {
    this.onEndCallback = callback
  }

  onLoad(callback: AudioEventCallback): void {
    this.onLoadCallback = callback
  }

  onError(callback: (error: any) => void): void {
    this.onErrorCallback = callback
  }

  onTimeUpdate(callback: TimeUpdateCallback): void {
    this.onTimeUpdateCallback = callback
  }
}

// 导出单例
export const audioManager = new AudioManager()
