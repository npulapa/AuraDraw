import cv2
import mediapipe as mp
import numpy as np
import os

# -----------------------------
# MediaPipe Initialization
# -----------------------------
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    model_complexity=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

# -----------------------------
# Webcam
# -----------------------------
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Cannot open webcam")
    exit()

# -----------------------------
# Virtual Canvas
# -----------------------------
canvas = np.zeros((480, 640, 3), dtype=np.uint8)

previous_point = None

save_folder = "drawings"
os.makedirs(save_folder, exist_ok=True)

print("\nControls")
print("-------------------------")
print("Draw with Index Finger")
print("Press 'c' -> Clear Canvas")
print("Press 's' -> Save Drawing")
print("Press 'q' -> Quit")
print("-------------------------")

while True:

    success, frame = cap.read()

    if not success:
        break

    frame = cv2.flip(frame, 1)

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb)

    if results.multi_hand_landmarks:

        hand = results.multi_hand_landmarks[0]

        mp_draw.draw_landmarks(
            frame,
            hand,
            mp_hands.HAND_CONNECTIONS
        )

        h, w, _ = frame.shape

        index_tip = hand.landmark[8]

        x = int(index_tip.x * w)
        y = int(index_tip.y * h)

        cv2.circle(frame, (x, y), 8, (0, 0, 255), -1)

        if previous_point is None:
            previous_point = (x, y)

        cv2.line(
            canvas,
            previous_point,
            (x, y),
            (255, 255, 255),
            5
        )

        previous_point = (x, y)

    else:
        previous_point = None

    display = cv2.addWeighted(frame, 0.7, canvas, 1, 0)

    cv2.putText(
        display,
        "AuraDraw - Air Drawing",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 255),
        2
    )

    cv2.imshow("AuraDraw", display)

    key = cv2.waitKey(1) & 0xFF

    if key == ord('c'):
        canvas[:] = 0
        print("Canvas Cleared")

    elif key == ord('s'):
        path = os.path.join(save_folder, "drawing.png")
        cv2.imwrite(path, canvas)
        print(f"Drawing Saved -> {path}")

    elif key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
hands.close()
