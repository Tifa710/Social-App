export interface PostMutationResponse {
  success: boolean;
  message: string;
  data: PostMutation;
}

export interface PostMutation {
  post: Post;
}

export interface Post {
  body: string;
  image: string;
  privacy: string;
  user: string;
  sharedPost: any;
  likes: any[];
  _id: string;
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  id: string;
}
