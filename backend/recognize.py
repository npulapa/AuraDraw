import cv2
import numpy as np
import os

# -----------------------------
# Recognize Shape Function
# -----------------------------
def recognize_shape(image_path):

    if not os.path.exists(image_path):
        return {
            "diagram": "No Drawing Found",
            "confidence": 0
        }

    image = cv2.imread(image_path)

    if image is None:
        return {
            "diagram": "Invalid Image",
            "confidence": 0
        }

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Blur to remove noise
    gray = cv2.GaussianBlur(gray, (5, 5), 0)

    # Binary threshold
    _, thresh = cv2.threshold(gray, 60, 255, cv2.THRESH_BINARY)

    # Find contours
    contours, _ = cv2.findContours(
        thresh,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    detected_shape = "Unknown"

    max_area = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if area < 500:
            continue

        if area > max_area:

            max_area = area

            perimeter = cv2.arcLength(contour, True)

            approx = cv2.approxPolyDP(
                contour,
                0.04 * perimeter,
                True
            )

            sides = len(approx)

            if sides == 3:
                detected_shape = "Triangle"

            elif sides == 4:

                x, y, w, h = cv2.boundingRect(approx)

                ratio = float(w) / h

                if 0.95 <= ratio <= 1.05:
                    detected_shape = "Square"
                else:
                    detected_shape = "Rectangle"

            elif sides == 5:
                detected_shape = "Pentagon"

            elif sides == 6:
                detected_shape = "Hexagon"

            else:

                circularity = 4 * np.pi * area / (perimeter * perimeter)

                if circularity > 0.80:
                    detected_shape = "Circle"
                else:
                    detected_shape = "Unknown"

    confidence = min(round((max_area / 80000) * 100, 2), 99.9)

    return {
        "diagram": detected_shape,
        "confidence": confidence
    }


# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":

    IMAGE_PATH = "drawings/drawing.png"

    result = recognize_shape(IMAGE_PATH)

    print("\n========== AuraDraw ==========")
    print("Recognized Diagram :", result["diagram"])
    print("Confidence         :", result["confidence"], "%")
