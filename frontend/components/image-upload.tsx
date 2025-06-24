"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type.toLowerCase())) {
      alert("Please upload a valid image file (JPG, PNG, WebP)")
      return false
    }

    if (file.size > maxSize) {
      alert("File size must be less than 10MB")
      return false
    }

    return true
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile && validateFile(imageFile)) {
      handleFileUpload(imageFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      handleFileUpload(file)
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file)

      // Simulate upload delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onImageUpload(imageUrl)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Error uploading file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-lg scale-105"
              : "border-border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/30"
          }
          ${isUploading ? "pointer-events-none opacity-75" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"
              />
              <p className="text-muted-foreground font-medium">Processing image...</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDragOver ? "bg-blue-100 dark:bg-blue-900/50" : "bg-muted"
                }`}
              >
                <Upload
                  className={`h-8 w-8 ${isDragOver ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}
                />
              </motion.div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isDragOver ? "Drop your image here" : "Upload Skin Lesion Image"}
              </h3>

              <p className="text-muted-foreground mb-4">Drag and drop your image here, or click to browse</p>

              <Button variant="outline" className="pointer-events-none">
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose File
              </Button>

              <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG, WebP • Max 10MB</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag overlay effect */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-100/50 dark:bg-blue-950/50 rounded-xl border-2 border-blue-400 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
