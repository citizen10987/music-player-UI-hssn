"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Home,
  CreditCard,
  Library,
  Search,
  List,
  Settings,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Volume1,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Heart,
  Clock,
  Music,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample playlist data
const playlist = [
  { id: 1, title: "Peaceful Melody", artist: "Lo-Fi Beats", duration: "3:32", active: true },
  { id: 2, title: "Midnight Dreams", artist: "Lo-Fi Beats", duration: "2:45", active: false },
  { id: 3, title: "Rainy Day", artist: "Lo-Fi Beats", duration: "4:12", active: false },
  { id: 4, title: "Coffee Shop", artist: "Lo-Fi Beats", duration: "3:05", active: false },
  { id: 5, title: "Study Session", artist: "Lo-Fi Beats", duration: "5:18", active: false },
]

export default function MusicPlayer() {
  // State management
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30) // 1:05 out of 3:32 is roughly 30%
  const [activeMenuItem, setActiveMenuItem] = useState("Home")
  const [isShuffleActive, setIsShuffleActive] = useState(false)
  const [isRepeatActive, setIsRepeatActive] = useState(false)
  const [volume, setVolume] = useState(70)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(playlist[0])
  const [isFavorite, setIsFavorite] = useState(false)

  // Refs for animations
  const discRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Simulate progress bar movement when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 0.1, 100)
          // Reset to beginning if we reach the end
          if (newProgress >= 100) {
            if (isRepeatActive) {
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return newProgress
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, progress, isRepeatActive])

  // Format time from percentage
  const formatTime = (percentage: number) => {
    const totalSeconds = 212 // 3:32 in seconds
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds)
    const minutes = Math.floor(currentSeconds / 60)
    const seconds = currentSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const newProgress = (clickPosition / rect.width) * 100
      setProgress(Math.max(0, Math.min(newProgress, 100)))
    }
  }

  // Handle track selection
  const handleTrackSelect = (track: (typeof playlist)[0]) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)

    // Update active track in playlist
    playlist.forEach((t) => (t.active = t.id === track.id))
  }

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />
    if (volume < 50) return <Volume1 className="w-5 h-5" />
    return <Volume2 className="w-5 h-5" />
  }

  // Navigation menu items
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Browse", icon: CreditCard },
    { name: "Library", icon: Library },
    { name: "Search", icon: Search },
  ]

  const bottomMenuItems = [
    { name: "Playlist", icon: List },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#8DD3E7] via-[#F9D9A7] to-[#F9D9A7]">
      <div className="flex w-full max-w-3xl overflow-hidden border-2 border-black rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Sidebar */}
        <div className="flex flex-col w-64 bg-[#F5EED0] border-r-2 border-black">
          {/* App Name */}
          <div className="flex items-center p-4 border-b-2 border-black bg-[#F5EED0] transition-colors duration-300 hover:bg-[#F5EED0]/90">
            <List className="w-6 h-6 mr-3" />
            <h1 className="text-2xl font-bold tracking-tight">JEDI</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="pt-2">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => setActiveMenuItem(item.name)}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-all duration-200",
                    "hover:bg-[#F5EED0]/80 hover:pl-5",
                    activeMenuItem === item.name && "bg-[#F5EED0]/80 font-semibold",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-transform duration-200",
                      activeMenuItem === item.name && "scale-110",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>

            <div className="border-t-2 border-black my-2"></div>

            <ul>
              {bottomMenuItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    setActiveMenuItem(item.name)
                    if (item.name === "Playlist") setShowPlaylist(!showPlaylist)
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-all duration-200",
                    "hover:bg-[#F5EED0]/80 hover:pl-5",
                    activeMenuItem === item.name && "bg-[#F5EED0]/80 font-semibold",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-transform duration-200",
                      activeMenuItem === item.name && "scale-110",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Current Track Info in Sidebar */}
          <div className="p-4 border-t-2 border-black">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#F9D26E] border border-black rounded flex items-center justify-center mr-3">
                <Music className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{currentTrack.title}</p>
                <p className="text-xs text-black/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-[#F5EED0]">
          {showPlaylist ? (
            /* Playlist View */
            <div className="flex-1 p-6 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Playlist</h2>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Playlist Header */}
              <div className="grid grid-cols-12 py-2 border-b-2 border-black/20 text-sm font-semibold text-black/70">
                <div className="col-span-1">#</div>
                <div className="col-span-5">TITLE</div>
                <div className="col-span-4">ARTIST</div>
                <div className="col-span-2 flex justify-end">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              {/* Playlist Items */}
              <div className="mt-2">
                {playlist.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={cn(
                      "grid grid-cols-12 py-3 text-sm border-b border-black/10 cursor-pointer",
                      "hover:bg-black/5 transition-colors duration-150",
                      track.active && "bg-black/5 font-medium",
                    )}
                  >
                    <div className="col-span-1 flex items-center">
                      {track.active && isPlaying ? (
                        <div className="w-4 h-4 relative flex items-center justify-center">
                          <div className="w-1 h-3 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite] mx-px"></div>
                          <div className="w-1 h-2 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite_0.2s] mx-px"></div>
                          <div className="w-1 h-4 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite_0.4s] mx-px"></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="col-span-5 truncate">{track.title}</div>
                    <div className="col-span-4 truncate text-black/70">{track.artist}</div>
                    <div className="col-span-2 flex justify-end">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Album View */
            <>
              {/* Album Cover */}
              <div className="flex flex-col items-center p-6">
                <div
                  className={cn(
                    "relative w-64 h-64 bg-[#F9D26E] p-4 border-2 border-black",
                    "transition-all duration-500 hover:shadow-lg",
                    isPlaying && "animate-[pulse_4s_ease-in-out_infinite]",
                  )}
                >
                  <div className="relative w-full h-full border-2 border-black overflow-hidden">
                    {/* Vinyl Record */}
                    <div
                      className={cn(
                        "absolute w-full h-full bg-black rounded-full left-4 top-0 opacity-70",
                        "transition-all duration-1000",
                        isPlaying && "left-0",
                      )}
                    ></div>
                    <div
                      ref={discRef}
                      className={cn(
                        "absolute w-full h-full bg-black rounded-full",
                        "transition-transform",
                        isPlaying
                          ? "animate-[spin_20s_linear_infinite]"
                          : "animate-none transition-all duration-1000 ease-out",
                      )}
                      style={{
                        animationPlayState: isPlaying ? "running" : "paused",
                      }}
                    >
                      {/* Record Grooves */}
                      <div className="absolute inset-[15%] border-2 border-gray-700 rounded-full"></div>
                      <div className="absolute inset-[30%] border-2 border-gray-700 rounded-full"></div>
                      <div className="absolute inset-[45%] border-2 border-gray-700 rounded-full"></div>

                      {/* Center Label */}
                      <div className="absolute inset-[40%] bg-[#F28C53] rounded-full border-2 border-black"></div>
                      <div className="absolute inset-[48%] bg-black rounded-full"></div>
                    </div>

                    {/* Orange Circle Accent */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#F28C53] rounded-full border-2 border-black"></div>
                  </div>
                </div>
              </div>

              {/* Track Info */}
              <div className="px-8 mt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold tracking-tight">{currentTrack.title}</h2>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      "hover:bg-black/5 active:scale-95",
                      isFavorite ? "text-[#F28C53]" : "text-black/70",
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite && "fill-[#F28C53]")} />
                  </button>
                </div>
                <p className="text-xl text-black/80 font-medium mt-1">{currentTrack.artist}</p>

                {/* Progress Bar */}
                <div className="mt-6 mb-3">
                  <div
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                    className="relative h-1.5 bg-black/20 rounded-full cursor-pointer group"
                  >
                    <div
                      className="absolute h-1.5 bg-black rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                    <div
                      className="absolute w-3.5 h-3.5 bg-black rounded-full -translate-y-1/4 transition-all duration-300 ease-out group-hover:scale-110"
                      style={{ left: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm font-medium">
                    <span>{formatTime(progress)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between my-6">
                  <button
                    onClick={() => setIsShuffleActive(!isShuffleActive)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      "hover:bg-black/5 active:scale-95",
                      isShuffleActive && "text-[#F28C53]",
                    )}
                  >
                    <Shuffle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      // Go to previous track logic
                      const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id)
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1
                      handleTrackSelect(playlist[prevIndex])
                    }}
                    className="p-2 rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95"
                  >
                    <SkipBack className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 border-2 border-black rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-95 hover:shadow-md"
                  >
                    {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
                  </button>
                  <button
                    onClick={() => {
                      // Go to next track logic
                      const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id)
                      const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0
                      handleTrackSelect(playlist[nextIndex])
                    }}
                    className="p-2 rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95"
                  >
                    <SkipForward className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => setIsRepeatActive(!isRepeatActive)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      "hover:bg-black/5 active:scale-95",
                      isRepeatActive && "text-[#F28C53]",
                    )}
                  >
                    <Repeat className="w-6 h-6" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setVolume(volume === 0 ? 70 : 0)}
                    className="p-1 rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95"
                  >
                    {getVolumeIcon()}
                  </button>
                  <div className="relative flex-1 h-1.5 bg-black/20 rounded-full cursor-pointer">
                    <div
                      className="absolute h-1.5 bg-black rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${volume}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number.parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom Control Bar */}
          <div className="flex items-center justify-between p-3 mt-auto bg-[#F9C0B9] border-t-2 border-black">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95"
            >
              {showPlaylist ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                // Go to previous track logic
                const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1
                handleTrackSelect(playlist[prevIndex])
              }}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-16 py-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95 hover:shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 mx-auto" /> : <Play className="w-4 h-4 mx-auto" />}
            </button>
            <button
              onClick={() => {
                // Go to next track logic
                const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id)
                const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0
                handleTrackSelect(playlist[nextIndex])
              }}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsRepeatActive(!isRepeatActive)}
              className={cn(
                "p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95",
                isRepeatActive && "bg-[#F28C53]/30",
              )}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
