import cv2
import numpy as np
import os
import random

IMG_SIZE = 224
NUM_IMAGES = 500

folders = ["Triangle", "Circle", "Square", "Rectangle"]

# Create folders if they don't exist
for folder in folders:
    os.makedirs(f"dataset/{folder}", exist_ok=True)

def random_color():
    return (255, 255, 255)

for shape in folders:

    print(f"Generating {shape} images...")

    for i in range(NUM_IMAGES):

        img = np.zeros((IMG_SIZE, IMG_SIZE, 3), dtype=np.uint8)

        thickness = random.randint(2, 6)

        if shape == "Triangle":

            p1 = (random.randint(40, 80), random.randint(150, 190))
            p2 = (random.randint(110, 180), random.randint(30, 70))
            p3 = (random.randint(170, 210), random.randint(150, 190))

            pts = np.array([p1, p2, p3], np.int32)

            cv2.polylines(
                img,
                [pts],
                True,
                random_color(),
                thickness
            )

        elif shape == "Circle":

            center = (
                random.randint(90, 130),
                random.randint(90, 130)
            )

            radius = random.randint(40, 70)

            cv2.circle(
                img,
                center,
                radius,
                random_color(),
                thickness
            )

        elif shape == "Square":

            side = random.randint(70, 100)

            x = random.randint(40, 90)
            y = random.randint(40, 90)

            cv2.rectangle(
                img,
                (x, y),
                (x + side, y + side),
                random_color(),
                thickness
            )

        elif shape == "Rectangle":

            width = random.randint(90, 130)
            height = random.randint(50, 80)

            x = random.randint(30, 70)
            y = random.randint(50, 90)

            cv2.rectangle(
                img,
                (x, y),
                (x + width, y + height),
                random_color(),
                thickness
            )

        # Small random rotation
        angle = random.randint(-15, 15)

        matrix = cv2.getRotationMatrix2D(
            (IMG_SIZE//2, IMG_SIZE//2),
            angle,
            1
        )

        img = cv2.warpAffine(img, matrix, (IMG_SIZE, IMG_SIZE))

        # Add slight noise
        noise = np.random.randint(0, 20, img.shape, dtype=np.uint8)
        img = cv2.add(img, noise)

        filename = f"dataset/{shape}/{shape.lower()}_{i}.png"

        cv2.imwrite(filename, img)

print("\nDataset Generated Successfully!")
