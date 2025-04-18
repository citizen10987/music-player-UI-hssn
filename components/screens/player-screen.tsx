"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { X, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Heart, Volume2, Volume1, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

interface PlayerScreenProps {
  track: any
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  onClose: () => void
  onPlaylistToggle: () => void
}

export default function PlayerScreen({ track, isPlaying, setIsPlaying, onClose, onPlaylistToggle }: PlayerScreenProps) {
  const [progress, setProgress] = useState(30) // 1:05 out of 3:32 is roughly 30%
  const [isShuffleActive, setIsShuffleActive] = useState(false)
  const [isRepeatActive, setIsRepeatActive] = useState(false)
  const [volume, setVolume] = useState(70)
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
  }, [isPlaying, progress, isRepeatActive, setIsPlaying])

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

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />
    if (volume < 50) return <Volume1 className="w-5 h-5" />
    return <Volume2 className="w-5 h-5" />
  }

  return (
    <div className="flex flex-col flex-1 bg-[#F5EED0]">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full transition-all duration-200 active:scale-95"
        >
          <X className="w-5 h-5" />
        </motion.button>
        <h2 className="text-lg font-bold">Now Playing</h2>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>

      {/* Album Cover */}
      <div className="flex flex-col items-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative w-64 h-64 bg-[#F9D26E] p-4 border-2 border-black",
            "transition-all duration-500 hover:shadow-lg",
            isPlaying && "animate-[pulse_4s_ease-in-out_infinite]",
          )}
        >
          <div className="relative w-full h-full border-2 border-black overflow-hidden">
            {/* Vinyl Record */}
            <motion.div
              animate={{ left: isPlaying ? 0 : 4 }}
              transition={{ duration: 1 }}
              className={cn("absolute w-full h-full bg-black rounded-full left-4 top-0 opacity-70")}
            ></motion.div>
            <motion.div
              ref={discRef}
              animate={{
                rotate: isPlaying ? 360 : 0,
                transition: {
                  duration: 20,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                },
              }}
              className={cn("absolute w-full h-full bg-black rounded-full")}
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
            </motion.div>

            {/* Pattern based on track */}
            {track.pattern && (
              <div className="absolute top-2 right-2 w-16 h-16 bg-[#F28C53] rounded-full border-2 border-black flex items-center justify-center">
                {track.pattern === "circle" && <div className="w-8 h-8 rounded-full border-2 border-black"></div>}
                {track.pattern === "waves" && (
                  <div className="flex flex-col justify-center items-center w-full">
                    {[0, 1].map((i) => (
                      <div key={i} className="w-8 h-1 bg-black rounded-full my-1"></div>
                    ))}
                  </div>
                )}
                {track.pattern === "dots" && (
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 w-8 h-8">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="w-2 h-2 bg-black rounded-full"></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orange Circle Accent */}
            {!track.pattern && (
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#F28C53] rounded-full border-2 border-black"></div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Track Info */}
      <div className="px-8 mt-2">
        <div className="flex items-center justify-between">
          <motion.h2
            key={track.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight"
          >
            {track.title}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "active:scale-95",
              isFavorite ? "text-[#F28C53]" : "text-black/70",
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-[#F28C53]")} />
          </motion.button>
        </div>
        <motion.p
          key={track.artist}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-black/80 font-medium mt-1"
        >
          {track.artist}
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-6 mb-3">
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-1.5 bg-black/20 rounded-full cursor-pointer group"
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute h-1.5 bg-black rounded-full"
            ></motion.div>
            <motion.div
              animate={{ left: `${progress}%` }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute w-3.5 h-3.5 bg-black rounded-full -translate-y-1/4 transition-transform duration-300 ease-out group-hover:scale-110"
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium">
            <span>{formatTime(progress)}</span>
            <span>{track.duration || "3:32"}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between my-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShuffleActive(!isShuffleActive)}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "active:scale-95",
              isShuffleActive && "text-[#F28C53]",
            )}
          >
            <Shuffle className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full transition-all duration-200 active:scale-95"
          >
            <SkipBack className="w-8 h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 border-2 border-black rounded-lg transition-all duration-200 hover:bg-black/5 hover:shadow-md"
          >
            {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full transition-all duration-200 active:scale-95"
          >
            <SkipForward className="w-8 h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRepeatActive(!isRepeatActive)}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "active:scale-95",
              isRepeatActive && "text-[#F28C53]",
            )}
          >
            <Repeat className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setVolume(volume === 0 ? 70 : 0)}
            className="p-1 rounded-full transition-all duration-200 active:scale-95"
          >
            {getVolumeIcon()}
          </motion.button>
          <div className="relative flex-1 h-1.5 bg-black/20 rounded-full cursor-pointer">
            <motion.div
              animate={{ width: `${volume}%` }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute h-1.5 bg-black rounded-full"
            ></motion.div>
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
    </div>
  )
}
