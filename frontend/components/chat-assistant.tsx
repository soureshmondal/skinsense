"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AnalysisResult {
  classification: string
  confidence: number
  riskLevel: "low" | "medium" | "high"
}

// interface ChatAssistantProps {
//   isOpen: boolean
//   onClose: () => void
//   analysisResult: AnalysisResult | null
// }
interface ChatAssistantProps {
  isOpen: boolean
  onClose: () => void
  analysisResult: AnalysisResult | null
  sessionId: string | null
}


const suggestedQuestions = [
  "What are the symptoms to watch for?",
  "Is this dangerous?",
  "What treatment options are available?",
  "When should I see a doctor?",
  "How can I prevent this in the future?",
]

// export function ChatAssistant({ isOpen, onClose, analysisResult }: ChatAssistantProps) {
export function ChatAssistant({ isOpen, onClose, analysisResult, sessionId }: ChatAssistantProps) {

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && analysisResult && messages.length === 0) {
      // Add initial message when chat opens
      const initialMessage: Message = {
        id: "1",
        type: "assistant",
        content: `Hello! I see you've received an analysis result for a ${analysisResult.classification} with ${analysisResult.confidence}% confidence. I'm here to help answer any questions you might have about your results, symptoms, treatment options, or next steps. What would you like to know?`,
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, analysisResult])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    // setTimeout(() => {
    //   const responses = [
    //     "Based on your analysis results, this appears to be a benign condition. However, it's important to monitor any changes in size, color, or texture. I recommend scheduling a follow-up with a dermatologist for professional evaluation.",
    //     "The symptoms to watch for include changes in asymmetry, border irregularity, color variation, diameter growth, or evolution of the lesion. If you notice any of these changes, consult a healthcare professional promptly.",
    //     "Treatment options vary depending on the specific diagnosis. For benign lesions, monitoring is often sufficient. However, some cases may require removal for cosmetic reasons or if there are concerning features.",
    //     "I recommend seeing a dermatologist within 2-4 weeks for a professional evaluation. They can provide a definitive diagnosis and recommend appropriate next steps based on their clinical examination.",
    //   ]

    //   const assistantMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     type: "assistant",
    //     content: responses[Math.floor(Math.random() * responses.length)],
    //     timestamp: new Date(),
    //   }

    //   setMessages((prev) => [...prev, assistantMessage])
    //   setIsTyping(false)
    // }, 2000)
    try {
  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: content,
    }),
  })

  const data = await res.json()
  const assistantMessage: Message = {
    id: Date.now().toString(),
    type: "assistant",
    content: data.response,
    timestamp: new Date(),
  }

  setMessages((prev) => [...prev, assistantMessage])
  setIsTyping(false)
} catch (error) {
  console.error(error)
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      type: "assistant",
      content: "Sorry, I couldn't fetch a response. Please try again later.",
      timestamp: new Date(),
    },
  ])
  setIsTyping(false)
}

  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-background shadow-2xl z-50 flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask about your results</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Analysis Summary */}
            {analysisResult && (
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="text-sm">
                  <div className="font-medium text-foreground mb-1">Current Analysis:</div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{analysisResult.classification}</span>
                    <Badge variant="secondary" className="text-xs">
                      {analysisResult.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-muted-foreground rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs h-auto py-1 px-2 bg-background hover:bg-muted"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  disabled={isTyping}
                  className="flex-1 bg-background border-border"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
