"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample data for the search screen
const recentSearches = ["Lo-Fi Beats", "Morning Coffee", "Jazz Classics", "Study Music"]

const topSearches = [
  {
    id: 1,
    title: "Chill Hits",
    color: "bg-[#8DD3E7]",
    pattern: "circle",
  },
  {
    id: 2,
    title: "Focus Flow",
    color: "bg-[#F9D26E]",
    pattern: "concentric",
  },
  {
    id: 3,
    title: "Indie Rock",
    color: "bg-[#F9C0B9]",
    pattern: "triangle",
  },
  {
    id: 4,
    title: "Jazz",
    color: "bg-[#F5EED0]",
    pattern: "waves",
  },
  {
    id: 5,
    title: "Easy Life",
    color: "bg-[#F28C53]",
    pattern: "dots",
  },
  {
    id: 6,
    title: "Ambient",
    color: "bg-[#8DD3E7]",
    pattern: "grid",
  },
]

const searchResults = [
  {
    id: 1,
    title: "Peaceful Melody",
    artist: "Lo-Fi Beats",
    type: "Song",
    color: "bg-[#F9D26E]",
    pattern: "circle",
  },
  {
    id: 2,
    title: "Lo-Fi Beats",
    type: "Artist",
    color: "bg-[#F9D26E]",
    pattern: "dots",
  },
  {
    id: 3,
    title: "Chill Collection",
    artist: "Lo-Fi Beats",
    type: "Album",
    color: "bg-[#F9D26E]",
    pattern: "waves",
  },
  {
    id: 4,
    title: "Lo-Fi Study",
    type: "Playlist",
    color: "bg-[#8DD3E7]",
    pattern: "grid",
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

interface SearchScreenProps {
  onTrackSelect: (track: any) => void
}

export default function SearchScreen({ onTrackSelect }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
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
        Search
      </motion.h2>

      {/* Search Bar */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSearch}
        className="mb-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Artists, songs, or podcasts"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsSearching(false)
            }}
            className="w-full py-3 px-4 pl-12 border-2 border-black rounded-md bg-[#F5EED0] focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-[#F5EED0] py-1 px-3 rounded-md text-sm font-medium transition-all duration-200 hover:bg-black/80"
          >
            Search
          </motion.button>
        </div>
      </motion.form>

      <AnimatePresence mode="wait">
        {isSearching ? (
          /* Search Results */
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Results for "{searchQuery}"</h3>
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
              {searchResults.map((result) => (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.03)", scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onTrackSelect(result)}
                  className={cn(
                    "flex items-center gap-3 p-3 border border-black rounded-md",
                    "transition-all duration-200 cursor-pointer",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 border border-black rounded-md overflow-hidden flex-shrink-0",
                      result.color,
                    )}
                  >
                    {/* Illustration based on pattern */}
                    <div className="w-full h-full relative">
                      {result.pattern === "circle" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border border-black"></div>
                        </div>
                      )}
                      {result.pattern === "dots" && (
                        <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="w-2 h-2 bg-black/70 rounded-full m-0.5"></div>
                          ))}
                        </div>
                      )}
                      {result.pattern === "waves" && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                          {[0, 1].map((i) => (
                            <div key={i} className="w-6 h-1 bg-black/70 rounded-full my-1"></div>
                          ))}
                        </div>
                      )}
                      {result.pattern === "grid" && (
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="w-full h-full bg-black/70"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{result.title}</h4>
                    <p className="text-xs text-black/70 truncate">
                      {result.artist ? `${result.artist} • ` : ""}
                      {result.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recent Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Recent searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, backgroundColor: "black", color: "#F5EED0" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery(search)
                      setIsSearching(true)
                    }}
                    className="py-2 px-4 border-2 border-black rounded-full text-sm font-medium transition-all duration-200"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Top Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">Browse all</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4"
              >
                {topSearches.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSearchQuery(category.title)
                      setIsSearching(true)
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3 border-2 border-black rounded-md",
                      "transition-all duration-200 cursor-pointer",
                      category.color,
                    )}
                  >
                    <div className="w-12 h-12 border border-black rounded-md overflow-hidden flex-shrink-0">
                      {/* Illustration based on pattern */}
                      <div className="w-full h-full relative">
                        {category.pattern === "circle" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-black"></div>
                          </div>
                        )}
                        {category.pattern === "concentric" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-black"></div>
                            <div className="w-4 h-4 rounded-full border-2 border-black"></div>
                          </div>
                        )}
                        {category.pattern === "triangle" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-8 h-8 bg-black/70"
                              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                            ></div>
                          </div>
                        )}
                        {category.pattern === "waves" && (
                          <div className="absolute inset-0 flex flex-col justify-center items-center">
                            {[0, 1, 2].map((i) => (
                              <div key={i} className="w-8 h-1 bg-black/70 rounded-full my-1"></div>
                            ))}
                          </div>
                        )}
                        {category.pattern === "dots" && (
                          <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="w-2 h-2 bg-black/70 rounded-full m-0.5"></div>
                            ))}
                          </div>
                        )}
                        {category.pattern === "grid" && (
                          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="w-full h-full bg-black/70"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="font-bold">{category.title}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
