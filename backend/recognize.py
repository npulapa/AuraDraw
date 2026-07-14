import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model

# -----------------------------
# Paths
# -----------------------------
MODEL_PATH = "model/auradraw_model.keras"
IMAGE_PATH = "drawings/drawing.png"
LABEL_PATH = "labels.txt"

# -----------------------------
# Load Labels
# -----------------------------
with open(LABEL_PATH, "r") as f:
    labels = [line.strip() for line in f.readlines()]

# -----------------------------
# Load AI Model
# -----------------------------
model = load_model(MODEL_PATH)

# -----------------------------
# Image Preprocessing
# -----------------------------
def preprocess_image(image_path):

    image = cv2.imread(image_path)

    if image is None:
        raise FileNotFoundError("Drawing not found.")

    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    image = cv2.resize(image, (224, 224))

    image = image.astype("float32") / 255.0

    image = np.expand_dims(image, axis=-1)

    image = np.expand_dims(image, axis=0)

    return image

# -----------------------------
# Recognition
# -----------------------------
def recognize():

    image = preprocess_image(IMAGE_PATH)

    prediction = model.predict(image)

    index = np.argmax(prediction)

    confidence = float(np.max(prediction))

    diagram = labels[index]

    return {
        "diagram": diagram,
        "confidence": round(confidence * 100, 2)
    }

# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":

    result = recognize()

    print("\n========== AuraDraw ==========")
    print("Recognized Diagram :", result["diagram"])
    print("Confidence         :", result["confidence"], "%")
