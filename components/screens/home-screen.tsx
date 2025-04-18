"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Sample data for the home screen
const genres = [
  { id: 1, name: "Chill Hits", color: "bg-[#8DD3E7]" },
  { id: 2, name: "LoFi Vibes", color: "bg-[#F5EED0]" },
  { id: 3, name: "Indie Rock", color: "bg-[#F9D26E]" },
  { id: 4, name: "Jazz", color: "bg-[#F5EED0]" },
]

const recentlyPlayed = [
  {
    id: 1,
    title: "Peaceful Melody",
    artist: "Lo-Fi Beats",
    color: "bg-[#F9D26E]",
    pattern: "circle",
    accent: "bg-[#F28C53]",
  },
  {
    id: 2,
    title: "Solitude",
    artist: "Chillhop",
    color: "bg-[#8DD3E7]",
    pattern: "waves",
    accent: "bg-[#F5EED0]",
  },
  {
    id: 3,
    title: "Morning Coffee",
    artist: "Easy Life",
    color: "bg-[#F5EED0]",
    pattern: "dots",
    accent: "bg-[#F9C0B9]",
  },
]

const madeForYou = [
  {
    id: 4,
    title: "Catagans",
    artist: "Nature Sounds",
    color: "bg-[#F9C0B9]",
    pattern: "triangle",
    accent: "bg-[#F9D26E]",
  },
  {
    id: 5,
    title: "Pregres",
    artist: "Urban Beats",
    color: "bg-[#F28C53]",
    pattern: "square",
    accent: "bg-[#8DD3E7]",
  },
  {
    id: 6,
    title: "Cotton",
    artist: "Ambient Flow",
    color: "bg-[#F9D26E]",
    pattern: "zigzag",
    accent: "bg-[#F5EED0]",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

interface HomeScreenProps {
  onTrackSelect: (track: any) => void
}

export default function HomeScreen({ onTrackSelect }: HomeScreenProps) {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Home
      </motion.h2>

      {/* Genre Buttons */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 mb-8">
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "py-3 px-4 border-2 border-black rounded-md font-bold text-lg transition-all duration-200",
              genre.color,
            )}
          >
            {genre.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Recently Played Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold mb-4">Recently played</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 gap-4">
          {recentlyPlayed.map((track) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTrackSelect(track)}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "aspect-square border-2 border-black rounded-md overflow-hidden mb-2",
                  "transition-all duration-200 hover:shadow-md",
                  track.color,
                )}
              >
                {/* Illustration based on pattern */}
                <div className="w-full h-full relative p-4">
                  {track.pattern === "circle" && (
                    <div className="absolute inset-4 rounded-full border-2 border-black flex items-center justify-center">
                      <div className={`w-1/2 h-1/2 rounded-full ${track.accent} border-2 border-black`}></div>
                    </div>
                  )}
                  {track.pattern === "waves" && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`w-3/4 h-2 ${track.accent} border border-black rounded-full my-2`}
                          style={{ transform: `translateY(${i * 5}px)` }}
                        ></div>
                      ))}
                    </div>
                  )}
                  {track.pattern === "dots" && (
                    <div className="absolute inset-0 flex flex-wrap justify-center items-center p-6">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className={`w-3 h-3 ${track.accent} border border-black rounded-full m-1`}></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <h4 className="font-bold text-lg leading-tight">{track.title}</h4>
              <p className="text-sm text-black/70">{track.artist}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Made For You Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <h3 className="text-2xl font-bold mb-4">Made for you</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 gap-4">
          {madeForYou.map((track) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTrackSelect(track)}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "aspect-square border-2 border-black rounded-md overflow-hidden mb-2",
                  "transition-all duration-200 hover:shadow-md",
                  track.color,
                )}
              >
                {/* Illustration based on pattern */}
                <div className="w-full h-full relative p-4">
                  {track.pattern === "triangle" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-3/4 h-3/4 ${track.accent} border-2 border-black`}
                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                      ></div>
                    </div>
                  )}
                  {track.pattern === "square" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-2/3 h-2/3 ${track.accent} border-2 border-black rotate-45`}></div>
                    </div>
                  )}
                  {track.pattern === "zigzag" && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      <svg
                        width="80%"
                        height="40%"
                        viewBox="0 0 100 30"
                        className="stroke-black"
                        strokeWidth="2"
                        fill="none"
                      >
                        <path
                          d="M0,15 L20,5 L40,25 L60,5 L80,25 L100,15"
                          className={track.accent.replace("bg-", "stroke-")}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <h4 className="font-bold text-lg leading-tight">{track.title}</h4>
              <p className="text-sm text-black/70">{track.artist}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
