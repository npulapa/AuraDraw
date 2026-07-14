from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI(title="AuraDraw API")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {
        "project": "AuraDraw",
        "version": "1.0",
        "status": "Running",
        "message": "Welcome to AuraDraw Backend API"
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "OK"
    }


# -----------------------------
# Recognize Diagram
# (Will connect later)
# -----------------------------
@app.post("/recognize")
def recognize():
    """
    Placeholder API.
    AI recognition will be added later.
    """
    return JSONResponse(
        content={
            "diagram": "Triangle",
            "confidence": 98.7,
            "topic": "Geometry"
        }
    )


# -----------------------------
# Recommended Videos
# (Will connect YouTube API later)
# -----------------------------
@app.get("/videos")
def videos():

    sample_videos = [
        {
            "title": "Triangle Basics",
            "url": "https://youtube.com/"
        },
        {
            "title": "Types of Triangles",
            "url": "https://youtube.com/"
        },
        {
            "title": "Geometry for Beginners",
            "url": "https://youtube.com/"
        }
    ]

    return {
        "topic": "Geometry",
        "videos": sample_videos
    }


# -----------------------------
# History
# -----------------------------
history = []


@app.post("/history")
def save_history(item: dict):
    history.append(item)
    return {
        "message": "Saved Successfully"
    }


@app.get("/history")
def get_history():
    return history


# -----------------------------
# Start Server
# -----------------------------
if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
