import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

def train_model():
    if not os.path.exists("youtube_dataset.csv"):
        print("Dataset not found. Run generate_data.py first.")
        return

    df = pd.read_csv("youtube_dataset.csv")

    X = df[["views", "likes"]]
    y = df["total_earning_usd"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Scikit-learn Random Forest doesn't strictly need scaling but it's good practice
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    score = model.score(X_test_scaled, y_test)
    print(f"Model trained with R^2 score: {score:.4f}")

    # Save model and scaler
    joblib.dump(model, "earnings_model.pkl")
    joblib.dump(scaler, "scaler.pkl")
    print("Model and Scaler saved.")

if __name__ == "__main__":
    train_model()
