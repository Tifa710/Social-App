import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { likePostResponse } from '../Models/Posts/likepost.interface';
import { PostDataResponse } from '../Models/Posts/post-data.interface';
import { PostMutationResponse } from '../Models/Posts/post-mutation.interface';
import { BookMarkedPostResponse } from '../Models/bookMark/bookmarkedpost.interface';
import { BookMarksPostsResponse } from '../Models/bookMark/bookmarksposts.interface';

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
      `${environment.base_url}/posts/feed?only=following&limit=20`,
    );
  }
  getBookMarksPosts(): Observable<BookMarksPostsResponse> {
    return this.httpClient.get<BookMarksPostsResponse>(`${environment.base_url}/users/bookmarks`);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.base_url}/posts/${postId}`);
  }
  createPost(data: object): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(`${environment.base_url}/posts/`, data);
  }
  reSharePost(postId: string, body: string): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(
      `${environment.base_url}/posts/${postId}/share`,
      body,
    );
  }
  updatePost(postId: string, body: string): Observable<any> {
    return this.httpClient.put(`${environment.base_url}/posts/${postId}`, body);
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
