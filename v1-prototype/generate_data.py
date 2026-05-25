import pandas as pd
import random
import os

def generate_dataset(num_samples=2000):
    videos = []
    for i in range(1, num_samples + 1):
        views = random.randint(1000, 5000000)
        likes = random.randint(0, int(views * 0.1)) # Likes usually < 10% of views

        # Formulas from user
        payment = (views / 1000) * 2.5

        if likes > 50000:
            bonus = 500
        elif likes > 20000:
            bonus = 200
        elif likes > 10000:
            bonus = 100
        else:
            bonus = 0

        total = payment + bonus

        videos.append({
            "video_id": f"VID{i:04}",
            "views": views,
            "likes": likes,
            "estimated_payment_usd": round(payment, 2),
            "bonus_usd": bonus,
            "total_earning_usd": round(total, 2)
        })

    df = pd.DataFrame(videos)
    df.to_csv("youtube_dataset.csv", index=False)
    print(f"Dataset generated with {num_samples} samples.")

if __name__ == "__main__":
    generate_dataset()
