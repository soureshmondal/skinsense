"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Globe, Shield, BookOpen } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"



const stats = [
  { icon: Users, number: "50K+", label: "Users Helped" },
  { icon: Award, number: "95%", label: "Accuracy Rate" },
  { icon: Globe, number: "10K+", label: "Image Dataset" },
  { icon: Heart, number: "24/7", label: "Support" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're dedicated to making advanced skin health analysis accessible to everyone, combining cutting-edge AI
            technology with medical expertise to help detect potential skin conditions early.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <AnimatedSection className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                  To democratize access to advanced dermatological screening through AI technology, empowering
                  individuals to take proactive steps in their skin health journey while supporting healthcare
                  professionals with innovative diagnostic tools.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection className="mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        

        {/* Technology & Safety */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <BookOpen className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Our Technology</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our AI model is trained on the HAM10000 dataset, one of the largest collections of dermatoscopic
                    images, ensuring high accuracy across diverse skin types and lesion categories.
                  </p>
                  <ul className="space-y-2 text-white-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Deep Convolutional Neural Networks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Continuous Model Updates
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Medical Expert Validation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <Shield className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Privacy & Disclaimer</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Your privacy is our priority. All images are processed securely and never stored on our servers. Our
                    AI analysis is for informational purposes only and should not replace professional medical advice.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Always consult with a qualified dermatologist for proper diagnosis and
                      treatment of skin conditions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
