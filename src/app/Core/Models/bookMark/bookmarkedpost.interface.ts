export interface BookMarkedPostResponse {
  success: boolean;
  message: string;
  data: BookMarkedPost;
}
export interface BookMarkedPost {
  bookmarked: boolean;
  bookmarksCount: number;
}
