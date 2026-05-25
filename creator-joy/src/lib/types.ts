export type UserRole = 'admin' | 'manager' | 'editor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
}

export interface Creator {
  id: string;
  name: string;
  channel_id: string;
  created_at: string;
}

export interface Editor {
  id: string;
  user_id?: string;
  name: string;
  created_at: string;
}

export type VideoStatus = 'active' | 'frozen' | 'error';

export interface Video {
  id: string;
  youtube_id: string;
  title: string;
  thumbnail_url: string;
  creator_id: string;
  editor_id: string;
  upload_date: string;
  status: VideoStatus;
  views: number;
  calculated_pay: number;
  last_synced: string;
  created_at: string;
}

export interface BonusTier {
  id: string;
  min_views: number;
  bonus_amount: number;
  created_at: string;
}

export interface PayoutLog {
  id: string;
  video_id: string;
  base_pay: number;
  bonus: number;
  total_pay: number;
  calculated_at: string;
}
