import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostDataResponse } from '../Models/post-data.interface';
import { PostMutation, PostMutationResponse } from '../Models/post-mutation.interface';
import { likePostResponse } from '../Models/likepost.interface';
import { BookMarkedPostResponse } from '../Models/bookmarkedpost.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  getALLPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.base_url}/posts`);
  }
  getFeedPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(
      `${environment.base_url}/posts/feed?only=following&limit=10`,
    );
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.base_url}/posts/${postId}`);
  }
  createPost(data: object): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(`${environment.base_url}/posts/`, data);
  }
  updatePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.base_url}/posts/${postId}`, {});
  }
  deletePost(postId: string): Observable<PostMutationResponse> {
    return this.httpClient.delete<PostMutationResponse>(`${environment.base_url}/posts/${postId}`);
  }
  putLikeAndUnLikePost(postId: string): Observable<likePostResponse> {
    return this.httpClient.put<likePostResponse>(
      `${environment.base_url}/posts/${postId}/like`,
      {},
    );
  }
  putMarkedAndUnMarkedPost(postId: string): Observable<BookMarkedPostResponse> {
    return this.httpClient.put<BookMarkedPostResponse>(
      `${environment.base_url}/posts/${postId}/bookmark`,
      {},
    );
  }
}
