from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os
import yt_dlp
import time

app = FastAPI(title="CreatorJoy Prediction Engine (v1-prototype)")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
model = None
scaler = None

def load_resources():
    global model, scaler
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "earnings_model.pkl")
    scaler_path = os.path.join(current_dir, "scaler.pkl")
    
    if os.path.exists(model_path) and os.path.exists(scaler_path):
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        print(f"Model and Scaler loaded successfully from {current_dir}.")
    else:
        print(f"Model or Scaler files not found in {current_dir}. Please train the model first.")


# Simple in-memory cache
metadata_cache = {}
CACHE_EXPIRY = 300 # 5 minutes

class PredictRequest(BaseModel):
    video_url: str

def fetch_video_metadata(url):
    # Check cache
    if url in metadata_cache:
        cached_data, timestamp = metadata_cache[url]
        if time.time() - timestamp < CACHE_EXPIRY:
            print(f"Serving from cache: {url}")
            return cached_data

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'no_color': True,
        'geo_bypass': True,
        'no_playlist': True,
        'limit_rate': '100k',
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False) 
            if not info:
                print(f"No info returned for URL: {url}")
                return None
            
            result = {
                "views": info.get("view_count") or 0,
                "likes": info.get("like_count") or 0,
                "title": info.get("title", "Unknown Video"),
                "thumbnail": info.get("thumbnail", "")
            }
            
            # Save to cache
            metadata_cache[url] = (result, time.time())
            return result
    except Exception as e:
        print(f"Detailed Error fetching metadata: {str(e)}")
        return None

@app.on_event("startup")
async def startup_event():
    load_resources()

@app.post("/predict")
async def predict(request_data: PredictRequest):
    if model is None or scaler is None:
        load_resources()
        if model is None:
            raise HTTPException(status_code=500, detail="Model not trained")

    video_url = request_data.video_url
    
    # Fetch metadata
    metadata = fetch_video_metadata(video_url)
    if not metadata:
        raise HTTPException(status_code=404, detail="Could not fetch metadata for this URL")

    try:
        views = float(metadata["views"])
        likes = float(metadata["likes"])

        # Scale input
        features = np.array([[views, likes]])
        features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)[0]

        # Calculate exact for comparison (from formulas)
        payment_exact = (views / 1000) * 2.5
        bonus_exact = 0
        if likes > 50000: bonus_exact = 500
        elif likes > 20000: bonus_exact = 200
        elif likes > 10000: bonus_exact = 100
        total_exact = payment_exact + bonus_exact

        return {
            "predicted_earning": round(float(prediction), 2),
            "exact_earning": round(total_exact, 2),
            "views": views,
            "likes": likes,
            "title": metadata["title"],
            "thumbnail": metadata["thumbnail"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
