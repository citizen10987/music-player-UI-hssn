"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Music, Disc, Mic2, Heart } from "lucide-react"
import { motion } from "framer-motion"

// Sample data for the library screen
const libraryCategories = [
  { id: "songs", name: "Songs", icon: Music },
  { id: "albums", name: "Albums", icon: Disc },
  { id: "artists", name: "Artists", icon: Mic2 },
  { id: "favorites", name: "Favorites", icon: Heart },
]

const songs = [
  {
    id: 1,
    title: "Peaceful Melody",
    artist: "Lo-Fi Beats",
    album: "Chill Collection",
    duration: "3:32",
    color: "bg-[#F9D26E]",
    pattern: "circle",
  },
  {
    id: 2,
    title: "Solitude",
    artist: "Chillhop",
    album: "Ambient Sounds",
    duration: "2:45",
    color: "bg-[#8DD3E7]",
    pattern: "waves",
  },
  {
    id: 3,
    title: "Morning Coffee",
    artist: "Easy Life",
    album: "Breakfast Tunes",
    duration: "4:12",
    color: "bg-[#F5EED0]",
    pattern: "dots",
  },
  {
    id: 4,
    title: "Urban Dreams",
    artist: "City Sounds",
    album: "Metropolitan",
    duration: "3:18",
    color: "bg-[#F9C0B9]",
    pattern: "triangle",
  },
  {
    id: 5,
    title: "Sunset Drive",
    artist: "Roadtrip",
    album: "Highway Collection",
    duration: "5:24",
    color: "bg-[#F28C53]",
    pattern: "square",
  },
]

const albums = [
  {
    id: 1,
    title: "Chill Collection",
    artist: "Lo-Fi Beats",
    tracks: "12 tracks",
    color: "bg-[#F9D26E]",
    pattern: "circle",
  },
  {
    id: 2,
    title: "Ambient Sounds",
    artist: "Chillhop",
    tracks: "8 tracks",
    color: "bg-[#8DD3E7]",
    pattern: "waves",
  },
  {
    id: 3,
    title: "Breakfast Tunes",
    artist: "Easy Life",
    tracks: "10 tracks",
    color: "bg-[#F5EED0]",
    pattern: "dots",
  },
]

