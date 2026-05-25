from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = None
scaler = None

def load_resources():
    global model, scaler
    if os.path.exists("earnings_model.pkl") and os.path.exists("scaler.pkl"):
        model = joblib.load("earnings_model.pkl")
        scaler = joblib.load("scaler.pkl")
        print("Model and Scaler loaded successfully.")
    else:
        print("Model or Scaler files not found. Please train the model first.")

import yt_dlp
import time

# Simple in-memory cache
metadata_cache = {}
CACHE_EXPIRY = 300 # 5 minutes

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
        'ignoreerrors': False, # Set to False to see what's wrong
        'no_color': True,
        'geo_bypass': True,
        'no_playlist': True,
        'limit_rate': '100k', # We only need metadata
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # We must process the info to get view_count/like_count reliably
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
        # Check for common errors and provide fallback or more info
        return None

@app.route("/predict", methods=["POST"])
def predict():
    if model is None or scaler is None:
        load_resources()
        if model is None:
            return jsonify({"error": "Model not trained"}), 500

    data = request.json
    video_url = data.get("video_url")
    
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    # Fetch metadata
    metadata = fetch_video_metadata(video_url)
    if not metadata:
        return jsonify({"error": "Could not fetch metadata for this URL"}), 404

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

        return jsonify({
            "predicted_earning": round(float(prediction), 2),
            "exact_earning": round(total_exact, 2),
            "views": views,
            "likes": likes,
            "title": metadata["title"],
            "thumbnail": metadata["thumbnail"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    load_resources()
    app.run(debug=True, port=5000)
