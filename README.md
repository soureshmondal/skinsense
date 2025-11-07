# SkinSense - AI-Powered Skin Lesion Detection & AI Chatbot

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue)](https://skinsense-five.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Languages](https://img.shields.io/badge/TypeScript-97.7%25-blue) ![CSS](https://img.shields.io/badge/CSS-2.1%25-purple) ![JavaScript](https://img.shields.io/badge/JavaScript-0.2%25-green)

## 📋 Overview

SkinSense is a comprehensive web application that detects and classifies skin lesions using deep learning models trained on the HAM10000 dataset. The platform features an integrated AI chatbot powered by the Gemini API to provide interactive dermatology-related guidance, explainable results, and personalized health recommendations.

## 🎯 Key Features

- **Deep Learning-Based Skin Lesion Classification**: Accurately detects and classifies 7 types of skin lesions using EfficientNet architecture trained on HAM10000 dataset
- **Interactive AI Chatbot**: Gemini API-powered chatbot for real-time dermatology queries and result explanation
- **Real-Time Image Processing**: FastAPI backend with optimized preprocessing pipeline for instant predictions
- **Multi-Format Upload Support**: Drag-and-drop, file upload, and webcam capture functionality
- **Responsive UI**: TypeScript + Next.js frontend with TailwindCSS for seamless cross-device experience
- **Explainable Results**: Detailed confidence scores and probability distributions for each lesion classification
- **User-Friendly Interface**: Intuitive design enabling non-technical users to interact with medical-grade AI

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| Accuracy | ~91% |
| Framework | EfficientNet + DenseNet(Ensemble model) |
| Dataset | HAM10000 (10,000+ dermatoscopic images) |
| Classes | 7 skin lesion types |
| Preprocessing | Image normalization, augmentation, and enhancement |

### Supported Lesion Classifications

- Melanoma (MEL)
- Melanocytic Nevi (NV)
- Basal Cell Carcinoma (BCC)
- Actinic Keratoses (AK)
- Benign Keratosis (BKL)
- Dermatofibroma (DF)
- Vascular Lesions (VASC)

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **UI Components**: Custom React components with responsive design

### Backend
- **Framework**: FastAPI (Python)
- **Model Inference**: PyTorch with EfficientNet
- **API Integration**: Gemini API for AI chatbot functionality
- **Image Processing**: OpenCV, PIL for preprocessing and enhancement
- **Deployment**: Hugging Face Spaces

### Data Pipeline
- **Dataset**: HAM10000 (10,000 dermatoscopic images)
- **Preprocessing**: Normalization, augmentation, histogram equalization
- **Train-Test Split**: Optimized for balanced class distribution
- **Feature Engineering**: Transfer learning from ImageNet pre-trained weights

## 🚀 Deployment

- **Frontend**: Hosted on [Vercel](https://skinsense-five.vercel.app/)
- **Backend**: Deployed on Hugging Face Spaces
- **Live URL**: https://skinsense-five.vercel.app/


## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js, TypeScript, React, TailwindCSS |
| **Backend** | FastAPI, Python, PyTorch, EfficientNet |
| **ML/AI** | EfficientNet, Transfer Learning, Gemini API |
| **Database** | N/A (Stateless API) |
| **Deployment** | Vercel (Frontend), Hugging Face Spaces (Backend) |
| **Image Processing** | OpenCV, PIL, NumPy |
| **Dataset** | HAM10000 |

## 📈 Model Development

### Feature Engineering
- Transfer learning from ImageNet pre-trained weights
- EfficientNet architecture for optimal accuracy-efficiency tradeoff
- Data augmentation techniques (rotation, flipping, color jittering)
- Class balancing via resampling to handle dataset imbalance

### Training Pipeline
- Loss Function: Weighted Cross-Entropy Loss
- Optimizer: Adam
- Learning Rate: 0.001 with learning rate scheduling
- Batch Size: 32
- Epochs: 50+ with early stopping

### Validation & Testing
- Stratified train-test split (80-20)
- Confusion matrix analysis for per-class performance
- Per-class metrics: Precision, Recall, F1-Score

## 🤖 AI Chatbot Integration

The integrated Gemini API chatbot provides:
- **Disease Information**: Detailed explanations of diagnosed skin conditions
- **Symptom Guidance**: Interactive Q&A about symptoms and causes
- **Treatment Recommendations**: Evidence-based treatment options
- **Follow-up Questions**: Contextual understanding of user queries
- **Result Explanation**: Simplified explanation of model predictions

## 📝 Usage Guide

1. **Upload Image**: Use drag-and-drop or file picker to upload skin lesion image
2. **Get Prediction**: Model processes image and returns classification with confidence scores
3. **Ask AI Chatbot**: Interact with Gemini API-powered chatbot for detailed information
4. **Review Results**: View detailed diagnosis, probabilities, and recommendations
5. **Download Report**: Export results as PDF (optional feature)

## 🔒 Privacy & Security

- Client-side image processing where possible
- HTTPS-only communication
- No permanent storage of user images
- GDPR-compliant data handling

## ⚠️ Disclaimer

**SkinSense is an AI-assisted tool for informational purposes only and should not be considered a substitute for professional medical diagnosis.** Always consult with a qualified dermatologist for proper diagnosis and treatment. This application is designed to support healthcare professionals and provide preliminary assessment guidance.


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Souresh Mondal**
- GitHub: [@soureshmondal](https://github.com/soureshmondal)
- Live Demo: [skinsense-five.vercel.app](https://skinsense-five.vercel.app/)


