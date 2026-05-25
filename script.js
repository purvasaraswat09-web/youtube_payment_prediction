document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('video-url');
    const predictBtn = document.getElementById('predict-btn');
    const loader = document.getElementById('loader');
    const btnText = predictBtn.querySelector('.btn-text');
    const resultCard = document.getElementById('result-card');
    
    const amountDisplay = document.getElementById('predicted-price');
    const baseDisplay = document.getElementById('base-earning');
    const bonusDisplay = document.getElementById('bonus-earning');

    predictBtn.addEventListener('click', async () => {
        const video_url = videoUrlInput.value.trim();

        if (!video_url) {
            alert('Please enter a YouTube video URL');
            return;
        }

        // Show loading state
        predictBtn.disabled = true;
        loader.style.display = 'block';
        btnText.style.opacity = '0.5';
        btnText.textContent = 'Fetching Data...';

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ video_url })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'API request failed');
            }

            const data = await response.json();

            // Update Metadata UI
            document.getElementById('video-title').textContent = data.title;
            document.getElementById('video-thumb').src = data.thumbnail;
            document.getElementById('video-meta').textContent = `${parseInt(data.views).toLocaleString()} views • ${parseInt(data.likes).toLocaleString()} likes`;

            // Update Earnings
            animateValue(amountDisplay, 0, data.predicted_earning, 1000);
            
            const baseEarning = (data.views / 1000) * 2.5;
            const bonusEarning = data.exact_earning - baseEarning;

            baseDisplay.textContent = `$${baseEarning.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            bonusDisplay.textContent = `$${bonusEarning.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

            resultCard.classList.remove('hidden');
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            predictBtn.disabled = false;
            loader.style.display = 'none';
            btnText.style.opacity = '1';
            btnText.textContent = 'Fetch & Predict';
        }
    });

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = (progress * (end - start)).toFixed(2);
            obj.innerHTML = parseFloat(value).toLocaleString(undefined, {minimumFractionDigits: 2});
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
