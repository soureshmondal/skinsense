"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, AlertTriangle, CheckCircle, Info, Eye, Download } from "lucide-react"

interface AnalysisResult {
  classification: string
  confidence: number
  description: string
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

interface AnalysisResultsProps {
  result: AnalysisResult
  onChatOpen: () => void
}

const riskConfig = {
  low: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  medium: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Info,
    iconColor: "text-yellow-600",
  },
  high: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-600",
  },
}

export function AnalysisResults({ result, onChatOpen }: AnalysisResultsProps) {
  const riskStyle = riskConfig[result.riskLevel]
  const RiskIcon = riskStyle.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Detection Visualization Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              AI Detection Results
            </span>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Original Image</h4>
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={result.originalImage || "/placeholder.svg?height=300&width=300"}
                  alt="Original lesion"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Original
                </div>
              </div>
            </div>

            {/* Detected Image */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">AI Detection</h4>
              <div className="relative rounded-lg overflow-hidden border-2 border-purple-300 dark:border-purple-600">
                <img
                  src={result.detectedImage || "/placeholder.svg?height=300&width=300"}
                  alt="AI detected lesion"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                  AI Detected
                </div>
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded text-xs font-medium">
                  {result.confidence}% Confidence
                </div>
              </div>
            </div>
          </div>

          {/* Detection Details */}
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-3">Detection Analysis</h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Detected Region:</span>
                <p className="font-medium text-foreground">Primary lesion area</p>
              </div>
              <div>
                <span className="text-muted-foreground">Boundary Confidence:</span>
                <p className="font-medium text-foreground">{result.confidence}%</p>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Time:</span>
                <p className="font-medium text-foreground">2.3 seconds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Result Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardTitle className="flex items-center justify-between">
            <span>Classification Results</span>
            <Badge className={`${riskStyle.color} border`}>
              <RiskIcon className={`mr-1 h-3 w-3 ${riskStyle.iconColor}`} />
              {result.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Classification */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{result.classification}</h3>
              <p className="text-muted-foreground leading-relaxed">{result.description}</p>
            </div>

            {/* Confidence Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Classification Confidence</span>
                <span className="text-sm font-bold text-blue-600">{result.confidence}%</span>
              </div>
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.3 }}>
                <Progress value={result.confidence} className="h-3" />
              </motion.div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">94.2%</div>
                <div className="text-xs text-muted-foreground">Boundary Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">0.87</div>
                <div className="text-xs text-muted-foreground">IoU Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">12.3mm</div>
                <div className="text-xs text-muted-foreground">Est. Diameter</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">Asymmetric</div>
                <div className="text-xs text-muted-foreground">Shape Analysis</div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Chat CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="pt-4 border-t"
            >
              <Button onClick={onChatOpen} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask AI About This Result
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1 }}>
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium mb-1">Medical Disclaimer</p>
                <p>
                  This AI analysis is for informational purposes only and should not replace professional medical
                  advice. Always consult with a qualified dermatologist for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
