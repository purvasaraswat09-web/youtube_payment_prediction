import { calculatePayout, isFrozen } from "./payout";

export interface VideoEntry {
  id: string;
  url: string;
  editor: string;
  uploadDate: string;
  views: number;
  pay: number;
  status: "Active" | "Frozen";
  thumbnail: string;
}

const rawData = [
  { url: "https://youtu.be/a1B2c3D4e5F", editor: "Aarav Sharma", date: "2026-05-20", views: 18250 },
  { url: "https://youtu.be/f6G7h8I9j0K", editor: "Priya Verma", date: "2026-05-18", views: 26800 },
  { url: "https://youtu.be/l1M2n3O4p5Q", editor: "Rohit Singh", date: "2026-05-14", views: 52340 },
  { url: "https://youtu.be/r6S7t8U9v0W", editor: "Neha Kapoor", date: "2026-05-24", views: 8420 },
  { url: "https://youtu.be/x1Y2z3A4b5C", editor: "Aarav Sharma", date: "2026-05-11", views: 76420 },
  { url: "https://youtu.be/d6E7f8G9h0I", editor: "Priya Verma", date: "2026-05-22", views: 125000 },
  { url: "https://youtu.be/j1K2l3M4n5O", editor: "Rohit Singh", date: "2026-05-10", views: 1015000 },
  { url: "https://youtu.be/p6Q7r8S9t0U", editor: "Neha Kapoor", date: "2026-05-19", views: 33450 },
  { url: "https://youtu.be/v1W2x3Y4z5A", editor: "Aman Gupta", date: "2026-05-17", views: 48700 },
  { url: "https://youtu.be/b6C7d8E9f0G", editor: "Simran Kaur", date: "2026-05-09", views: 22000 },
];

export const MOCK_VIDEOS: VideoEntry[] = rawData.map((item, index) => {
  const videoId = item.url.split("/").pop() || `VID${index}`;
  return {
    id: videoId,
    url: item.url,
    editor: item.editor,
    uploadDate: item.date,
    views: item.views,
    pay: calculatePayout(item.views),
    status: isFrozen(item.date) ? "Frozen" : "Active",
    thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  };
});

export const MOCK_STATS = {
  totalVideos: MOCK_VIDEOS.length,
  activeVideos: MOCK_VIDEOS.filter(v => v.status === "Active").length,
  frozenVideos: MOCK_VIDEOS.filter(v => v.status === "Frozen").length,
  totalViews: MOCK_VIDEOS.reduce((acc, v) => acc + v.views, 0),
  totalPayout: MOCK_VIDEOS.reduce((acc, v) => acc + v.pay, 0),
};
