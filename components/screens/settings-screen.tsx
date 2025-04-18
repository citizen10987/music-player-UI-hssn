"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sun, Volume2, Wifi, Bell, Shield, HelpCircle, LogOut } from "lucide-react"
import { motion } from "framer-motion"

// Sample settings data
const audioSettings = [
  { id: "quality", name: "Audio Quality", options: ["Normal", "High", "Very High"], current: "High" },
  { id: "equalizer", name: "Equalizer", options: ["Flat", "Bass Boost", "Treble Boost", "Custom"], current: "Flat" },
  { id: "crossfade", name: "Crossfade", options: ["Off", "1s", "3s", "5s"], current: "3s" },
]

const appSettings = [
  { id: "theme", name: "Theme", options: ["Light", "Dark", "System"], current: "Light" },
  { id: "language", name: "Language", options: ["English", "Spanish", "French", "German"], current: "English" },
  { id: "notifications", name: "Notifications", options: ["All", "Important Only", "None"], current: "All" },
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

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    audioQuality: "High",
    equalizer: "Flat",
    crossfade: "3s",
    theme: "Light",
    language: "English",
    notifications: "All",
  })

  const updateSetting = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Settings
      </motion.h2>

      {/* Audio Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-5 h-5" />
          <h3 className="text-xl font-bold">Audio</h3>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          {audioSettings.map((setting) => (
            <motion.div
              key={setting.id}
              variants={itemVariants}
              className="border-2 border-black rounded-md p-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold">{setting.name}</h4>
                <span className="text-sm text-black/70">Current: {setting.current}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {setting.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSetting(setting.id, option)}
                    className={cn(
                      "py-2 px-4 border-2 border-black rounded-full text-sm font-medium transition-all duration-200",
                      setting.current === option ? "bg-black text-[#F5EED0]" : "hover:bg-black/10",
                    )}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* App Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-5 h-5" />
          <h3 className="text-xl font-bold">Appearance</h3>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          {appSettings.map((setting) => (
            <motion.div
              key={setting.id}
              variants={itemVariants}
              className="border-2 border-black rounded-md p-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold">{setting.name}</h4>
                <span className="text-sm text-black/70">Current: {setting.current}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {setting.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSetting(setting.id, option)}
                    className={cn(
                      "py-2 px-4 border-2 border-black rounded-full text-sm font-medium transition-all duration-200",
                      setting.current === option ? "bg-black text-[#F5EED0]" : "hover:bg-black/10",
                    )}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
          {[
            { icon: Wifi, label: "Offline Mode" },
            { icon: Bell, label: "Clear Notifications" },
            { icon: Shield, label: "Privacy Settings" },
            { icon: HelpCircle, label: "Help & Support" },
          ].map((action, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 p-4 border-2 border-black rounded-md transition-all duration-200"
            >
              <action.icon className="w-5 h-5" />
              <span className="font-medium">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(249,192,185,0.8)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 flex items-center justify-center gap-3 p-4 border-2 border-black rounded-md bg-[#F9C0B9] transition-all duration-200 hover:shadow-md"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Sign Out</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
