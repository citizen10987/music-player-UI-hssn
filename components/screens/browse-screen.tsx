"use client"

import { cn } from "@/lib/utils"
import { Headphones, Mic2, Radio, Disc } from "lucide-react"
import { motion } from "framer-motion"

// Sample data for the browse screen
const categories = [
  { id: 1, name: "New Releases", icon: Disc, color: "bg-[#F9D26E]" },
  { id: 2, name: "Podcasts", icon: Mic2, color: "bg-[#8DD3E7]" },
  { id: 3, name: "Radio", icon: Radio, color: "bg-[#F9C0B9]" },
  { id: 4, name: "Live Events", icon: Headphones, color: "bg-[#F5EED0]" },
]

const featuredPlaylists = [
  {
    id: 1,
    title: "Summer Vibes",
    description: "Perfect for sunny days",
    color: "bg-[#F9D26E]",
    pattern: "sun",
    accent: "bg-[#F28C53]",
  },
  {
    id: 2,
    title: "Focus Flow",
    description: "Concentration enhancing beats",
    color: "bg-[#8DD3E7]",
    pattern: "concentric",
    accent: "bg-[#F5EED0]",
  },
  {
    id: 3,
    title: "Retro Wave",
    description: "80s inspired synth music",
    color: "bg-[#F9C0B9]",
    pattern: "grid",
    accent: "bg-[#F9D26E]",
  },
]

const topCharts = [
  {
    id: 1,
    title: "Global Top 50",
    tracks: "50 tracks",
    color: "bg-[#F5EED0]",
    pattern: "bars",
    accent: "bg-[#F9D26E]",
  },
  {
    id: 2,
    title: "Trending Now",
    tracks: "30 tracks",
    color: "bg-[#F5EED0]",
    pattern: "arrow",
    accent: "bg-[#8DD3E7]",
  },
  {
    id: 3,
    title: "Viral Hits",
    tracks: "25 tracks",
    color: "bg-[#F5EED0]",
    pattern: "star",
    accent: "bg-[#F9C0B9]",
  },
  {
    id: 4,
    title: "Indie Discoveries",
    tracks: "40 tracks",
    color: "bg-[#F5EED0]",
    pattern: "diamond",
    accent: "bg-[#F28C53]",
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

interface BrowseScreenProps {
  onTrackSelect: (track: any) => void
}

export default function BrowseScreen({ onTrackSelect }: BrowseScreenProps) {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Browse
      </motion.h2>

      {/* Categories */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "py-3 px-4 border-2 border-black rounded-md font-bold text-lg transition-all duration-200",
              "flex items-center justify-center gap-2",
              category.color,
            )}
          >
            <category.icon className="w-5 h-5" />
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Featured Playlists */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold mb-4">Featured Playlists</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 gap-4">
          {featuredPlaylists.map((playlist) => (
            <motion.div
              key={playlist.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTrackSelect(playlist)}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "aspect-square border-2 border-black rounded-md overflow-hidden mb-2",
                  "transition-all duration-200 hover:shadow-md",
                  playlist.color,
                )}
              >
                {/* Illustration based on pattern */}
                <div className="w-full h-full relative p-4">
                  {playlist.pattern === "sun" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-1/2 h-1/2 rounded-full ${playlist.accent} border-2 border-black`}></div>
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-8 bg-black"
                          style={{
                            transform: `rotate(${i * 45}deg)`,
                            transformOrigin: "center",
                            left: "calc(50% - 2px)",
                            top: "calc(50% - 16px)",
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  {playlist.pattern === "concentric" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-3/4 h-3/4 rounded-full border-2 border-black`}></div>
                      <div className={`w-1/2 h-1/2 rounded-full ${playlist.accent} border-2 border-black`}></div>
                      <div className="w-1/4 h-1/4 rounded-full bg-black"></div>
                    </div>
                  )}
                  {playlist.pattern === "grid" && (
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className={`${i % 2 === 0 ? playlist.accent : "bg-transparent"} border border-black`}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <h4 className="font-bold text-lg leading-tight">{playlist.title}</h4>
              <p className="text-sm text-black/70">{playlist.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Top Charts */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <h3 className="text-2xl font-bold mb-4">Top Charts</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
          {topCharts.map((chart) => (
            <motion.div
              key={chart.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTrackSelect(chart)}
              className={cn(
                "flex items-center gap-3 p-3 border-2 border-black rounded-md",
                "transition-all duration-200 hover:shadow-md cursor-pointer",
              )}
            >
              <div
                className={cn("w-12 h-12 border border-black rounded-md overflow-hidden flex-shrink-0", chart.color)}
              >
                {/* Illustration based on pattern */}
                <div className="w-full h-full relative">
                  {chart.pattern === "bars" && (
                    <div className="absolute inset-0 flex items-end justify-center p-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`w-2 mx-0.5 ${chart.accent} border border-black`}
                          style={{ height: `${(i + 1) * 25}%` }}
                        ></div>
                      ))}
                    </div>
                  )}
                  {chart.pattern === "arrow" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[10px] border-b-black border-r-[6px] border-r-transparent transform rotate-[45deg]"></div>
                    </div>
                  )}
                  {chart.pattern === "star" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-8 h-8 ${chart.accent}`}
                        style={{
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        }}
                      ></div>
                    </div>
                  )}
                  {chart.pattern === "diamond" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-8 h-8 ${chart.accent} border border-black rotate-45`}></div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-bold">{chart.title}</h4>
                <p className="text-xs text-black/70">{chart.tracks}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
