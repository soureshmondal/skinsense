"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ImageIcon, Brain } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { AnalysisResults } from "@/components/analysis-results"
import { ChatAssistant } from "@/components/chat-assistant"
import { AnimatedSection } from "@/components/animated-section"


interface AnalysisResult {
  classification: string
  confidence: number
  description: string
  preventionTips?: string[]
  symptoms: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
  originalImage?: string
  detectedImage?: string
  detectionRegions?: Array<{
    x: number
    y: number
    width: number
    height: number
    confidence: number
    label: string
  }>
}

export default function AnalyzePage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleImageUpload = useCallback((imageUrl: string) => {
    setUploadedImage(imageUrl)
    setAnalysisResult(null)
    setShowChat(false)
  }, [])

  // const handleAnalyze = async () => {
  //   if (!uploadedImage) return

  //   setIsAnalyzing(true)

  //   // Simulate AI analysis with multiple stages
  //   await new Promise((resolve) => setTimeout(resolve, 3000))

  //   // Mock analysis result with detection images
  //   const mockResult: AnalysisResult = {
  //     classification: "Benign Nevus",
  //     confidence: 87.3,
  //     description: "A benign (non-cancerous) mole or nevus. These are common skin growths that are typically harmless.",
  //     recommendations: [
  //       "Monitor for any changes in size, color, or shape",
  //       "Protect from sun exposure with SPF 30+ sunscreen",
  //       "Schedule routine dermatological check-ups every 6-12 months",
  //       "Take monthly self-examination photos for comparison",
  //     ],
  //     riskLevel: "low",
  //     originalImage: uploadedImage,
  //     // In a real app, this would come from the backend AI processing
  //     detectedImage: "/placeholder.svg?height=300&width=300&text=AI+Detected+Lesion",
  //     detectionRegions: [
  //       {
  //         x: 120,
  //         y: 80,
  //         width: 60,
  //         height: 45,
  //         confidence: 87.3,
  //         label: "Primary lesion",
  //       },
  //     ],
  //   }

  //   setAnalysisResult(mockResult)
  //   setIsAnalyzing(false)
  // }
  const handleAnalyze = async () => {
  if (!uploadedImage) return
  setIsAnalyzing(true)

  try {
    const formData = new FormData()
    const response = await fetch(uploadedImage)
    const blob = await response.blob()
    formData.append("image", blob, "upload.jpg")

    const apiRes = await fetch("https://souresh-skin-lesion-detection.hf.space/analyze", {
      method: "POST",
      body: formData,
    })

    if (!apiRes.ok) throw new Error("Analysis failed")
    const data = await apiRes.json()

    const result: AnalysisResult = {
      classification: data.full_name,
      confidence: data.confidence,
      description: data.description,
      preventionTips: data.prevention_tips,
      symptoms:data.symptoms,
      recommendations: data.recommendations,
      riskLevel: data.risk_level,
      originalImage: uploadedImage,
      detectedImage: data.visualization,
    }

    setSessionId(data.session_id)
    setAnalysisResult(result)
  } catch (err) {
    console.error(err)
    alert("Failed to analyze image")
  } finally {
    setIsAnalyzing(false)
  }
}


  const handleChatOpen = () => {
    setShowChat(true)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">AI Skin Lesion Analysis</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a clear image of your skin lesion for instant AI-powered classification and analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <AnimatedSection>
            <Card className="h-fit bg-card border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <ImageIcon className="h-5 w-5" />
                  Image Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Only show ImageUpload if no image is uploaded or no analysis is done */}
                {!uploadedImage && <ImageUpload onImageUpload={handleImageUpload} />}

                {/* Show uploaded image preview only after upload */}
                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded lesion"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Uploaded Image
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <Brain className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-5 w-5" />
                            Analyze Lesion
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setUploadedImage(null)
                          setAnalysisResult(null)
                          setShowChat(false)
                        }}
                        disabled={isAnalyzing}
                      >
                        Upload New
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Results Section */}
          <AnimatedSection>
            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 animate-pulse" />
                        AI Analysis in Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center py-8">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
                          />
                          <p className="text-muted-foreground font-medium">Processing your image...</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Detecting lesion boundaries and analyzing features
                          </p>
                        </div>
                        <Progress value={75} className="w-full" />
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>✓ Image preprocessing complete</div>
                            <div>✓ Feature extraction in progress</div>
                            <div>⏳ Classification analysis...</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {analysisResult && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnalysisResults result={analysisResult} onChatOpen={handleChatOpen} />
                </motion.div>
              )}

              {!isAnalyzing && !analysisResult && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-64 text-muted-foreground"
                >
                  <div className="text-center">
                    <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to begin analysis</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>

      {/* Chat Assistant */}
      {/* <ChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} analysisResult={analysisResult} /> */}
      <ChatAssistant
      isOpen={showChat}
      onClose={() => setShowChat(false)}
      analysisResult={analysisResult}
      sessionId={sessionId}/>

    </div>
  )
}
