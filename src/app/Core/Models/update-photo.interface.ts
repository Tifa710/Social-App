export interface UpdatePhotoResponse {
  success: boolean;
  message: string;
  data: UpdatePhotoData;
}

export interface UpdatePhotoData {
  photo: string;
  postId: string;
}
