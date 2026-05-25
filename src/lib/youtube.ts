/**
 * Extracts YouTube Video ID from various URL formats.
 */
export function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * YouTube API fetcher (Shell)
 * In production, this will use process.env.YOUTUBE_API_KEY
 */
export async function getYouTubeVideoData(videoId: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  
  if (!API_KEY) {
    console.warn("YouTube API Key missing. Returning mock data.");
    return {
      title: "Mock Video Title",
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      views: Math.floor(Math.random() * 100000),
    };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`
    );
    
    if (!response.ok) throw new Error("YouTube API request failed");
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) return null;
    
    const item = data.items[0];
    return {
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      views: parseInt(item.statistics.viewCount, 10),
    };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return null;
  }
}
