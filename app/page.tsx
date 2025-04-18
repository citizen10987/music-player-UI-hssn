"use client"

import { useState, useEffect } from "react"
import { Home, CreditCard, Library, Search, List, Settings, Music, Heart, Clock, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import HomeScreen from "@/components/screens/home-screen"
import BrowseScreen from "@/components/screens/browse-screen"
import LibraryScreen from "@/components/screens/library-screen"
import SearchScreen from "@/components/screens/search-screen"
import SettingsScreen from "@/components/screens/settings-screen"
import PlayerScreen from "@/components/screens/player-screen"
import PlaylistScreen from "@/components/screens/playlist-screen"
import { AnimatePresence, motion } from "framer-motion"

export default function MusicPlayerApp() {
  const [activeScreen, setActiveScreen] = useState("Home")
  const [showPlayer, setShowPlayer] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState({
    id: 1,
    title: "Peaceful Melody",
    artist: "Lo-Fi Beats",
    duration: "3:32",
    color: "bg-[#F9D26E]",
    pattern: "circle",
  })

  // Navigation menu items
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Browse", icon: CreditCard },
    { name: "Library", icon: Library },
    { name: "Search", icon: Search },
  ]

  const bottomMenuItems = [
    { name: "Playlist", icon: List, action: () => setShowPlaylist(true) },
    { name: "Settings", icon: Settings },
  ]

  // Handle track selection
  const handleTrackSelect = (track: any) => {
    setCurrentTrack(track)
    setShowPlayer(true)
    setIsPlaying(true)
  }

  // Add a subtle page transition effect
  useEffect(() => {
    // Add a class to the body for background transitions
    document.body.classList.add("transition-colors", "duration-700")
    return () => {
      document.body.classList.remove("transition-colors", "duration-700")
    }
  }, [])

  // Render the active screen
  const renderScreen = () => {
    switch (activeScreen) {
      case "Home":
        return <HomeScreen onTrackSelect={handleTrackSelect} />
      case "Browse":
        return <BrowseScreen onTrackSelect={handleTrackSelect} />
      case "Library":
        return <LibraryScreen onTrackSelect={handleTrackSelect} />
      case "Search":
        return <SearchScreen onTrackSelect={handleTrackSelect} />
      case "Settings":
        return <SettingsScreen />
      default:
        return <HomeScreen onTrackSelect={handleTrackSelect} />
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#8DD3E7] via-[#F9D9A7] to-[#F9D9A7] transition-all duration-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-3xl overflow-hidden border-2 border-black rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        {/* Sidebar */}
        <div className="flex flex-col w-64 bg-[#F5EED0] border-r-2 border-black">
          {/* App Name */}
          <div className="flex items-center p-4 border-b-2 border-black bg-[#F5EED0]">
            <motion.h1
              key={activeScreen}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold tracking-tight"
            >
              {activeScreen}
            </motion.h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="pt-2">
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveScreen(item.name)
                    setShowPlaylist(false)
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-all duration-200",
                    "hover:bg-[#F5EED0]/80",
                    activeScreen === item.name && "bg-[#F5EED0]/80 font-semibold",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-transform duration-200",
                      activeScreen === item.name && "scale-110 text-[#F28C53]",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </motion.li>
              ))}
            </ul>

            <div className="border-t-2 border-black my-2"></div>

            <ul>
              {bottomMenuItems.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveScreen(item.name)
                    if (item.action) item.action()
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-all duration-200",
                    "hover:bg-[#F5EED0]/80",
                    activeScreen === item.name && "bg-[#F5EED0]/80 font-semibold",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-transform duration-200",
                      activeScreen === item.name && "scale-110 text-[#F28C53]",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Current Track Info in Sidebar */}
          <motion.div
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border-t-2 border-black cursor-pointer transition-colors duration-200"
            onClick={() => setShowPlayer(true)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#F9D26E] border border-black rounded flex items-center justify-center mr-3 overflow-hidden">
                {/* Simple pattern based on current track */}
                <div className="w-full h-full relative">
                  {currentTrack.pattern === "circle" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border border-black"></div>
                    </div>
                  )}
                  {currentTrack.pattern === "waves" && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      {[0, 1].map((i) => (
                        <div key={i} className="w-6 h-1 bg-black/70 rounded-full my-1"></div>
                      ))}
                    </div>
                  )}
                  {currentTrack.pattern === "dots" && (
                    <div className="absolute inset-0 flex flex-wrap justify-center items-center p-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-black/70 rounded-full m-0.5"></div>
                      ))}
                    </div>
                  )}
                  {!currentTrack.pattern && <Music className="w-5 h-5" />}
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{currentTrack.title}</p>
                <p className="text-xs text-black/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-[#F5EED0]">
          <AnimatePresence mode="wait">
            {showPlayer ? (
              <motion.div
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <PlayerScreen
                  track={currentTrack}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  onClose={() => setShowPlayer(false)}
                  onPlaylistToggle={() => setShowPlaylist(!showPlaylist)}
                />
              </motion.div>
            ) : showPlaylist ? (
              <motion.div
                key="playlist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <PlaylistScreen
                  onClose={() => setShowPlaylist(false)}
                  onTrackSelect={handleTrackSelect}
                  isPlaying={isPlaying}
                  currentTrackId={currentTrack.id}
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {renderScreen()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Control Bar */}
          <div className="flex items-center justify-between p-3 mt-auto bg-[#F9C0B9] border-t-2 border-black">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPlayer(true)}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95 hover:shadow-sm"
            >
              <Music className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95 hover:shadow-sm"
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPlayer(true)}
              className="px-16 py-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 hover:shadow-md"
            >
              <div className="flex items-center justify-center gap-2">
                {isPlaying && (
                  <div className="flex items-center h-3 space-x-0.5">
                    <div className="w-0.5 h-1.5 bg-black animate-[pulse_1s_ease-in-out_infinite]"></div>
                    <div className="w-0.5 h-2 bg-black animate-[pulse_1s_ease-in-out_infinite_0.2s]"></div>
                    <div className="w-0.5 h-3 bg-black animate-[pulse_1s_ease-in-out_infinite_0.4s]"></div>
                  </div>
                )}
                <span className="text-xs font-medium">Now Playing</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95 hover:shadow-sm"
            >
              <Clock className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 border-2 border-black rounded-md transition-all duration-200 hover:bg-[#F9C0B9]/80 active:scale-95 hover:shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
