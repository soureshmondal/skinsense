"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Brain, BarChart3, MessageCircle, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Image",
    description:
      "Take a clear photo of your skin lesion and upload it securely to our platform. We support JPG and PNG formats.",
    details: [
      "Ensure good lighting and focus",
      "Include a ruler or coin for scale reference",
      "Avoid shadows or reflections",
    ],
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced neural network, trained on thousands of dermatological images, analyzes your lesion in seconds.",
    details: ["Deep learning classification model", "Trained on HAM10000 dataset", "95%+ accuracy rate"],
  },
  {
    icon: BarChart3,
    title: "Get Results",
    description:
      "Receive detailed classification results with confidence scores and risk assessment for your skin lesion.",
    details: ["Lesion type classification", "Confidence percentage", "Risk level assessment"],
  },
  {
    icon: MessageCircle,
    title: "Ask Questions",
    description:
      "Chat with our AI assistant to understand your results, learn about symptoms, and get guidance on next steps.",
    details: ["Personalized explanations", "Treatment recommendations", "When to see a doctor"],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform makes skin lesion analysis simple, fast, and accessible. Here's how we help you
            understand your skin health in just four easy steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedSection key={index} className="mb-12 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card border">
                  <CardContent className="p-8">
                    <div
                      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                    >
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <step.icon className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2 text-foreground">
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Technology Section */}
        <AnimatedSection className="mt-20">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Powered by Advanced AI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our technology combines state-of-the-art machine learning with medical expertise to provide accurate and
              reliable skin lesion analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Privacy & Security",
                description: "Your images are processed securely and never stored on our servers.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get results in seconds with our optimized AI processing pipeline.",
              },
              {
                icon: Brain,
                title: "Continuously Learning",
                description: "Our AI model is regularly updated with the latest medical research.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