const artists = [
  {
    id: 1,
    name: "Lo-Fi Beats",
    albums: "3 albums",
    color: "bg-[#F9D26E]",
    pattern: "circle",
  },
  {
    id: 2,
    name: "Chillhop",
    albums: "2 albums",
    color: "bg-[#8DD3E7]",
    pattern: "waves",
  },
  {
    id: 3,
    name: "Easy Life",
    albums: "1 album",
    color: "bg-[#F9C0B9]",
    pattern: "dots",
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

interface LibraryScreenProps {
  onTrackSelect: (track: any) => void
}

export default function LibraryScreen({ onTrackSelect }: LibraryScreenProps) {
  const [activeCategory, setActiveCategory] = useState("songs")

  const renderContent = () => {
    switch (activeCategory) {
      case "songs":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-6">
            {songs.map((song) => (
              <motion.div
                key={song.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onTrackSelect(song)}
                className={cn(
                  "flex items-center gap-3 p-3 border-b border-black/10",
                  "transition-all duration-200 cursor-pointer",
                )}
              >
                <div
                  className={cn("w-10 h-10 border border-black rounded-md overflow-hidden flex-shrink-0", song.color)}
                >
                  {/* Illustration based on pattern */}
                  <div className="w-full h-full relative">
                    {song.pattern === "circle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border border-black"></div>
                      </div>
                    )}
                    {song.pattern === "waves" && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center">
                        {[0, 1].map((i) => (
                          <div key={i} className="w-6 h-1 bg-black/70 rounded-full my-1"></div>
                        ))}
                      </div>
                    )}
                    {song.pattern === "dots" && (
                      <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="w-2 h-2 bg-black/70 rounded-full m-0.5"></div>
                        ))}
                      </div>
                    )}
                    {song.pattern === "triangle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-6 h-6 bg-black/70"
                          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                        ></div>
                      </div>
                    )}
                    {song.pattern === "square" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 bg-black/70 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{song.title}</h4>
                  <p className="text-xs text-black/70 truncate">
                    {song.artist} • {song.album}
                  </p>
                </div>
                <div className="text-sm text-black/70">{song.duration}</div>
              </motion.div>
            ))}
          </motion.div>
        )
      case "albums":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 mt-6"
          >
            {albums.map((album) => (
              <motion.div
                key={album.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTrackSelect(album)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "aspect-square border-2 border-black rounded-md overflow-hidden mb-2",
                    "transition-all duration-200 hover:shadow-md",
                    album.color,
                  )}
                >
                  {/* Illustration based on pattern */}
                  <div className="w-full h-full relative p-4">
                    {album.pattern === "circle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 rounded-full border-2 border-black"></div>
                        <div className="w-1/2 h-1/2 rounded-full border-2 border-black"></div>
                        <div className="w-1/4 h-1/4 rounded-full bg-black"></div>
                      </div>
                    )}
                    {album.pattern === "waves" && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-3/4 h-1.5 bg-black rounded-full my-2"
                            style={{ transform: `translateY(${i * 3}px)` }}
                          ></div>
                        ))}
                      </div>
                    )}
                    {album.pattern === "dots" && (
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 place-items-center">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-black rounded-full"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <h4 className="font-bold text-lg leading-tight">{album.title}</h4>
                <p className="text-sm text-black/70">
                  {album.artist} • {album.tracks}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )
      case "artists":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 mt-6"
          >
            {artists.map((artist) => (
              <motion.div
                key={artist.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTrackSelect(artist)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "aspect-square border-2 border-black rounded-md overflow-hidden mb-2",
                    "transition-all duration-200 hover:shadow-md",
                    artist.color,
                  )}
                >
                  {/* Artist illustration */}
                  <div className="w-full h-full relative p-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 rounded-full border-2 border-black overflow-hidden">
                        {artist.pattern === "circle" && (
                          <div className="absolute inset-[15%] rounded-full border-2 border-black"></div>
                        )}
                        {artist.pattern === "waves" && (
                          <div className="absolute inset-0 flex flex-col justify-center items-center">
                            {[0, 1].map((i) => (
                              <div
                                key={i}
                                className="w-1/2 h-1 bg-black rounded-full my-1"
                                style={{ transform: `translateY(${i * 10}px)` }}
                              ></div>
                            ))}
                          </div>
                        )}
                        {artist.pattern === "dots" && (
                          <div className="absolute inset-0 flex flex-wrap justify-center items-center p-4">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="w-2 h-2 bg-black rounded-full m-1"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-lg leading-tight">{artist.name}</h4>
                <p className="text-sm text-black/70">{artist.albums}</p>
              </motion.div>
            ))}
          </motion.div>
        )
      case "favorites":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-6">
            {songs.slice(0, 3).map((song) => (
              <motion.div
                key={song.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onTrackSelect(song)}
                className={cn(
                  "flex items-center gap-3 p-3 border-b border-black/10",
                  "transition-all duration-200 cursor-pointer",
                )}
              >
                <div
                  className={cn("w-10 h-10 border border-black rounded-md overflow-hidden flex-shrink-0", song.color)}
                >
                  {/* Illustration based on pattern */}
                  <div className="w-full h-full relative">
                    {song.pattern === "circle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border border-black"></div>
                      </div>
                    )}
                    {song.pattern === "waves" && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center">
                        {[0, 1].map((i) => (
                          <div key={i} className="w-6 h-1 bg-black/70 rounded-full my-1"></div>
                        ))}
                      </div>
                    )}
                    {song.pattern === "dots" && (
                      <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="w-2 h-2 bg-black/70 rounded-full m-0.5"></div>
                        ))}
                      </div>
                    )}
                    {song.pattern === "triangle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-6 h-6 bg-black/70"
                          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                        ></div>
                      </div>
                    )}
                    {song.pattern === "square" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 bg-black/70 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{song.title}</h4>
                  <p className="text-xs text-black/70 truncate">
                    {song.artist} • {song.album}
                  </p>
                </div>
                <div className="text-sm text-black/70">{song.duration}</div>
              </motion.div>
            ))}
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Library
      </motion.h2>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex border-2 border-black rounded-md overflow-hidden"
      >
        {libraryCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ backgroundColor: activeCategory === category.id ? "black" : "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "flex-1 py-2 px-3 flex items-center justify-center gap-2 transition-all duration-200",
              activeCategory === category.id ? "bg-black text-[#F5EED0] font-bold" : "bg-[#F5EED0]",
            )}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content Area */}
      {renderContent()}
    </div>
  )
}
