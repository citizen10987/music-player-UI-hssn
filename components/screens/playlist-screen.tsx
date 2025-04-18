"use client"
import { cn } from "@/lib/utils"
import { X, Clock, Music } from "lucide-react"
import { motion } from "framer-motion"

// Sample playlist data
const playlist = [
  {
    id: 1,
    title: "Peaceful Melody",
    artist: "Lo-Fi Beats",
    duration: "3:32",
    cover: "/album-covers/peaceful-melody.png",
    color: "bg-[#F9D26E]",
  },
  {
    id: 2,
    title: "Midnight Dreams",
    artist: "Lo-Fi Beats",
    duration: "2:45",
    cover: "/album-covers/solitude.png",
    color: "bg-[#8DD3E7]",
  },
  {
    id: 3,
    title: "Rainy Day",
    artist: "Lo-Fi Beats",
    duration: "4:12",
    cover: "/album-covers/morning-coffee.png",
    color: "bg-[#F9C0B9]",
  },
  {
    id: 4,
    title: "Coffee Shop",
    artist: "Lo-Fi Beats",
    duration: "3:05",
    cover: "/album-covers/catagans.png",
    color: "bg-[#8DD3E7]",
  },
  {
    id: 5,
    title: "Study Session",
    artist: "Lo-Fi Beats",
    duration: "5:18",
    cover: "/album-covers/pregres.png",
    color: "bg-[#F9D26E]",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

interface PlaylistScreenProps {
  onClose: () => void
  onTrackSelect: (track: any) => void
  isPlaying: boolean
  currentTrackId: number
}

export default function PlaylistScreen({ onClose, onTrackSelect, isPlaying, currentTrackId }: PlaylistScreenProps) {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight"
        >
          Playlist
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full transition-all duration-200 active:scale-95"
        >
          <X className="w-5 h-5" />
        </motion.button>
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
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-2">
        {playlist.map((track, index) => (
          <motion.div
            key={track.id}
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onTrackSelect(track)}
            className={cn(
              "grid grid-cols-12 py-3 text-sm border-b border-black/10 cursor-pointer",
              "transition-colors duration-150",
              track.id === currentTrackId && "bg-black/5 font-medium",
            )}
          >
            <div className="col-span-1 flex items-center">
              {track.id === currentTrackId && isPlaying ? (
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <div className="w-1 h-3 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite] mx-px"></div>
                  <div className="w-1 h-2 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite_0.2s] mx-px"></div>
                  <div className="w-1 h-4 bg-[#F28C53] animate-[pulse_1s_ease-in-out_infinite_0.4s] mx-px"></div>
                </div>
              ) : (
                index + 1
              )}
            </div>
            <div className="col-span-5 flex items-center gap-2">
              <div className={cn("w-8 h-8 border border-black rounded-md overflow-hidden flex-shrink-0", track.color)}>
                {/* Simple pattern based on track id */}
                <div className="w-full h-full relative">
                  {track.id % 5 === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 bg-black/20 rotate-45"></div>
                    </div>
                  )}
                  {track.id % 5 === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-black/40"></div>
                    </div>
                  )}
                  {track.id % 5 === 2 && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      {[0, 1].map((i) => (
                        <div key={i} className="w-5 h-0.5 bg-black/40 rounded-full my-0.5"></div>
                      ))}
                    </div>
                  )}
                  {track.id % 5 === 3 && (
                    <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-black/40 rounded-full m-0.5"></div>
                      ))}
                    </div>
                  )}
                  {track.id % 5 === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-4 h-4 bg-black/20"
                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="truncate">{track.title}</span>
            </div>
            <div className="col-span-4 truncate flex items-center text-black/70">{track.artist}</div>
            <div className="col-span-2 flex justify-end items-center">{track.duration}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add to Playlist Button */}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 border-2 border-black rounded-md transition-all duration-200 hover:shadow-sm"
      >
        <Music className="w-4 h-4" />
        <span className="font-medium">Add Songs</span>
      </motion.button>
    </div>
  )
}
