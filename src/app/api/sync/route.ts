import { NextResponse } from "next/server";
import { MOCK_VIDEOS } from "@/lib/mock-data";
import { getYouTubeVideoData } from "@/lib/youtube";
import { calculatePayout, isFrozen } from "@/lib/payout";

export async function POST() {
  try {
    console.log("Starting manual sync...");
    
    // In a real app, you would fetch active videos from your database:
    // const { data: activeVideos } = await supabase.from('videos').select('*').eq('status', 'Active');
    
    // For this demonstration, we'll simulate processing the mock active videos
    const activeVideos = MOCK_VIDEOS.filter(v => v.status === "Active");
    
    const results = await Promise.all(activeVideos.map(async (video) => {
      // 1. Fetch fresh data from YouTube
      const ytData = await getYouTubeVideoData(video.id);
      
      if (!ytData) return { id: video.id, status: 'error', reason: 'Video not found' };

      // 2. Calculate new payout
      const newPayout = calculatePayout(ytData.views);
      
      // 3. Check if it should be frozen (10 day rule)
      const frozen = isFrozen(video.uploadDate);

      // 4. In a real app, update DB here:
      // await supabase.from('videos').update({...}).eq('id', video.id);

      return {
        id: video.id,
        prevViews: video.views,
        newViews: ytData.views,
        newPay: newPayout,
        frozen
      };
    }));

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      processedCount: results.length,
      details: results
    });
  } catch (error) {
    console.error("Sync failed:", error);
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
