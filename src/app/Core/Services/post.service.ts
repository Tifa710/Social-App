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
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };
  getALLPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.base_url}/posts`, this.myHeaders);
  }
  getFeedPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(
      `${environment.base_url}/posts/feed?only=following&limit=10`,
      this.myHeaders,
    );
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.base_url}/posts/${postId}`, this.myHeaders);
  }
  createPost(data: object): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(
      `${environment.base_url}/posts/`,
      data,
      this.myHeaders,
    );
  }
  updatePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.base_url}/posts/${postId}`, this.myHeaders);
  }
  deletePost(postId: string): Observable<PostMutationResponse> {
    return this.httpClient.delete<PostMutationResponse>(
      `${environment.base_url}/posts/${postId}`,
      this.myHeaders,
    );
  }
  putLikeAndUnLikePost(postId: string): Observable<likePostResponse> {
    return this.httpClient.put<likePostResponse>(
      `${environment.base_url}/posts/${postId}/like`,
      {},
      this.myHeaders,
    );
  }
  putMarkedAndUnMarkedPost(postId: string): Observable<BookMarkedPostResponse> {
    return this.httpClient.put<BookMarkedPostResponse>(
      `${environment.base_url}/posts/${postId}/bookmark`,
      {},
      this.myHeaders,
    );
  }
}
