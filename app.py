import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

class LesionClassifier:
    def __init__(self, model_path, device=None):
        self.device = device if device else torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.class_names = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']
        self.model = self._load_model(model_path)
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def _load_model(self, model_path):
        # Create the same model architecture as in training
        model = models.resnet18(weights=None)
        model.fc = nn.Sequential(
            nn.Linear(model.fc.in_features, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, len(self.class_names))
        )
        
        # Load the trained weights
        checkpoint = torch.load(model_path, map_location=self.device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model = model.to(self.device)
        model.eval()
        return model

    def predict(self, image_path):
        # Load and preprocess the image
        image = Image.open(image_path).convert('RGB')
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)

        # Make prediction
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
            predicted_class = torch.argmax(probabilities).item()

        return {
            'class_name': self.class_names[predicted_class],
            'probabilities': probabilities.cpu().numpy(),
            'original_image': image
        }

    def visualize_prediction(self, prediction, save_path=None):
        # Create figure with two subplots
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 7))
        
        # Plot original image
        ax1.imshow(prediction['original_image'])
        ax1.set_title('Original Image')
        ax1.axis('off')
        
        # Plot confidence scores
        probabilities = prediction['probabilities'] * 100
        y_pos = np.arange(len(self.class_names))
        
        bars = ax2.barh(y_pos, probabilities)
        ax2.set_yticks(y_pos)
        ax2.set_yticklabels(self.class_names)
        ax2.set_xlabel('Confidence (%)')
        ax2.set_title('Prediction Confidence')
        
        # Add percentage labels on bars
        for i, bar in enumerate(bars):
            width = bar.get_width()
            ax2.text(width + 1, bar.get_y() + bar.get_height()/2,
                    f'{width:.1f}%',
                    va='center')
        
        # Highlight predicted class
        predicted_idx = self.class_names.index(prediction['class_name'])
        bars[predicted_idx].set_color('red')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=300)
            plt.close()
        else:
            plt.show()

def main():
    # Initialize classifier
    model_path = 'best_model.pth'  # Path to your trained model
    classifier = LesionClassifier(model_path)
    
    # Get image path from user
    image_path = input("Enter the path to your image: ")
    
    try:
        # Make prediction
        prediction = classifier.predict(image_path)
        
        # Print results
        print(f"\nPredicted class: {prediction['class_name']}")
        print("\nConfidence scores:")
        for class_name, prob in zip(classifier.class_names, prediction['probabilities']):
            print(f"{class_name}: {prob*100:.1f}%")
        
        # Visualize results
        save_path = Path(image_path).stem + "_prediction.png"
        classifier.visualize_prediction(prediction, save_path)
        print(f"\nVisualization saved as: {save_path}")
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")

if __name__ == "__main__":
    main()