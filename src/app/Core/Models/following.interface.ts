export interface FollowingResponse {
  success: boolean;
  message: string;
  data: Following;
}

export interface Following {
  following: boolean;
  followersCount: number;
}
