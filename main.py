import os
import sys

# Add the v1-prototype directory to sys.path to allow importing the app
# Use absolute paths to ensure it works regardless of where the script is run from
base_path = os.path.dirname(os.path.abspath(__file__))
v1_path = os.path.join(base_path, "v1-prototype")

if os.path.exists(v1_path):
    sys.path.append(v1_path)
    try:
        from app import app
        print("Successfully loaded FastAPI 'app' from v1-prototype/app.py")
    except ImportError as e:
        print(f"Error importing app from v1-prototype: {e}")
        # Fallback to an empty app if import fails to avoid crashing entrypoint detection
        from fastapi import FastAPI
        app = FastAPI()
else:
    print(f"Directory {v1_path} not found.")
    from fastapi import FastAPI
    app = FastAPI()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
